import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const cardTypeSchema = z.object({
  name: z.string().min(1),
  bankId: z.string().min(1),
  alertThreshold: z.number().optional(),
  createdAt: z.string().optional(),
  subType: z.string().optional().nullable(),
  subSubType: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  specificities: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
});
const cardTypeUpdateSchema = cardTypeSchema.partial().extend({ id: z.string() });

// GET /api/card-types : liste tous les types de cartes
export async function GET() {
  const cardTypes = await prisma.cardType.findMany({
    include: {
      bank: true,
    },
  });
  // Ajoute bankName pour le frontend
  const result = cardTypes.map(card => ({
    ...card,
    bankName: card.bank?.name || '',
  }));
  return NextResponse.json(result);
}

// POST /api/card-types : crée un nouveau type de carte
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parse = cardTypeSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const cardType = await prisma.cardType.create({ data: parse.data });
    return NextResponse.json(cardType, { status: 201 });
  } catch (error: any) {
    console.error("Erreur Prisma lors de la création du type de carte:", error);
    return NextResponse.json({ 
      error: error?.message || error?.toString() || "Erreur lors de la création du type de carte.",
      details: JSON.stringify(error, Object.getOwnPropertyNames(error))
    }, { status: 500 });
  }
}

// PATCH /api/card-types : modifie un type de carte
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const parse = cardTypeUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { id, ...updateData } = parse.data;
  if (!id) {
    return NextResponse.json({ error: "ID type de carte manquant." }, { status: 400 });
  }
  try {
    const updatedCardType = await prisma.cardType.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedCardType);
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la modification du type de carte.", details: error?.message || error }, { status: 500 });
  }
}

// DELETE /api/card-types : supprime un type de carte
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  if (!id) {
    return NextResponse.json({ error: "ID type de carte manquant." }, { status: 400 });
  }
  try {
    await prisma.cardType.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la suppression du type de carte." }, { status: 500 });
  }
} 