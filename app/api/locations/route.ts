import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

// Schéma de validation pour la création
const locationSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire."),
  address: z.string().min(1, "L'adresse est obligatoire."),
  bankId: z.string().min(1, "La banque est obligatoire."),
  maxCapacity: z.number().int().positive().nullable().optional(),
  securityLevel: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

// Schéma de validation pour la mise à jour
const locationUpdateSchema = locationSchema.partial().extend({ 
  id: z.string().uuid("L'ID doit être un UUID valide."),
});

// GET /api/locations : liste tous les emplacements
export async function GET() {
  const locations = await prisma.location.findMany();
  return NextResponse.json(locations);
}

// POST /api/locations : crée un nouvel emplacement
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parse = locationSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const location = await prisma.location.create({ data: parse.data });
    return NextResponse.json(location, { status: 201 });
  } catch (error: any) {
    // Gérer les erreurs de base de données, ex: contrainte d'unicité
    if (error.code === 'P2002') {
       return NextResponse.json({ error: "Un emplacement avec ce nom existe déjà." }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur lors de la création de l'emplacement." }, { status: 500 });
  }
}

// PATCH /api/locations : modifie un emplacement
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const parse = locationUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { id, ...updateData } = parse.data;
  
  try {
    const updatedLocation = await prisma.location.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedLocation);
  } catch (error: any) {
     if (error.code === 'P2025') {
       return NextResponse.json({ error: "Emplacement non trouvé." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur lors de la modification de l'emplacement." }, { status: 500 });
  }
}

// DELETE /api/locations : supprime un emplacement
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  if (!id) {
    return NextResponse.json({ error: "ID emplacement manquant." }, { status: 400 });
  }
  try {
    await prisma.location.delete({ where: { id } });
    return new NextResponse(null, { status: 204 }); // Succès, pas de contenu
  } catch (error: any) {
     if (error.code === 'P2025') {
       return NextResponse.json({ error: "Emplacement non trouvé." }, { status: 404 });
    }
    return NextResponse.json({ error: "Erreur lors de la suppression de l'emplacement." }, { status: 500 });
  }
} 