import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getMonthName(month: number) {
  return [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ][month];
}

export async function GET() {
  // KPIs principaux
  const [totalUsers, totalStock, totalMovements, totalBanks, totalCardTypes, totalLocations, banks, locations, stock, cardTypes] = await Promise.all([
    prisma.user.count(),
    prisma.stock.aggregate({ _sum: { quantity: true } }),
    prisma.movement.count(),
    prisma.bank.count(),
    prisma.cardType.count(),
    prisma.location.count(),
    prisma.bank.findMany(),
    prisma.location.findMany(),
    prisma.stock.findMany(),
    prisma.cardType.findMany(),
  ]);

  // Alertes critiques (stock <= alertThreshold)
  const allThresholdStocks = await prisma.stock.findMany({
    where: { alertThreshold: { gt: 0 } },
    include: { location: { include: { bank: true } }, cardType: true },
  });
  const criticalStock = allThresholdStocks.filter(s => typeof s.alertThreshold === 'number' && s.quantity <= s.alertThreshold);

  // Mouvements par mois (6 derniers mois)
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const movements = await prisma.movement.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true }
  });
  const movementsByMonth: { name: string, value: number, color: string }[] = [];
  for (let i = 0; i < 6; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const monthName = getMonthName(month.getMonth());
    const count = movements.filter(m => {
      const d = new Date(m.createdAt);
      return d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
    }).length;
    movementsByMonth.push({ name: monthName, value: count, color: '#3b82f6' });
  }

  // Stock par type réel
  const stockByType = cardTypes.map(ct => {
    const value = stock.filter(s => s.cardTypeId === ct.id).reduce((sum, s) => sum + s.quantity, 0);
    return {
      name: ct.name,
      value,
      color: '#3b82f6',
    };
  });

  // 5 derniers mouvements
  const recentMovements = await prisma.movement.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { user: true, cardType: true, location: true }
  });
  const movementActivities = recentMovements.map((m) => ({
    id: m.id,
    type: 'movement',
    description: `${m.type} de ${m.quantity} cartes ${m.cardType?.name || ''} à ${m.location?.name || ''}`,
    timestamp: m.createdAt,
    user: m.user?.firstName || 'Utilisateur',
    status: 'success',
  }));

  // 3 derniers utilisateurs créés
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });
  const userActivities = recentUsers.map((u) => ({
    id: u.id,
    type: 'user',
    description: `Création du compte utilisateur ${u.firstName} ${u.lastName}`,
    timestamp: u.createdAt,
    user: u.firstName,
    status: 'success',
  }));

  // 2 derniers rapports générés
  let reportActivities: any[] = [];
  try {
    const recentReports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: 2,
    });
    reportActivities = recentReports.map((r) => ({
      id: r.id,
      type: 'report',
      description: `Rapport ${r.type} généré`,
      timestamp: r.createdAt,
      user: r.createdBy || 'Système',
      status: 'success',
    }));
  } catch (e) {}

  // Fusionne et trie toutes les activités par date décroissante
  const recentActivities = [...movementActivities, ...userActivities, ...reportActivities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  // Mouvements de la semaine (lundi à dimanche)
  const nowDate = new Date();
  const dayOfWeek = nowDate.getDay() === 0 ? 7 : nowDate.getDay(); // 1=lundi, 7=dimanche
  const monday = new Date(nowDate);
  monday.setDate(nowDate.getDate() - dayOfWeek + 1);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weekMovements = await prisma.movement.findMany({
    where: {
      createdAt: {
        gte: monday,
        lte: sunday,
      },
    },
  });
  const recentEntries = weekMovements.filter(m => m.type === 'ENTREE').length;
  const recentExits = weekMovements.filter(m => m.type === 'SORTIE').length;
  const recentTransfers = weekMovements.filter(m => m.type === 'TRANSFERT').length;

  return NextResponse.json({
    totalUsers,
    totalStock: totalStock._sum.quantity || 0,
    totalMovements,
    totalBanks,
    totalCardTypes,
    totalLocations,
    criticalStockCount: criticalStock.length,
    criticalStock,
    banks,
    locations,
    stock,
    recentActivities,
    movementsByMonth,
    stockByType,
    recentEntries,
    recentExits,
    recentTransfers,
  });
} 