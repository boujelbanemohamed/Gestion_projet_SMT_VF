import { NextRequest, NextResponse } from 'next/server';
import { parse as parseCSV } from 'csv-parse/sync';
import * as XLSX from 'xlsx';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'Fichier manquant ou invalide.' }, { status: 400 });
    }
    const fileName = file.name || '';
    let rows: any[] = [];
    if (fileName.endsWith('.csv')) {
      const text = await file.text();
      rows = parseCSV(text, { columns: true, skip_empty_lines: true });
    } else if (fileName.endsWith('.xlsx')) {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    } else {
      return NextResponse.json({ error: 'Format de fichier non supporté.' }, { status: 400 });
    }
    const results = [];
    for (const row of rows) {
      // Normalisation des clés (en-têtes)
      const nom = row["Nom de l'emplacement"] || row["nom de l'emplacement"] || row["Nom"] || row["nom"];
      const banque = row["Banque propriétaire"] || row["banque propriétaire"] || row["Banque"] || row["banque"];
      const adresse = row["Adresse physique"] || row["adresse physique"] || row["Adresse"] || row["adresse"];
      const capacite = row["Capacité maximale"] || row["capacité maximale"] || row["Capacité"] || row["capacité"];
      const niveau = row["Niveau de sécurité"] || row["niveau de sécurité"] || row["Niveau"] || row["niveau"];
      const description = row["Description"] || row["description"];
      if (!nom) continue;
      // Recherche de la banque par nom
      let bankId = null;
      if (banque) {
        const bank = await prisma.bank.findFirst({ where: { name: { equals: banque, mode: 'insensitive' } } });
        if (bank) bankId = bank.id;
        else {
          results.push({ success: false, name: nom, error: `Banque '${banque}' non trouvée. Emplacement non importé.` });
          continue;
        }
      } else {
        results.push({ success: false, name: nom, error: `Aucune banque spécifiée. Emplacement non importé.` });
        continue;
      }
      try {
        const loc = await prisma.location.create({
          data: {
            name: nom,
            address: adresse || null,
            bankId: bankId,
            maxCapacity: capacite ? Number(capacite) : null,
            securityLevel: niveau || null,
            description: description || null,
          },
        });
        results.push({ success: true, name: nom });
      } catch (e) {
        results.push({ success: false, name: nom, error: 'Erreur lors de la création.' });
      }
    }
    return NextResponse.json({ success: true, results });
  } catch (e) {
    return NextResponse.json({ error: 'Erreur lors du traitement du fichier.' }, { status: 400 });
  }
} 