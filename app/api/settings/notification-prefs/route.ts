import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Correction : récupérer dynamiquement un userId existant si l'utilisateur connecté n'est pas géré
async function getValidUserId() {
  // À remplacer par la vraie logique d'auth si disponible
  const user = await prisma.user.findFirst();
  return user ? user.id : null;
}

export async function GET(req: NextRequest) {
  // Si ?recipients=1, retourne la liste des utilisateurs pour la sélection
  const url = new URL(req.url);
  if (url.searchParams.get("recipients")) {
    const users = await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true, role: true }
    });
    return NextResponse.json({ users });
  }
  const userId = await getValidUserId();
  if (!userId) {
    return NextResponse.json({ error: "Aucun utilisateur trouvé en base." }, { status: 500 });
  }
  let notif = await prisma.notificationSetting.findUnique({ where: { userId } });
  if (!notif) {
    notif = await prisma.notificationSetting.create({ data: { userId, settings: { mouvement: true, rapport: true, erreur: true } } });
  }
  // Récupère les destinataires stockés dans settings
  const stockAlertSetting = await prisma.settings.findUnique({ where: { key: 'stock_alert_recipients' } });
  let recipients = { admins: false, operateurs: false, users: [] };
  if (stockAlertSetting && stockAlertSetting.value) {
    try { recipients = JSON.parse(stockAlertSetting.value); } catch {}
  }
  return NextResponse.json({ settings: notif.settings, recipients });
}

export async function POST(req: NextRequest) {
  const { settings, recipients } = await req.json();
  const userId = await getValidUserId();
  if (!userId) {
    return NextResponse.json({ error: "Aucun utilisateur trouvé en base." }, { status: 500 });
  }
  await prisma.notificationSetting.upsert({
    where: { userId },
    update: { settings },
    create: { userId, settings },
  });
  // Sauvegarde les destinataires dans settings
  if (recipients) {
    await prisma.settings.upsert({
      where: { key: 'stock_alert_recipients' },
      update: { value: JSON.stringify(recipients) },
      create: { key: 'stock_alert_recipients', value: JSON.stringify(recipients) },
    });
  }
  return NextResponse.json({ success: true });
} 