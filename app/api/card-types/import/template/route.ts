import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const csv = `Type,Sous-type,Sous-sous-type,Description,Banque,Spécificités,Contact\nVisa,Classic,National,Visa Classic National,BNA,NFC,contact@bna.com\nMastercard,Gold,International,Mastercard Gold International,UBCI,Débit différé,contact@ubci.com\n`;
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="template_types_cartes.csv"',
    },
  });
} 