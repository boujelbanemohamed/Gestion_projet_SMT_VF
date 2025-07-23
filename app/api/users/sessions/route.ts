import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      where: { revoked: false },
      include: { user: true },
      orderBy: { lastActivity: 'desc' },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des sessions.' }, { status: 500 });
  }
}

// Pour la révocation d'une session (POST)
export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID session manquant.' }, { status: 400 });
  try {
    await prisma.session.update({ where: { id }, data: { revoked: true } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la révocation.' }, { status: 500 });
  }
} 