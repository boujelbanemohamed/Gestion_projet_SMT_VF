import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

const prisma = new PrismaClient();

// Helper to get SMTP config from settings
async function getSmtpConfig() {
  const keys = [
    'smtp_host',
    'smtp_port',
    'smtp_user',
    'smtp_password',
    'smtp_secure',
    'smtp_to',
  ];
  const settings = await prisma.settings.findMany({
    where: { key: { in: keys } },
  });
  const config: any = {};
  for (const s of settings) config[s.key] = s.value;
  return config;
}

// Helper to generate a simple PDF from report data
function generatePdf(reportType: string, content: any[]): Buffer {
  const doc = new jsPDF();
  doc.text(`Rapport: ${reportType}`, 10, 10);
  if (content.length > 0) {
    const headers = Object.keys(content[0]);
    let y = 20;
    doc.text(headers.join(' | '), 10, y);
    y += 10;
    for (const row of content) {
      doc.text(headers.map(h => String(row[h])).join(' | '), 10, y);
      y += 10;
    }
  } else {
    doc.text('Aucune donnée.', 10, 20);
  }
  return Buffer.from(doc.output('arraybuffer'));
}

export async function POST(req: NextRequest) {
  try {
    const { type, content } = await req.json();
    const smtp = await getSmtpConfig();
    if (!smtp.smtp_host || !smtp.smtp_port || !smtp.smtp_user || !smtp.smtp_password || !smtp.smtp_to) {
      return NextResponse.json({ error: 'Configuration SMTP incomplète.' }, { status: 500 });
    }
    const transporter = nodemailer.createTransport({
      host: smtp.smtp_host,
      port: Number(smtp.smtp_port),
      secure: smtp.smtp_secure === 'true',
      auth: {
        user: smtp.smtp_user,
        pass: smtp.smtp_password,
      },
    });
    const pdfBuffer = generatePdf(type, content);
    await transporter.sendMail({
      from: smtp.smtp_user,
      to: smtp.smtp_to,
      subject: `Rapport ${type}`,
      text: 'Veuillez trouver le rapport en pièce jointe.',
      attachments: [
        {
          filename: `rapport-${type}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Erreur SMTP:', e);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 });
  }
} 