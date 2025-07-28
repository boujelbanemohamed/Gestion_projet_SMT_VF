import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const movementItemSchema = z.object({
  cardTypeId: z.string(),
  quantity: z.number().int().positive(),
});

const movementSchema = z.object({
  type: z.enum(['ENTREE', 'SORTIE', 'TRANSFERT']),
  userId: z.string(),
  items: z.array(movementItemSchema).min(1),
  sourceLocationId: z.string().optional().nullable(),
  destinationLocationId: z.string().optional().nullable(),
  referenceNumber: z.string().optional(),
  notes: z.string().optional(),
  attachments: z.any().optional(),
});
const movementUpdateSchema = movementSchema.partial().extend({ id: z.string() });

// GET /api/movements : liste tous les mouvements
export async function GET() {
  const movements = await prisma.movement.findMany({
    include: {
      user: true, // Inclure les données de l'utilisateur
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  return NextResponse.json(movements);
}

// Correction : récupérer dynamiquement un userId existant si le userId fourni est absent ou invalide
async function getValidUserId(userId?: string) {
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) return userId;
  }
  const user = await prisma.user.findFirst();
  return user ? user.id : null;
}

// POST /api/movements : crée un nouveau mouvement
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = movementSchema.safeParse(body);

  if (!parse.success) {
      console.error('Validation Error:', parse.error.flatten());
      return NextResponse.json({ error: 'Validation Error', details: parse.error.flatten() }, { status: 400 });
    }

    // Correction ici : userId dynamique
    const userId = await getValidUserId(parse.data.userId);
    if (!userId) {
      return NextResponse.json({ error: "Aucun utilisateur valide trouvé pour ce mouvement." }, { status: 500 });
    }
    const { type, items, sourceLocationId, destinationLocationId, referenceNumber, notes, attachments } = parse.data;

    await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const { cardTypeId, quantity } = item;

        // Base data for any movement
        const movementData: any = {
          type,
          quantity,
          userId,
          cardTypeId,
          referenceNumber,
          notes,
          attachments, // Inclure les pièces jointes
        };

        if (type === 'ENTREE') {
          if (!destinationLocationId) {
            throw new Error('Destination location is required for an entry.');
          }
          movementData.locationId = destinationLocationId;

          // Update stock at destination
          await tx.stock.upsert({
            where: {
              locationId_cardTypeId: {
                locationId: destinationLocationId,
                cardTypeId,
              },
            },
            update: {
              quantity: {
                increment: quantity,
              },
            },
            create: {
              locationId: destinationLocationId,
              cardTypeId,
              quantity,
            },
          });
        } else if (type === 'SORTIE') {
          if (!sourceLocationId) {
            throw new Error('Source location is required for a withdrawal.');
          }
          movementData.locationId = sourceLocationId;

          // Update stock at source
          const sourceStock = await tx.stock.findUnique({
            where: {
              locationId_cardTypeId: {
                locationId: sourceLocationId,
                cardTypeId,
              },
            },
          });

          if (!sourceStock || sourceStock.quantity < quantity) {
            throw new Error(`Insufficient stock for Card Type ID: ${cardTypeId} at Location ID: ${sourceLocationId}`);
          }

          await tx.stock.update({
            where: {
              locationId_cardTypeId: {
                locationId: sourceLocationId,
                cardTypeId,
              },
            },
            data: {
              quantity: {
                decrement: quantity,
              },
            },
          });
        } else if (type === 'TRANSFERT') {
          if (!sourceLocationId || !destinationLocationId) {
            throw new Error('Source and destination locations are required for a transfer.');
          }

          // Create a single movement record for the transfer
          movementData.locationId = sourceLocationId;
          movementData.destLocationId = destinationLocationId;
          
          // Update stock at source (decrement)
          const sourceStock = await tx.stock.findUnique({
            where: { locationId_cardTypeId: { locationId: sourceLocationId, cardTypeId } },
          });
          if (!sourceStock || sourceStock.quantity < quantity) {
            throw new Error(`Insufficient stock for transfer at source.`);
          }
          await tx.stock.update({
            where: { locationId_cardTypeId: { locationId: sourceLocationId, cardTypeId } },
            data: { quantity: { decrement: quantity } },
          });

          // Update stock at destination (increment)
          await tx.stock.upsert({
            where: { locationId_cardTypeId: { locationId: destinationLocationId, cardTypeId } },
            update: { quantity: { increment: quantity } },
            create: { locationId: destinationLocationId, cardTypeId, quantity },
          });
        }

        // Create the single movement record for ENTREE, SORTIE, or TRANSFERT
        await tx.movement.create({
          data: movementData,
        });
      }
    });

    return NextResponse.json({ success: true, message: 'Movement recorded successfully.' }, { status: 201 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to record movement', details: error.message }, { status: 500 });
  }
}

// PATCH /api/movements : modifie un mouvement
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const parse = movementUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { id, ...updateData } = parse.data;
  if (!id) {
    return NextResponse.json({ error: "ID mouvement manquant." }, { status: 400 });
  }
  try {
    const updatedMovement = await prisma.movement.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedMovement);
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la modification du mouvement." }, { status: 500 });
  }
}

// DELETE /api/movements : supprime un mouvement
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  if (!id) {
    return NextResponse.json({ error: "ID mouvement manquant." }, { status: 400 });
  }
  try {
    await prisma.movement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la suppression du mouvement." }, { status: 500 });
  }
} 