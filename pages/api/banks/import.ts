import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { parse as parseCSV } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFile(filePath: string, mimetype: string) {
  if (mimetype === 'text/csv' || filePath.endsWith('.csv')) {
    const content = await fs.readFile(filePath, 'utf-8');
    return parseCSV(content, { columns: true, skip_empty_lines: true });
  } else if (
    mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    filePath.endsWith('.xlsx')
  ) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
  } else {
    throw new Error('Format de fichier non supporté');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }
  const form = formidable({ multiples: false, keepExtensions: true });
  const tempDir = path.join(process.cwd(), 'tmp');
  await fs.mkdir(tempDir, { recursive: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ error: "Erreur lors de l'upload du fichier." });
      return;
    }
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      res.status(400).json({ error: 'Aucun fichier reçu.' });
      return;
    }
    if (!file.filepath || !file.mimetype) {
      res.status(400).json({ error: 'Fichier invalide (chemin ou type manquant).' });
      return;
    }
    try {
      const data = await parseFile(file.filepath, file.mimetype);
      // Validation tolérante des colonnes et des lignes
      const expectedHeaders = [
        'Nom de la banque',
        'Adresse',
        'Code de la banque',
      ];
      // Normalise les en-têtes du fichier importé
      const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');
      const headers = Object.keys(data[0] || {}).map(normalize);
      const expectedNormalized = expectedHeaders.map(normalize);
      // Vérifie que chaque colonne attendue est présente (ordre et colonnes en trop ignorés)
      const allHeadersPresent = expectedNormalized.every(h => headers.includes(h));
      if (!allHeadersPresent) {
        res.status(400).json({ error: 'Colonnes obligatoires manquantes. Colonnes attendues : ' + expectedHeaders.join(', ') });
        return;
      }
      const seenCodes = new Set<string>();
      const validRows: any[] = [];
      const ignoredRows: { line: number, reason: string, row: any }[] = [];
      data.forEach((row: any, idx: number) => {
        // Mapping tolérant : trouve la bonne colonne même si l'ordre change ou s'il y a des colonnes en trop
        const nom = row[Object.keys(row).find(k => normalize(k) === expectedNormalized[0])] ?.trim();
        const adresse = row[Object.keys(row).find(k => normalize(k) === expectedNormalized[1])] ?.trim();
        const code = row[Object.keys(row).find(k => normalize(k) === expectedNormalized[2])] ?.trim();
        if (!nom || !adresse || !code) {
          ignoredRows.push({ line: idx + 2, reason: 'Champ manquant', row });
          return;
        }
        if (seenCodes.has(code)) {
          ignoredRows.push({ line: idx + 2, reason: 'Code banque dupliqué dans le fichier', row });
          return;
        }
        seenCodes.add(code);
        validRows.push({ nom, adresse, code });
      });
      // Insère les banques valides en base (en ignorant les doublons de code banque)
      for (const row of validRows) {
        try {
          await prisma.bank.create({
            data: {
              name: row.nom,
              address: row.adresse,
              bankCode: row.code,
            },
          });
        } catch (e) {
          // Ignore les erreurs de doublon (code unique)
        }
      }
      res.status(200).json({
        success: true,
        total: data.length,
        valides: validRows.length,
        ignores: ignoredRows.length,
        ignoredRows,
        preview: validRows.slice(0, 5),
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });
} 