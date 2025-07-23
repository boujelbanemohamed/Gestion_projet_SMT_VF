import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const reportSchema = z.object({
  type: z.string().min(1),
  content: z.string().min(1),
  createdBy: z.string().optional().nullable(),
  createdAt: z.string().optional(),
});

// GET /api/reports?type=stock|mouvements : génère dynamiquement un rapport
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'stock') {
    const stock = await prisma.stock.findMany({
      include: {
        location: true,
        cardType: true,
      },
    });
    const mapped = stock.map((s, idx) => ({
      numero: idx + 1,
      location: s.location ? s.location.name : s.locationId,
      cardType: s.cardType ? s.cardType.name : s.cardTypeId,
      quantity: s.quantity,
      alertThreshold: s.alertThreshold,
      lastUpdate: s.lastUpdate,
    }));
    return NextResponse.json({ type: 'stock', data: mapped });
  }

  if (type === 'mouvements') {
    const mouvements = await prisma.movement.findMany({
      include: {
        location: true,
        destLocation: true,
        cardType: true,
        user: true,
      },
    });
    // Map pour exposer les noms lisibles
    const mapped = mouvements.map((m, idx) => ({
      numero: idx + 1, // Numéro de ligne lisible
      type: m.type,
      quantity: m.quantity,
      user: m.user ? `${m.user.firstName} ${m.user.lastName}` : m.userId,
      cardType: m.cardType ? m.cardType.name : m.cardTypeId,
      location: m.location ? m.location.name : m.locationId,
      destLocation: m.destLocation ? m.destLocation.name : m.destLocationId,
      referenceNumber: m.referenceNumber,
      notes: m.notes,
      attachments: m.attachments,
    }));
    return NextResponse.json({ type: 'mouvements', data: mapped });
  }

  // Si pas de type, retourne la liste des rapports persistés
  const reports = await prisma.report.findMany();
  return NextResponse.json(reports);
}

// POST /api/reports : persiste un rapport
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parse = reportSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const report = await prisma.report.create({ data: parse.data });
    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la création du rapport." }, { status: 500 });
  }
} 