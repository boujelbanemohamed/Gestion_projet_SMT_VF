import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const csv = `Nom de l'emplacement,Banque propriétaire,Adresse physique,Capacité maximale,Niveau de sécurité,Description\nAgence Centrale,Banque Nationale,10 avenue de la République,500,Élevé,Emplacement principal pour les opérations\nDépôt Nord,Banque Régionale,Zone Industrielle Nord,200,Moyen,Stockage temporaire des cartes\nCoffre Fort Sud,Banque Nationale,25 rue du Marché,1000,Très élevé,Coffre sécurisé pour les cartes de valeur\nBureau Annexe,Banque Populaire,Immeuble Alpha,150,Bas,Petit bureau pour distribution locale\n`;
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="modeles_emplacements.csv"',
    },
  });
} 