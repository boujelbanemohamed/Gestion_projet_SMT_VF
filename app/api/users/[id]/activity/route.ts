import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'ID utilisateur manquant.' }, { status: 400 });
  }
  try {
    // Connexions (lastLogin)
    const user = await prisma.user.findUnique({ where: { id } });
    const loginActivity = user?.lastLogin ? [{
      type: 'login',
      description: 'Connexion réussie',
      timestamp: user.lastLogin,
    }] : [];
    // Modifications de profil (AuditLog)
    const auditLogs = await prisma.auditLog.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    const auditActivity = auditLogs.map(log => ({
      type: 'modification',
      description: log.action,
      timestamp: log.createdAt,
    }));
    // Mouvements
    const movements = await prisma.movement.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    const movementActivity = movements.map(m => ({
      type: 'movement',
      description: `${m.type} de ${m.quantity} cartes`,
      timestamp: m.createdAt,
    }));
    // Fusionne et trie
    const all = [...loginActivity, ...auditActivity, ...movementActivity]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
    return NextResponse.json(all);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'activité.' }, { status: 500 });
  }
} 