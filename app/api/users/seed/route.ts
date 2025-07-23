import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const users = [
    { email: 'admin@banque.com', password: 'admin123', firstName: 'Admin', lastName: 'Principal', role: 'admin' },
    { email: 'operateur1@banque.com', password: 'op123', firstName: 'Opérateur', lastName: 'Un', role: 'operateur' },
    { email: 'lecteur1@banque.com', password: 'lect123', firstName: 'Lecteur', lastName: 'Un', role: 'auditeur' },
  ];
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  }
  return NextResponse.json({ success: true });
} 