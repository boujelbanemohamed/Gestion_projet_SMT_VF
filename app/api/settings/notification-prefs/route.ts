import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mock userId (à remplacer par l'utilisateur connecté)
const userId = "demo-user-id";

export async function GET(req: NextRequest) {
  // Si ?recipients=1, retourne la liste des utilisateurs pour la sélection
  const url = new URL(req.url);
  if (url.searchParams.get("recipients")) {
    const users = await prisma.user.findMany({
      select: { id: true, firstName: true, lastName: true, email: true, role: true }
    });
    return NextResponse.json({ users });
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