import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'ID utilisateur manquant.' }, { status: 400 });
  }
  try {
    const logs = await prisma.auditLog.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des modifications.' }, { status: 500 });
  }
} 