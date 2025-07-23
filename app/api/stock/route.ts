import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const stockSchema = z.object({
  locationId: z.string().min(1),
  cardTypeId: z.string().min(1),
  quantity: z.number().int(),
  alertThreshold: z.number().int().optional(),
  lastUpdate: z.string().optional(),
});
const stockUpdateSchema = stockSchema.partial().extend({ id: z.string() });

// GET /api/stock : liste tout le stock
export async function GET() {
  const stock = await prisma.stock.findMany({
    include: {
      location: {
        include: {
          bank: true,
        },
      },
      cardType: true,
    },
  });
  return NextResponse.json(stock);
}

// POST /api/stock : crée une nouvelle entrée de stock
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parse = stockSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const stockItem = await prisma.stock.create({ data: parse.data });
    return NextResponse.json(stockItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la création du stock." }, { status: 500 });
  }
}

// PATCH /api/stock : modifie une entrée de stock
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const parse = stockUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { id, ...updateData } = parse.data;
  if (!id) {
    return NextResponse.json({ error: "ID stock manquant." }, { status: 400 });
  }
  try {
    const updatedStock = await prisma.stock.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedStock);
  } catch (error: any) {
    console.error("PATCH /api/stock error:", error);
    return NextResponse.json({ error: "Erreur lors de la modification du stock.", details: error.message }, { status: 500 });
  }
}

// DELETE /api/stock : supprime une entrée de stock
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  if (!id) {
    return NextResponse.json({ error: "ID stock manquant." }, { status: 400 });
  }
  try {
    await prisma.stock.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la suppression du stock." }, { status: 500 });
  }
} 