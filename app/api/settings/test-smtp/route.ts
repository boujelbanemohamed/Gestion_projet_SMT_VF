import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

async function getSmtpConfig() {
  const keys = ["smtp_host", "smtp_port", "smtp_user", "smtp_password", "smtp_tls"];
  const settings = await prisma.settings.findMany({ where: { key: { in: keys } } });
  const config: any = {};
  for (const s of settings) config[s.key] = s.value;
  return config;
}

export async function POST(req: NextRequest) {
  try {
    const { to } = await req.json();
    const smtp = await getSmtpConfig();
    if (!smtp.smtp_host || !smtp.smtp_port || !smtp.smtp_user || !smtp.smtp_password) {
      return NextResponse.json({ error: "Configuration SMTP incomplète." }, { status: 400 });
    }
    const transporter = nodemailer.createTransport({
      host: smtp.smtp_host,
      port: Number(smtp.smtp_port),
      secure: smtp.smtp_tls === "true" || smtp.smtp_tls === true,
      auth: {
        user: smtp.smtp_user,
        pass: smtp.smtp_password,
      },
    });
    await transporter.sendMail({
      from: smtp.smtp_user,
      to,
      subject: "Test SMTP",
      text: "Ceci est un email de test envoyé depuis la configuration SMTP de votre application.",
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Erreur SMTP test:", e);
    return NextResponse.json({ error: e.message || "Erreur lors de l'envoi du mail de test." }, { status: 500 });
  }
} 