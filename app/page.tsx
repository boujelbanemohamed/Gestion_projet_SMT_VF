"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Users,
  FileText,
  AlertTriangle,
  Clock,
  Activity,
  BarChart3,
  PieChart,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { mockData } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalCards: number
  totalBanks: number
  totalLocations: number
  recentEntries: number
  recentExits: number
  recentTransfers: number
  lowStockAlerts: number
  criticalStockAlerts: number
  activeUsers: number
  todayMovements: number
}

interface StockAlert {
  id: string
  locationName: string
  cardTypeName: string
  cardTypeType: string
  cardTypeSubType: string
  cardTypeSubSubType: string
  bankName: string
  currentStock: number
  minThreshold: number
  severity: "low" | "critical"
}

interface RecentActivity {
  id: string
  type: "movement" | "user" | "system"
  description: string
  timestamp: string
  user: string
  status: "success" | "warning" | "error"
}

interface ChartData {
  name: string
  value: number
  color: string
}

export default function Dashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      const loadDashboardData = async () => {
        setIsLoadingDashboard(true)
        const res = await fetch('/api/dashboard')
        const data = await res.json()
        setDashboardData(data)
        setIsLoadingDashboard(false)
      }
      loadDashboardData()
      // Rafraîchissement automatique sur événement custom
      const handler = () => loadDashboardData();
      window.addEventListener("dashboard-refresh", handler);
      return () => window.removeEventListener("dashboard-refresh", handler);
    }
  }, [user])

  const refreshData = () => {
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Chargement...</p>
        </div>
      </div>
    )
  }
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  // Utilisation des données réelles du dashboard
  const stats = {
    totalCards: dashboardData.totalStock,
    totalBanks: dashboardData.totalBanks,
    totalLocations: dashboardData.totalLocations,
    recentEntries: dashboardData.recentEntries ?? 0,
    recentExits: dashboardData.recentExits ?? 0,
    recentTransfers: dashboardData.recentTransfers ?? 0,
    lowStockAlerts: 0, // À calculer si besoin
    criticalStockAlerts: dashboardData.criticalStockCount,
    activeUsers: dashboardData.totalUsers,
    todayMovements: dashboardData.totalMovements,
  }

  // Juste après le chargement de dashboardData, prépare les mappings
  const locationMap = Object.fromEntries((dashboardData?.locations || []).map((l: any) => [l.id, l.name]));
  const cardTypeMap = Object.fromEntries((dashboardData?.cardTypes || []).map((c: any) => [c.id, c.name]));

  // Alertes critiques
  const stockAlerts = (dashboardData?.criticalStock || []).map((item: any) => ({
    id: item.id,
    locationName: item.location?.name || item.locationId,
    cardTypeName: item.cardType?.name || item.cardTypeId,
    cardTypeType: item.cardType?.type || '',
    cardTypeSubType: item.cardType?.subType || '',
    cardTypeSubSubType: item.cardType?.subSubType || '',
    bankName: item.location?.bank?.name || '',
    currentStock: item.quantity,
    minThreshold: item.alertThreshold ?? 0,
    severity: "critical",
  }));

  // Activités récentes
  const recentActivities = dashboardData.recentActivities || []

  // Données pour graphiques
  const stockByType = dashboardData.stockByType || []
  const movementsByMonth = dashboardData.movementsByMonth || []

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground">Bienvenue, {user.username} - Vue d'ensemble de la gestion de stock</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Alertes critiques */}
      {stats.criticalStockAlerts > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Alertes Critiques</AlertTitle>
          <AlertDescription>
            {stats.criticalStockAlerts} emplacement(s) ont un stock critique. Action immédiate requise.
          </AlertDescription>
        </Alert>
      )}

      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cartes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.recentEntries} cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mouvements Aujourd'hui</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayMovements}</div>
            <p className="text-xs text-muted-foreground">
              {stats.recentEntries + stats.recentExits + stats.recentTransfers} cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Stock</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.lowStockAlerts + stats.criticalStockAlerts}</div>
            <p className="text-xs text-muted-foreground">{stats.criticalStockAlerts} critiques</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">sur {dashboardData.totalUsers} comptes</p>
          </CardContent>
        </Card>
      </div>

      {/* Contenu principal avec onglets */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="movements">Mouvements</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Activité récente */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Activité Récente
                </CardTitle>
                <CardDescription>Dernières actions dans le système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity: RecentActivity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {activity.status === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                        {activity.status === "error" && <XCircle className="h-4 w-4 text-destructive" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Par {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
                <CardDescription>Accès direct aux fonctionnalités</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button className="justify-start bg-transparent" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Nouvelle Entrée
                  </Button>
                  <Button className="justify-start bg-transparent" variant="outline">
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Nouvelle Sortie
                  </Button>
                  <Button className="justify-start bg-transparent" variant="outline">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Nouveau Transfert
                  </Button>
                  <Button className="justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Générer Rapport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Répartition du stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Répartition du Stock par Type
              </CardTitle>
              <CardDescription>Distribution des cartes par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {stockByType.map((item: ChartData, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.value.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {((item.value / stats.totalCards) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{stats.totalCards.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total des cartes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entrées (7j)</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stats.recentEntries}</div>
                <Progress value={75} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+15% vs semaine précédente</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sorties (7j)</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{stats.recentExits}</div>
                <Progress value={45} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">-8% vs semaine précédente</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transferts (7j)</CardTitle>
                <ArrowRightLeft className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">{stats.recentTransfers}</div>
                <Progress value={60} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">+3% vs semaine précédente</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Évolution des Mouvements
              </CardTitle>
              <CardDescription>Mouvements par mois (6 derniers mois)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {movementsByMonth.map((month: ChartData, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium">{month.name}</div>
                    <div className="flex-1">
                      <Progress value={(month.value / 70) * 100} className="h-2" />
                    </div>
                    <div className="w-12 text-sm text-right">{month.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {stockAlerts.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Aucune alerte</h3>
                    <p className="text-muted-foreground">Tous les stocks sont à des niveaux acceptables</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              stockAlerts.map((alert: StockAlert) => (
                <Alert key={alert.id} variant={alert.severity === "critical" ? "destructive" : "default"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>
                    Stock {alert.severity === "critical" ? "Critique" : "Faible"} - {alert.cardTypeName}{alert.cardTypeSubType && ` - ${alert.cardTypeSubType}`}{alert.cardTypeSubSubType && ` - ${alert.cardTypeSubSubType}`} - {alert.bankName}
                  </AlertTitle>
                  <AlertDescription>
                    <div className="mt-2">
                      <p>Banque : {alert.bankName}</p>
                      <p>Emplacement: {alert.locationName}</p>
                      <p>Stock actuel: {alert.currentStock} cartes</p>
                      <p>Seuil minimum: {alert.minThreshold} cartes</p>
                      <p>Type: {alert.cardTypeName}</p>
                      {alert.cardTypeSubType && <p>Sous-type: {alert.cardTypeSubType}</p>}
                      {alert.cardTypeSubSubType && <p>Sous-sous-type: {alert.cardTypeSubSubType}</p>}
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir Détails
                        </Button>
                        <Button size="sm">Réapprovisionner</Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Taux d'Utilisation des Emplacements</CardTitle>
                <CardDescription>Capacité utilisée par emplacement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.locations.map((location: any) => {
                    const stockInLocation = dashboardData.stock
                      .filter((s: any) => s.locationId === location.id)
                      .reduce((sum: number, s: any) => sum + s.quantity, 0)
                    const utilizationRate = (stockInLocation / location.maxCapacity) * 100

                    return (
                      <div key={location.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{location.name}</span>
                          <span>{utilizationRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={utilizationRate} />
                        <div className="text-xs text-muted-foreground">
                          {(stockInLocation || 0).toLocaleString()} / {(location.maxCapacity || 0).toLocaleString()} cartes
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance par Banque</CardTitle>
                <CardDescription>Activité des mouvements par banque</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.banks.map((bank: any, index: number) => {
                    const bankLocations = dashboardData.locations.filter((l: any) => l.bankId === bank.id)
                    const totalStock = bankLocations.reduce((sum: number, location: any) => {
                      return (
                        sum +
                        dashboardData.stock
                          .filter((s: any) => s.locationId === location.id)
                          .reduce((stockSum: number, s: any) => stockSum + s.quantity, 0)
                      )
                    }, 0)

                    return (
                      <div key={bank.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary" />
                          <div>
                            <div className="font-medium">{bank.name}</div>
                            <div className="text-sm text-muted-foreground">{bankLocations.length} emplacement(s)</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{totalStock.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">cartes</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
