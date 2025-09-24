import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.string().min(1),
  bankId: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  preferences: z.any().optional().nullable(),
  privacy: z.any().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  manager: z.string().optional().nullable(),
});

const userUpdateSchema = userSchema.partial().extend({ id: z.string() });

// GET /api/users : liste tous les utilisateurs
export async function GET() {
  try {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
  } catch (error) {
    console.error("Erreur API /api/users :", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des utilisateurs." }, { status: 500 });
  }
}

// POST /api/users : crée un nouvel utilisateur
export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/api/users/seed')) {
    // Création/MAJ des rôles et seed utilisateurs de test en reliant par roleId
    const roles = [
      { name: 'admin', description: 'Administrateur' },
      { name: 'operateur', description: 'Opérateur' },
      { name: 'auditeur', description: 'Auditeur' },
    ];
    const roleIdByName: Record<string, string> = {} as any;
    for (const r of roles) {
      const role = await prisma.role.upsert({
        where: { name: r.name },
        update: { description: r.description },
        create: { name: r.name, description: r.description },
      });
      roleIdByName[r.name] = role.id;
    }

    const users = [
      { email: 'admin@banque.com', password: 'admin123', firstName: 'Admin', lastName: 'Principal', roleName: 'admin' },
      { email: 'operateur1@banque.com', password: 'op123', firstName: 'Opérateur', lastName: 'Un', roleName: 'operateur' },
      { email: 'lecteur1@banque.com', password: 'lect123', firstName: 'Lecteur', lastName: 'Un', roleName: 'auditeur' },
    ];
    for (const u of users) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          email: u.email,
          password: u.password,
          firstName: u.firstName,
          lastName: u.lastName,
          roleId: roleIdByName[u.roleName],
        },
      });
    }
    return NextResponse.json({ success: true, created: users.length });
  }
  const data = await req.json();
  // Mapper role (id ou nom) -> roleId
  let roleIdToSet: string | null = null;
  if (data.role) {
    const foundById = await prisma.role.findUnique({ where: { id: data.role } });
    const foundByName = foundById ? null : await prisma.role.findUnique({ where: { name: data.role } });
    roleIdToSet = foundById?.id || foundByName?.id || null;
  }

  const parse = userSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const { role: _role, ...rest } = parse.data as any;
    const user = await prisma.user.create({ data: { ...rest, roleId: roleIdToSet || undefined } });
    // Log d'audit création utilisateur
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_CREATE',
        resource: 'users',
        details: `Création utilisateur: ${user.email}`,
        ip: '',
        type: 'success',
        timestamp: new Date(),
      }
    });
    // Notif création de compte
    // Cherche les destinataires dans settings
    const setting = await prisma.settings.findUnique({ where: { key: 'stock_alert_recipients' } });
    let recipients = { admins: false, operateurs: false, users: [] };
    if (setting && setting.value) {
      try { recipients = JSON.parse(setting.value); } catch {}
    }
    // Cherche les admins/ops à notifier
    let usersToNotify: any[] = [];
    if (recipients.admins) {
      const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
      if (adminRole) {
        usersToNotify = usersToNotify.concat(await prisma.user.findMany({ where: { roleId: adminRole.id } }));
      }
    }
    if (recipients.operateurs) {
      const operateurRole = await prisma.role.findUnique({ where: { name: 'operateur' } });
      if (operateurRole) {
        usersToNotify = usersToNotify.concat(await prisma.user.findMany({ where: { roleId: operateurRole.id } }));
      }
    }
    if (recipients.users && recipients.users.length > 0) {
      usersToNotify = usersToNotify.concat(await prisma.user.findMany({ where: { id: { in: recipients.users } } }));
    }
    // Filtre doublons
    usersToNotify = usersToNotify.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    // Pour chaque destinataire, vérifie la préférence newAccount
    for (const dest of usersToNotify) {
      const pref = await prisma.notificationSetting.findUnique({ where: { userId: dest.id } });
      if (pref && pref.settings && pref.settings.newAccount) {
        await prisma.notification.create({
          data: {
            userId: dest.id,
            title: "Nouveau compte créé",
            message: `Un nouveau compte a été créé : ${user.firstName} ${user.lastName} (${user.email})`,
            type: "newAccount",
          }
        });
      }
    }
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ error: "Un utilisateur avec cet email existe déjà.", field: "email" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur lors de la création de l'utilisateur." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  // Mapper role (id ou nom) -> roleId si fourni
  let roleIdToSet: string | undefined = undefined;
  if (data.role) {
    const foundById = await prisma.role.findUnique({ where: { id: data.role } });
    const foundByName = foundById ? null : await prisma.role.findUnique({ where: { name: data.role } });
    roleIdToSet = foundById?.id || foundByName?.id || undefined;
  }
  const parse = userUpdateSchema.safeParse(data);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Validation error", details: parse.error.flatten() },
      { status: 400 }
    );
  }
  const { id, ...updateData } = parse.data as any;
  if (!id) {
    return NextResponse.json({ error: "ID utilisateur manquant." }, { status: 400 });
  }
  try {
    const { role: _role, ...rest } = updateData as any;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...rest, roleId: roleIdToSet },
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error('PATCH /api/users error:', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ error: "Un utilisateur avec cet email existe déjà.", field: "email" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erreur lors de la modification de l'utilisateur.", details: error?.message || error?.toString() }, { status: 500 });
  }
}

// DELETE /api/users : supprime un utilisateur
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { id } = data;
  if (!id) return NextResponse.json({ error: 'ID utilisateur manquant.' }, { status: 400 });
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 });
    }
    await prisma.user.delete({ where: { id } });
    // Log d'audit suppression utilisateur
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_DELETE',
        resource: 'users',
        details: `Suppression utilisateur: ${user.email}`,
        ip: '',
        type: 'success',
        timestamp: new Date(),
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression de l'utilisateur." }, { status: 500 });
  }
}

// GET /api/users/sessions : liste toutes les sessions actives
export async function GET_sessions() {
  try {
    const sessions = await prisma.session.findMany({
      where: { revoked: false },
      include: { user: true },
      orderBy: { lastActivity: 'desc' },
    });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des sessions.' }, { status: 500 });
  }
}

// POST /api/users/sessions/revoke : révoque une session par id
export async function POST_sessions_revoke(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID session manquant.' }, { status: 400 });
  try {
    await prisma.session.update({ where: { id }, data: { revoked: true } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la révocation.' }, { status: 500 });
  }
} 