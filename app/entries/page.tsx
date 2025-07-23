"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, TrendingUp, FileText } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

interface EntryItem {
  cardTypeId: string
  quantity: number
}

export default function EntriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [entryItems, setEntryItems] = useState<EntryItem[]>([{ cardTypeId: "", quantity: 0 }])
  const [notes, setNotes] = useState("")
  const { toast } = useToast()

  // Filtrer les emplacements par banque sélectionnée
  const availableLocations = selectedBank ? mockData.locations.filter((loc) => loc.bankId === selectedBank) : []

  const addEntryItem = () => {
    setEntryItems([...entryItems, { cardTypeId: "", quantity: 0 }])
  }

  const removeEntryItem = (index: number) => {
    if (entryItems.length > 1) {
      setEntryItems(entryItems.filter((_, i) => i !== index))
    }
  }

  const updateEntryItem = (index: number, field: keyof EntryItem, value: string | number) => {
    const updated = [...entryItems]
    updated[index] = { ...updated[index], [field]: value }
    setEntryItems(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!selectedBank || !selectedLocation) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez sélectionner une banque et un emplacement.",
        variant: "destructive",
      })
      return
    }

    const validItems = entryItems.filter((item) => item.cardTypeId && item.quantity > 0)
    if (validItems.length === 0) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez ajouter au moins un type de carte avec une quantité valide.",
        variant: "destructive",
      })
      return
    }

    // Générer le numéro de bon d'entrée
    const referenceNumber = `ENT-${new Date().getFullYear()}-${String(mockData.movements.length + 1).padStart(3, "0")}`

    // Créer les mouvements d'entrée
    validItems.forEach((item) => {
      const newMovement = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: "ENTREE" as const,
        date: new Date().toISOString(),
        userId: "2", // Utilisateur actuel (simulé)
        cardTypeId: item.cardTypeId,
        quantity: item.quantity,
        sourceLocationId: null,
        destinationLocationId: selectedLocation,
        referenceNumber,
        notes,
      }
      mockData.movements.push(newMovement)

      // Mettre à jour le stock
      const existingStock = mockData.stock.find(
        (s) => s.locationId === selectedLocation && s.cardTypeId === item.cardTypeId,
      )

      if (existingStock) {
        existingStock.quantity += item.quantity
      } else {
        mockData.stock.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          locationId: selectedLocation,
          cardTypeId: item.cardTypeId,
          quantity: item.quantity,
        })
      }
    })

    toast({
      title: "Entrée enregistrée",
      description: `Bon d'entrée ${referenceNumber} créé avec succès.`,
    })

    // Réinitialiser le formulaire
    setSelectedBank("")
    setSelectedLocation("")
    setEntryItems([{ cardTypeId: "", quantity: 0 }])
    setNotes("")
    setIsDialogOpen(false)
  }

  // Récupérer les entrées récentes
  const recentEntries = mockData.movements
    .filter((m) => m.type === "ENTREE")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Entrées</h1>
          <p className="text-muted-foreground">Enregistrement des nouvelles cartes en stock</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Entrée
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Nouvelle Entrée de Stock</DialogTitle>
              <DialogDescription>Enregistrez l'arrivée de nouvelles cartes de crédit</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 py-4">
                {/* Sélection banque et emplacement */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bank">Banque de destination</Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une banque" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockData.banks.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Emplacement de destination</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation} disabled={!selectedBank}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un emplacement" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Articles d'entrée */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Types de cartes à ajouter</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEntryItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un type
                    </Button>
                  </div>

                  {entryItems.map((item, index) => (
                    <div key={index} className="grid gap-4 md:grid-cols-3 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label>Type de carte</Label>
                        <Select
                          value={item.cardTypeId}
                          onValueChange={(value) => updateEntryItem(index, "cardTypeId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockData.cardTypes.map((cardType) => (
                              <SelectItem key={cardType.id} value={cardType.id}>
                                {cardType.type} {cardType.subType} {cardType.subSubType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Quantité</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity || ""}
                          onChange={(e) => updateEntryItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEntryItem(index)}
                          disabled={entryItems.length === 1}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Informations complémentaires sur cette entrée..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">Enregistrer l'entrée</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrées ce mois</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {
                mockData.movements.filter(
                  (m) => m.type === "ENTREE" && new Date(m.date).getMonth() === new Date().getMonth(),
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Opérations d'entrée</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cartes ajoutées</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockData.movements
                .filter((m) => m.type === "ENTREE" && new Date(m.date).getMonth() === new Date().getMonth())
                .reduce((sum, m) => sum + m.quantity, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Nouvelles cartes en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dernière entrée</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recentEntries.length > 0 ? new Date(recentEntries[0].date).toLocaleDateString("fr-FR") : "Aucune"}
            </div>
            <p className="text-xs text-muted-foreground">Date de la dernière opération</p>
          </CardContent>
        </Card>
      </div>

      {/* Historique des entrées */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Entrées</CardTitle>
          <CardDescription>Les 10 dernières opérations d'entrée de stock</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Type de carte</TableHead>
                <TableHead className="text-right">Quantité</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEntries.map((entry) => {
                const location = mockData.locations.find((l) => l.id === entry.destinationLocationId)
                const bank = mockData.banks.find((b) => b.id === location?.bankId)
                const cardType = mockData.cardTypes.find((c) => c.id === entry.cardTypeId)

                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Badge variant="outline">{entry.referenceNumber}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(entry.date).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(entry.date).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{location?.name}</div>
                        <div className="text-sm text-muted-foreground">{bank?.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant="outline">{cardType?.type}</Badge>
                        <Badge variant="secondary">{cardType?.subType}</Badge>
                        <Badge variant="outline">{cardType?.subSubType}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-green-600">
                      +{entry.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{entry.notes || "-"}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
