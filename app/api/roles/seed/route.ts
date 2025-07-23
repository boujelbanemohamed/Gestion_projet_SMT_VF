import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permissionsData = [
  // Stock
  { name: 'stock.view', description: 'Voir le stock', category: 'Stock', resource: 'stock', action: 'view' },
  { name: 'stock.create', description: 'Créer des entrées', category: 'Stock', resource: 'stock', action: 'create' },
  { name: 'stock.update', description: 'Modifier le stock', category: 'Stock', resource: 'stock', action: 'update' },
  { name: 'stock.delete', description: 'Supprimer du stock', category: 'Stock', resource: 'stock', action: 'delete' },
  { name: 'stock.transfer', description: 'Transférer le stock', category: 'Stock', resource: 'stock', action: 'transfer' },
  // Utilisateurs
  { name: 'users.view', description: 'Voir les utilisateurs', category: 'Utilisateurs', resource: 'users', action: 'view' },
  { name: 'users.create', description: 'Créer des utilisateurs', category: 'Utilisateurs', resource: 'users', action: 'create' },
  { name: 'users.update', description: 'Modifier les utilisateurs', category: 'Utilisateurs', resource: 'users', action: 'update' },
  { name: 'users.delete', description: 'Supprimer des utilisateurs', category: 'Utilisateurs', resource: 'users', action: 'delete' },
  // Rapports
  { name: 'reports.view', description: 'Voir les rapports', category: 'Rapports', resource: 'reports', action: 'view' },
  { name: 'reports.export', description: 'Exporter les rapports', category: 'Rapports', resource: 'reports', action: 'export' },
  // Emplacements
  { name: 'locations.view', description: 'Voir les emplacements', category: 'Emplacements', resource: 'locations', action: 'view' },
  { name: 'locations.manage', description: 'Gérer les emplacements', category: 'Emplacements', resource: 'locations', action: 'manage' },
  // Système
  { name: 'system.admin', description: 'Administration système', category: 'Système', resource: 'system', action: 'admin' },
  { name: 'audit.view', description: 'Voir les logs d\'audit', category: 'Système', resource: 'audit', action: 'view' },
  // Pièces jointes
  { name: 'attachments.view', description: 'Voir les pièces jointes', category: 'Pièces jointes', resource: 'attachments', action: 'view' },
  { name: 'attachments.upload', description: 'Ajouter des pièces jointes', category: 'Pièces jointes', resource: 'attachments', action: 'upload' },
  { name: 'attachments.delete', description: 'Supprimer des pièces jointes', category: 'Pièces jointes', resource: 'attachments', action: 'delete' },
];

const rolesData = [
  {
    name: 'Super Admin',
    description: 'Accès illimité à toutes les fonctionnalités',
    permissions: permissionsData.map((p) => p.name),
  },
  {
    name: 'Admin',
    description: 'Accès complet sauf gestion des Super Admin',
    permissions: permissionsData.filter((p) => p.name !== 'system.admin').map((p) => p.name),
  },
  {
    name: 'Opérateur',
    description: 'Gestion des stocks et mouvements',
    permissions: [
      'stock.view', 'stock.create', 'stock.update', 'stock.transfer',
      'locations.view', 'reports.view', 'attachments.view', 'attachments.upload',
    ],
  },
  {
    name: 'Lecteur',
    description: 'Lecture seule des rapports et stocks',
    permissions: [
      'stock.view', 'reports.view', 'reports.export', 'locations.view', 'attachments.view',
    ],
  },
];

export async function POST() {
  try {
    // Créer les permissions si elles n'existent pas
    for (const p of permissionsData) {
      await prisma.permission.upsert({
        where: { name: p.name },
        update: {},
        create: p,
      });
    }
    // Créer les rôles et lier les permissions
    for (const r of rolesData) {
      const permissions = await prisma.permission.findMany({ where: { name: { in: r.permissions } } });
      await prisma.role.upsert({
        where: { name: r.name },
        update: {
          description: r.description,
          permissions: { set: permissions.map((p) => ({ id: p.id })) },
        },
        create: {
          name: r.name,
          description: r.description,
          permissions: { connect: permissions.map((p) => ({ id: p.id })) },
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la seed des rôles/permissions.' }, { status: 500 });
  }
} 