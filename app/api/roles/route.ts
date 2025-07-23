import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/roles : liste tous les rôles avec leurs permissions
export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      include: { permissions: true }
    });
    return NextResponse.json(roles);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des rôles.' }, { status: 500 });
  }
}

// POST /api/roles : créer un nouveau rôle
export async function POST(req: NextRequest) {
  try {
    const { name, description, permissionIds } = await req.json();
    const role = await prisma.role.create({
      data: {
        name,
        description,
        permissions: {
          connect: permissionIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: { permissions: true },
    });
    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du rôle.' }, { status: 500 });
  }
}

// PATCH /api/roles : modifier un rôle
export async function PATCH(req: NextRequest) {
  try {
    const { id, name, description, permissionIds } = await req.json();
    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        permissions: {
          set: permissionIds?.map((id: string) => ({ id })) || [],
        },
      },
      include: { permissions: true },
    });
    return NextResponse.json(role);
  } catch (error) {
    console.error('PATCH /api/roles error:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification du rôle.' }, { status: 500 });
  }
}

// DELETE /api/roles : supprimer un rôle
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.role.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression du rôle.' }, { status: 500 });
  }
} 