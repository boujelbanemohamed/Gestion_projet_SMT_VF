import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // Créer/mettre à jour les rôles
  const roles = [
    { name: 'admin', description: 'Administrateur' },
    { name: 'operateur', description: 'Opérateur' },
    { name: 'auditeur', description: 'Auditeur' },
  ];
  const roleIdByName: Record<string, string> = {} as any;
  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: { name: r.name, description: r.description },
    });
    roleIdByName[r.name] = role.id;
  }

  const users = [
    { email: 'admin@banque.com', password: 'admin123', firstName: 'Admin', lastName: 'Principal', roleName: 'admin' },
    { email: 'operateur1@banque.com', password: 'op123', firstName: 'Opérateur', lastName: 'Un', roleName: 'operateur' },
    { email: 'lecteur1@banque.com', password: 'lect123', firstName: 'Lecteur', lastName: 'Un', roleName: 'auditeur' },
  ];
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: u.password,
        firstName: u.firstName,
        lastName: u.lastName,
        roleId: roleIdByName[u.roleName],
      },
    });
  }
  return NextResponse.json({ success: true, created: users.length });
} 