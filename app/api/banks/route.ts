import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const bankSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  bankCode: z.string().min(1),
  createdAt: z.string().optional(), // ou z.date().optional() si tu utilises des objets Date
});
const bankUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  address: z.string().optional(),
  bankCode: z.string().optional(),
  createdAt: z.string().optional(),
});

// GET /api/banks : liste toutes les banques
export async function GET() {
  const banks = await prisma.bank.findMany();
  return NextResponse.json(banks);
}

// POST /api/banks : crée une nouvelle banque
export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log('POST /api/banks data:', data); // LOG AJOUTÉ
  const parse = bankSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    // Vérification unicité du code banque
    const existingBank = await prisma.bank.findUnique({ where: { bankCode: parse.data.bankCode } });
    if (existingBank) {
      return NextResponse.json(
        { error: "Le code de la banque doit être unique. Ce code est déjà utilisé." },
        { status: 400 }
      );
    }
    const bank = await prisma.bank.create({ data: parse.data });
    return NextResponse.json(bank, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la création de la banque." }, { status: 500 });
  }
}

// PATCH /api/banks : modifie une banque
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const parse = bankUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { id, ...updateData } = parse.data;
  if (!id) {
    return NextResponse.json({ error: "ID banque manquant." }, { status: 400 });
  }
  try {
    const updatedBank = await prisma.bank.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedBank);
  } catch (error: any) {
    console.error('Erreur lors de la modification de la banque:', error);
    return NextResponse.json({ error: "Erreur lors de la modification de la banque.", details: error?.message || error }, { status: 500 });
  }
}

// DELETE /api/banks : supprime une banque
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  if (!id) {
    return NextResponse.json({ error: "ID banque manquant." }, { status: 400 });
  }
  try {
    await prisma.bank.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la suppression de la banque." }, { status: 500 });
  }
} 