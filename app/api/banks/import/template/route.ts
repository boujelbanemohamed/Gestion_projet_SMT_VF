import { NextResponse } from 'next/server';

export async function GET() {
  const csvContent = [
    'Nom de la banque,Adresse,Code de la banque',
    'Banque Centrale,Avenue des Finances, Rabat,BNC001',
    'Banque Commerciale,12 Rue des Banquiers, Casablanca,BNC002',
  ].join('\r\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="modele_banques.csv"',
    },
  });
} 