import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur inexistant' }, { status: 404 });
  }

  // Vérification du mail (syntaxe déjà vérifiée côté front normalement)
  if (user.email !== email) {
    return NextResponse.json({ error: 'Mail inexact' }, { status: 401 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: 'Mot de passe inexact' }, { status: 401 });
  }

  // Mettre à jour la date de dernière connexion
  await prisma.user.update({
    where: { email },
    data: { lastLogin: new Date() }
  });

  // Créer ou mettre à jour la session
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
  const userAgent = req.headers.get('user-agent') || '';
  // Vérifie s'il existe déjà une session non révoquée pour cet utilisateur et ce userAgent
  let session = await prisma.session.findFirst({
    where: { userId: user.id, revoked: false, userAgent },
  });
  if (session) {
    session = await prisma.session.update({
      where: { id: session.id },
      data: { lastActivity: new Date(), ip, userAgent },
    });
    console.log('Session mise à jour:', session);
  } else {
    // Supprime les sessions révoquées pour ce userId/userAgent (évite collision unique)
    await prisma.session.deleteMany({ where: { userId: user.id, userAgent, revoked: true } });
    session = await prisma.session.create({
      data: { userId: user.id, ip, userAgent },
    });
    console.log('Session créée:', session);
  }

  // Log d'audit pour la connexion
  const audit = await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'USER_LOGIN',
      resource: 'auth',
      details: 'Connexion réussie',
      ip,
      type: 'success',
      timestamp: new Date(),
    }
  });
  console.log('Audit log créé:', audit);

  // Récupérer l'utilisateur mis à jour
  const updatedUser = await prisma.user.findUnique({ where: { email } });

  return NextResponse.json({ message: 'Connexion réussie', user: updatedUser });
} 