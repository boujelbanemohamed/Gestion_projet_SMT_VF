import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/permissions : liste toutes les permissions
export async function GET() {
  try {
    const permissions = await prisma.permission.findMany({
      include: { roles: true }
    });
    return NextResponse.json(permissions);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des permissions.' }, { status: 500 });
  }
}

// POST /api/permissions : créer une nouvelle permission
export async function POST(req: NextRequest) {
  try {
    const { name, description, category, resource, action } = await req.json();
    const permission = await prisma.permission.create({
      data: { name, description, category, resource, action },
    });
    return NextResponse.json(permission, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la permission.' }, { status: 500 });
  }
}

// PATCH /api/permissions : modifier une permission
export async function PATCH(req: NextRequest) {
  try {
    const { id, name, description, category, resource, action } = await req.json();
    const permission = await prisma.permission.update({
      where: { id },
      data: { name, description, category, resource, action },
    });
    return NextResponse.json(permission);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la modification de la permission.' }, { status: 500 });
  }
}

// DELETE /api/permissions : supprimer une permission
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.permission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression de la permission.' }, { status: 500 });
  }
} 