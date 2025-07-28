"use client"

import type React from "react"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, MapPin, Package, Building2, Shield, Eye, Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Loader } from "@/components/ui/loader";

// --- Interfaces de données ---
interface Bank {
  id: string
  name: string
  bankCode: string
}

interface Stock {
  id: string
  locationId: string
  quantity: number
  cardTypeId: string
}

interface CardType {
  id: string
  type: string
  subType: string
  subSubType: string
}

interface Location {
  id: string
  name: string
  address: string | null
  bankId: string
  maxCapacity?: number | null
  securityLevel?: string | null
  description?: string | null
  createdAt: string
  modifiedAt?: string
}

interface EnrichedLocation extends Location {
  bank?: Bank
  totalCards: number
  cardTypes: number
  occupancyRate: number
}

interface LocationFormData {
  name: string
  address: string
  bankId: string
  maxCapacity: string
  securityLevel: string
  description: string
}

export default function LocationsPage() {
  console.log('LocationsPage mounted');
  // --- États du composant ---
  const [locations, setLocations] = useState<Location[]>([])
  const [banks, setBanks] = useState<Bank[]>([])
  const [stock, setStock] = useState<Stock[]>([])
  const [cardTypes, setCardTypes] = useState<CardType[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [selectedBank, setSelectedBank] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingLocation, setViewingLocation] = useState<Location | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [missingFields, setMissingFields] = useState<{ name: boolean; address: boolean; bankId: boolean }>({
    name: false,
    address: false,
    bankId: false,
  })

  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    address: "",
    bankId: "",
    maxCapacity: "",
    securityLevel: "",
    description: "",
  })

  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  // --- Chargement des données ---
  const fetchData = async () => {
    setLoading(true)
    try {
      const [locationsRes, banksRes, stockRes, cardTypesRes] = await Promise.all([
        fetch('/api/locations'),
        fetch('/api/banks'),
        fetch('/api/stock'),
        fetch('/api/card-types')
      ]);

      if (!locationsRes.ok || !banksRes.ok || !stockRes.ok || !cardTypesRes.ok) {
        throw new Error('Failed to fetch data from one or more endpoints');
      }

      const locationsData = await locationsRes.json()
      const banksData = await banksRes.json()
      const stockData = await stockRes.json()
      const cardTypesData = await cardTypesRes.json()
      
      setLocations(locationsData)
      setBanks(banksData)
      setStock(stockData)
      setCardTypes(cardTypesData)

    } catch (error) {
      console.error("Failed to fetch data:", error)
      toast({
        title: "Erreur de chargement",
        description: "Impossible de récupérer les données. Veuillez rafraîchir la page.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- API Calls ---
  const refreshLocations = async () => {
    const res = await fetch('/api/locations');
    if (res.ok) {
    const data = await res.json();
    setLocations(data);
    }
  };

  const handleCreateLocation = async (formData: LocationFormData) => {
    const res = await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity, 10) : null
      })
    });
    if (res.ok) {
      await refreshLocations();
      resetForm()
      toast({
        title: "Emplacement créé",
        description: "Le nouvel emplacement a été ajouté avec succès.",
      })
    } else {
      const errorData = await res.json()
      toast({
        title: "Erreur de création",
        description: errorData.error || "Une erreur est survenue.",
        variant: "destructive",
      })
    }
  };

  const handleEditLocation = async (id: string, formData: LocationFormData) => {
    const res = await fetch('/api/locations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id, 
        ...formData,
        maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity, 10) : null
      })
    });
    if (res.ok) {
      await refreshLocations();
      resetForm()
      toast({
        title: "Emplacement modifié",
        description: "Les informations de l'emplacement ont été mises à jour.",
      })
    } else {
      const errorData = await res.json()
      toast({
        title: "Erreur de modification",
        description: errorData.error || "Une erreur est survenue.",
        variant: "destructive",
      })
    }
  };

  const handleDeleteLocation = async (id: string) => {
    const res = await fetch('/api/locations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      await refreshLocations();
      toast({
        title: "Emplacement supprimé",
        description: "L'emplacement a été supprimé avec succès.",
      })
    } else {
      const errorData = await res.json()
      toast({
        title: "Erreur de suppression",
        description: errorData.error || "Une erreur est survenue.",
        variant: "destructive",
  })
    }
  };

  // --- Données calculées (Memoized) ---
  const enrichedLocations: EnrichedLocation[] = useMemo(() =>
    locations.map((loc) => {
      const bank = banks.find((b) => b.id === loc.bankId)
      const locationStock = stock.filter((s) => s.locationId === loc.id)
      const totalCards = locationStock.reduce((sum, s) => sum + s.quantity, 0)
      const cardTypesCount = new Set(locationStock.map(s => s.cardTypeId)).size
      const occupancyRate = (loc.maxCapacity && loc.maxCapacity > 0) ? (totalCards / loc.maxCapacity) * 100 : 0

      return {
        ...loc,
        bank,
        totalCards,
        cardTypes: cardTypesCount,
        occupancyRate,
      }
    }),
  [locations, banks, stock]);

  const filteredLocations = useMemo(() =>
    enrichedLocations.filter((location) => {
      const matchesSearch =
        !searchTerm ||
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (location.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (location.bank?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesBank = selectedBank === "all" || location.bankId === selectedBank;
      return matchesSearch && matchesBank;
    }),
  [enrichedLocations, searchTerm, selectedBank]);

  const stats = useMemo(() => {
    const totalLocations = filteredLocations.length;
    const totalCapacity = filteredLocations.reduce((sum, loc) => sum + (loc.maxCapacity || 0), 0);
    const totalCards = filteredLocations.reduce((sum, loc) => sum + (loc.totalCards || 0), 0);
    const averageOccupancy =
      totalLocations > 0
        ? filteredLocations.reduce((sum, loc) => sum + (loc.occupancyRate || 0), 0) / totalLocations
        : 0;
    return { totalLocations, totalCapacity, totalCards, averageOccupancy };
  }, [filteredLocations]);

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const missing = {
      name: !formData.name.trim(),
      address: !formData.address.trim(),
      bankId: !formData.bankId,
    }
    setMissingFields(missing)
    if (missing.name || missing.address || missing.bankId) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    const existingLocation = locations.find(
      (loc) =>
        loc.name.toLowerCase() === formData.name.toLowerCase() &&
        loc.bankId === formData.bankId &&
        loc.id !== editingLocation?.id,
    )

    if (existingLocation) {
      toast({
        title: "Erreur de validation",
        description: "Un emplacement avec ce nom existe déjà dans cette banque.",
        variant: "destructive",
      })
      return
    }

    if (editingLocation) {
      handleEditLocation(editingLocation.id, formData)
    } else {
      handleCreateLocation(formData)
    }
  }

  const handleEdit = (location: Location) => {
    setEditingLocation(location)
    setFormData({
      name: location.name,
      address: location.address || "",
      bankId: location.bankId,
      maxCapacity: location.maxCapacity?.toString() || "",
      securityLevel: location.securityLevel || "",
      description: location.description || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (locationId: string) => {
    const hasStock = stock.some((stockItem) => stockItem.locationId === locationId && stockItem.quantity > 0)

    if (hasStock) {
      toast({
        title: "Suppression impossible",
        description: "Cet emplacement contient encore du stock.",
        variant: "destructive",
      })
      return
    }

    // Note: La vérification des mouvements récents a été retirée pour l'instant
    // car `mockData` n'est plus utilisé. Elle devra être réimplémentée
    // lorsque les mouvements seront gérés via l'API.

    handleDeleteLocation(locationId)
  }

  const handleView = (location: Location) => {
    setViewingLocation(location)
    setIsViewDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      bankId: "",
      maxCapacity: "",
      securityLevel: "",
      description: "",
    })
    setEditingLocation(null)
    setIsDialogOpen(false)
    setMissingFields({ name: false, address: false, bankId: false })
  }

  // --- Fonctions d'affichage ---
  const getStatusBadge = (occupancyRate: number) => {
    if (occupancyRate >= 90) return <Badge variant="destructive">Plein</Badge>
    if (occupancyRate >= 70) return <Badge variant="secondary">Élevé</Badge>
    if (occupancyRate >= 40) return <Badge variant="default">Moyen</Badge>
    return <Badge variant="outline">Faible</Badge>
  }

  const getSecurityBadge = (level: string | null) => {
    if (!level) return <Badge variant="outline">Non défini</Badge>
    const colors = {
      "Niveau 1": "outline",
      "Niveau 2": "secondary",
      "Niveau 3": "default",
      "Niveau 4": "destructive",
    } as const

    return <Badge variant={colors[level as keyof typeof colors] || "outline"}>{level}</Badge>
  }

  // --- Rendu du composant ---
  if (loading) {
    return <Loader message="Chargement des emplacements..." />;
  }

  // Ajout de logs juste avant le return du composant
  console.log('banks:', banks);
  console.log('locations:', locations);
  banks.forEach(bank => {
    const bankLocations = locations.filter(loc => loc.bankId === bank.id);
    console.log(`Banque: ${bank.name}, id: ${bank.id}, emplacements trouvés:`, bankLocations.length, bankLocations);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Emplacements</h1>
          <p className="text-muted-foreground">Gérez les lieux de stockage des cartes de crédit</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
            Importer (.CSV / .XLSX)
          </Button>
          <Button variant="secondary" onClick={() => {
            window.open('/api/locations/import/template', '_blank');
          }}>
            Télécharger le modèle
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Emplacement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingLocation ? "Modifier l'emplacement" : "Nouvel emplacement"}</DialogTitle>
                <DialogDescription>
                  {editingLocation
                    ? "Modifiez les informations de l'emplacement de stockage."
                    : "Ajoutez un nouvel emplacement de stockage au système."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom de l'emplacement *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Coffre-fort Principal"
                        required
                        className={missingFields.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankId">Banque propriétaire *</Label>
                      <Select
                        value={formData.bankId}
                        onValueChange={(value) => setFormData({ ...formData, bankId: value })}
                      >
                        <SelectTrigger
                          className={missingFields.bankId ? "border-red-500 focus-visible:ring-red-500" : ""}
                        >
                          <SelectValue placeholder="Sélectionner une banque" />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.id} value={bank.id}>
                              {`${bank.name} (${bank.bankCode})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse physique *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ex: Sous-sol sécurisé, Bâtiment A"
                      required
                      className={missingFields.address ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="maxCapacity">Capacité maximale</Label>
                      <Input
                        id="maxCapacity"
                        type="number"
                        min="0"
                        value={formData.maxCapacity}
                        onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                        placeholder="Ex: 100000"
                      />
                      <p className="text-xs text-muted-foreground">Nombre maximum de cartes stockables</p>
                      <p className="text-xs text-orange-600">Ce champ n'est pas obligatoire.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="securityLevel">Niveau de sécurité</Label>
                      <Select
                        value={formData.securityLevel}
                        onValueChange={(value) => setFormData({ ...formData, securityLevel: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Niveau 1">Niveau 1 - Standard</SelectItem>
                          <SelectItem value="Niveau 2">Niveau 2 - Renforcé</SelectItem>
                          <SelectItem value="Niveau 3">Niveau 3 - Haute sécurité</SelectItem>
                          <SelectItem value="Niveau 4">Niveau 4 - Maximum</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-orange-600">Ce champ n'est pas obligatoire.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description détaillée de l'emplacement, mesures de sécurité, accès..."
                      rows={3}
                    />
                    <p className="text-xs text-orange-600">Ce champ n'est pas obligatoire.</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                  <Button type="submit">{editingLocation ? "Modifier" : "Créer"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emplacements</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLocations}</div>
            <p className="text-xs text-muted-foreground">Lieux de stockage actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacité Totale</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {typeof stats.totalCapacity === 'number' ? stats.totalCapacity.toLocaleString() : "-"}
            </div>
            <p className="text-xs text-muted-foreground">Cartes stockables maximum</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Actuel</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Cartes actuellement stockées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'Occupation</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageOccupancy.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Occupation moyenne</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Liste des Emplacements</TabsTrigger>
          <TabsTrigger value="overview">Vue d'Ensemble</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          {/* Filtres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Recherche</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un emplacement..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Banque</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les banques" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les banques</SelectItem>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedBank("all")
                    }}
                    className="w-full"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des emplacements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Emplacements de Stockage
              </CardTitle>
              <CardDescription>
                {filteredLocations.length} emplacement{filteredLocations.length > 1 ? "s" : ""} trouvé
                {filteredLocations.length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Banque</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead className="text-right">Stock Actuel</TableHead>
                    <TableHead className="text-right">Capacité</TableHead>
                    <TableHead className="text-right">Occupation</TableHead>
                    <TableHead>Sécurité</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{location.bank?.name}</div>
                          <div className="text-sm text-muted-foreground">{location.bank?.bankCode}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{location.address}</TableCell>
                      <TableCell className="text-right">
                        <div className="font-mono">{typeof location.totalCards === 'number' ? location.totalCards.toLocaleString() : '-'}</div>
                        <div className="text-sm text-muted-foreground">{location.cardTypes} types</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {location.maxCapacity ? location.maxCapacity.toLocaleString() : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        {location.maxCapacity ? (
                          <div>
                            <div className="font-medium">{location.occupancyRate.toFixed(1)}%</div>
                            {getStatusBadge(location.occupancyRate)}
                          </div>
                        ) : (
                          <Badge variant="outline">N/A</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {location.securityLevel ? (
                          getSecurityBadge(location.securityLevel)
                        ) : (
                          <Badge variant="outline">Non défini</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleView(location)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(location)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir supprimer l'emplacement "{location.name}" ? Cette action est
                                  irréversible et ne sera possible que si l'emplacement est vide et sans mouvements
                                  récents.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(location.id)}>
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Vue d'ensemble par banque */}
          <div className="grid gap-6">
            {banks.map((bank) => {
              const bankLocations = locations.filter((loc) => loc.bankId === bank.id)
              const totalBankCards = stock
                .filter((s) => bankLocations.some((loc) => loc.id === s.locationId))
                .reduce((sum, s) => sum + s.quantity, 0)
              const totalBankCapacity = bankLocations.reduce((sum, loc) => sum + (loc.maxCapacity || 0), 0)

              return (
                <Card key={bank.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {bank.name}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{bankLocations.length} emplacements</Badge>
                        <Badge variant="secondary">{typeof totalBankCards === 'number' ? totalBankCards.toLocaleString() : '-' } cartes</Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {bankLocations.map((location) => (
                        <Card key={location.id} className="border-2">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center justify-between">
                              <span>{location.name}</span>
                              {location.securityLevel && <Shield className="h-4 w-4 text-muted-foreground" />}
                            </CardTitle>
                            <CardDescription className="text-xs">{location.address}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-2">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Stock actuel:</span>
                                <span className="font-mono">{typeof location.totalCards === 'number' ? location.totalCards.toLocaleString() : '-'}</span>
                              </div>
                              {location.maxCapacity && (
                                <div className="flex justify-between text-sm">
                                  <span>Capacité:</span>
                                  <span className="font-mono">{location.maxCapacity.toLocaleString()}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm">
                                <span>Types de cartes:</span>
                                <Badge variant="outline">{location.cardTypes}</Badge>
                              </div>
                              {location.maxCapacity && (
                                <div className="flex justify-between items-center text-sm">
                                  <span>Occupation:</span>
                                  {getStatusBadge(location.occupancyRate)}
                                </div>
                              )}
                              {location.securityLevel && (
                                <div className="flex justify-between items-center text-sm">
                                  <span>Sécurité:</span>
                                  {getSecurityBadge(location.securityLevel)}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog de visualisation détaillée */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {viewingLocation?.name}
            </DialogTitle>
            <DialogDescription>Détails complets de l'emplacement de stockage</DialogDescription>
          </DialogHeader>
          {viewingLocation && (
            <div className="grid gap-6 py-4">
              {/* Informations générales */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Informations Générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Nom</Label>
                      <p className="text-sm">{viewingLocation.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Banque propriétaire</Label>
                      <p className="text-sm">
                        {banks.find((b) => b.id === viewingLocation.bankId)?.name}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Adresse</Label>
                      <p className="text-sm">{viewingLocation.address}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Date de création</Label>
                      <p className="text-sm">{viewingLocation.createdAt ? new Date(viewingLocation.createdAt).toLocaleDateString("fr-FR") : "-"}</p>
                    </div>
                    {viewingLocation.modifiedAt && (
                      <div>
                        <Label className="text-sm font-medium">Dernière modification</Label>
                        <p className="text-sm">{viewingLocation.modifiedAt ? new Date(viewingLocation.modifiedAt).toLocaleDateString("fr-FR") : "-"}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Capacité et Sécurité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Capacité maximale</Label>
                      <p className="text-sm">
                        {typeof viewingLocation.maxCapacity === 'number' ? viewingLocation.maxCapacity.toLocaleString() : '-'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Stock actuel</Label>
                      <p className="text-sm">
                        {stock.find((s) => s.locationId === viewingLocation.id)?.quantity.toLocaleString() || 0}
                      </p>
                    </div>
                    {typeof viewingLocation.maxCapacity === 'number' && (
                      <div>
                        <Label className="text-sm font-medium">Taux d'occupation</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm">
                            {(() => {
                              const cap = viewingLocation.maxCapacity || 0;
                              const qty = stock.find((s) => s.locationId === viewingLocation.id)?.quantity || 0;
                              if (!cap || cap <= 0) return "0.0";
                              const rate = (qty / cap) * 100;
                              return isNaN(rate) || !isFinite(rate) ? "0.0" : rate.toFixed(1);
                            })()}%
                          </p>
                          {getStatusBadge(
                            (() => {
                              const cap = viewingLocation.maxCapacity || 0;
                              const qty = stock.find((s) => s.locationId === viewingLocation.id)?.quantity || 0;
                              if (!cap || cap <= 0) return 0;
                              const rate = (qty / cap) * 100;
                              return isNaN(rate) || !isFinite(rate) ? 0 : rate;
                            })()
                          )}
                        </div>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium">Niveau de sécurité</Label>
                      <div className="flex items-center gap-2">
                        {viewingLocation.securityLevel ? (
                          getSecurityBadge(viewingLocation.securityLevel)
                        ) : (
                          <Badge variant="outline">Non défini</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              {viewingLocation.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{viewingLocation.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Stock détaillé */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Stock Détaillé</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Sous-type</TableHead>
                        <TableHead>Sous-sous-type</TableHead>
                        <TableHead className="text-right">Quantité</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stock
                        .filter((s) => s.locationId === viewingLocation.id)
                        .map((stockItem) => {
                          const cardType = cardTypes.find((c) => c.id === stockItem.cardTypeId)
                          return (
                            <TableRow key={stockItem.id}>
                              <TableCell>
                                <Badge variant="outline">{cardType?.name || "N/A"}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{cardType?.subType || "N/A"}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{cardType?.subSubType || "N/A"}</Badge>
                              </TableCell>
                              <TableCell className="text-right font-mono">{typeof stockItem.quantity === 'number' ? stockItem.quantity.toLocaleString() : '-'}</TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer une liste d'emplacements</DialogTitle>
            <DialogDescription>
              Sélectionnez un fichier .csv ou .xlsx au format attendu.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const fileInput = e.currentTarget.elements.namedItem('file');
              if (!fileInput || !fileInput.files.length) return;
              const formData = new FormData();
              formData.append('file', fileInput.files[0]);
              const res = await fetch('/api/locations/import', {
                method: 'POST',
                body: formData,
              });
              const data = await res.json();
              if (data.success) {
                toast({ title: 'Import réussi !' });
                setIsImportDialogOpen(false);
                await fetchData(); // Rafraîchir la liste après import
              } else {
                toast({ title: 'Erreur', description: data.error || 'Import échoué', variant: 'destructive' });
              }
            }}
          >
            <input type="file" name="file" accept=".csv,.xlsx" required />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Importer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
