import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const settingsSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1),
});
const settingsUpdateSchema = settingsSchema.partial().extend({ key: z.string().min(1) });

// GET /api/settings : liste tous les paramètres
export async function GET() {
  const settings = await prisma.settings.findMany();
  return NextResponse.json(settings);
}

// POST /api/settings : crée un paramètre
export async function POST(req: NextRequest) {
  const data = await req.json();
  const parse = settingsSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const setting = await prisma.settings.create({ data: parse.data });
    // Ajout notification
    await prisma.notification.create({
      data: {
        userId: 'system',
        title: 'Paramètre créé',
        message: `Le paramètre ${parse.data.key} a été créé avec la valeur ${parse.data.value}`,
        type: 'settings',
      }
    });
    return NextResponse.json(setting, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la création du paramètre." }, { status: 500 });
  }
}

// PATCH /api/settings : modifie un paramètre
export async function PATCH(req: NextRequest) {
  const data = await req.json();
  // Mode batch : { batch: true, values: { smtp_host: ..., smtp_port: ... } }
  if (data.batch && data.values && typeof data.values === 'object') {
    const updates = Object.entries(data.values).map(async ([key, value]) => {
      const upserted = await prisma.settings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
      // Ajout notification
      await prisma.notification.create({
        data: {
          userId: 'system',
          title: 'Paramètre modifié',
          message: `Le paramètre ${key} a été modifié/ajouté avec la valeur ${value}`,
          type: 'settings',
        }
      });
      return upserted;
    });
    await Promise.all(updates);
    return NextResponse.json({ success: true });
  }
  const parse = settingsUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { key, value } = parse.data;
  if (!key) {
    return NextResponse.json({ error: "Clé du paramètre manquante." }, { status: 400 });
  }
  try {
    const updatedSetting = await prisma.settings.update({
      where: { key },
      data: { value },
    });
    // Ajout notification
    await prisma.notification.create({
      data: {
        userId: 'system',
        title: 'Paramètre modifié',
        message: `Le paramètre ${key} a été modifié avec la valeur ${value}`,
        type: 'settings',
      }
    });
    return NextResponse.json(updatedSetting);
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la modification du paramètre." }, { status: 500 });
  }
}

// DELETE /api/settings : supprime un paramètre
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { key } = data;
  if (!key) {
    return NextResponse.json({ error: "Clé du paramètre manquante." }, { status: 400 });
  }
  try {
    await prisma.settings.delete({ where: { key } });
    // Ajout notification
    await prisma.notification.create({
      data: {
        userId: 'system',
        title: 'Paramètre supprimé',
        message: `Le paramètre ${key} a été supprimé.`,
        type: 'settings',
      }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: "Erreur lors de la suppression du paramètre." }, { status: 500 });
  }
} 