"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Edit, Trash2, Building2, UserPlus } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Loader } from "@/components/ui/loader";

interface Bank {
  id: string
  name: string
  address: string
  bankCode: string
  createdAt: string
}

export default function BanksPage() {
  const [banks, setBanks] = useState<Bank[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBank, setEditingBank] = useState<Bank | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    bankCode: "",
  })
  const { toast } = useToast()
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<any[]>([]);
  const [cardTypes, setCardTypes] = useState<any[]>([]);

  // Charger les banques depuis l'API au chargement
  useEffect(() => {
    setLoading(true);
    fetch('/api/banks')
      .then(res => res.json())
      .then(data => setBanks(data))
      .catch(() => setBanks([]))
      .finally(() => setLoading(false));
    // Charger les emplacements réels
    fetch('/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(() => setLocations([]));
    // Charger les types de cartes
    fetch('/api/card-types')
      .then(res => res.json())
      .then(data => setCardTypes(data))
      .catch(() => setCardTypes([]));
  }, [])

  const fetchBanks = async () => {
    const res = await fetch('/api/banks')
    const data = await res.json()
    setBanks(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBank) {
      // Modifier une banque existante
      const res = await fetch('/api/banks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingBank.id, ...formData })
      })
      if (res.ok) {
        toast({ title: "Banque modifiée", description: "Les informations de la banque ont été mises à jour avec succès." })
        await fetchBanks()
      } else {
        toast({ title: "Erreur", description: "Erreur lors de la modification de la banque.", variant: "destructive" })
      }
    } else {
      // Créer une nouvelle banque
      const res = await fetch('/api/banks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        toast({ title: "Banque créée", description: "La nouvelle banque a été ajoutée avec succès." })
        await fetchBanks()
        closeDialog() // On ferme la pop-up uniquement ici
      } else {
        const errorData = await res.json()
        toast({ title: "Erreur de création", description: errorData.error || "Une erreur inconnue est survenue.", variant: "destructive" })
      }
    }
  }

  const handleEdit = (bank: Bank) => {
    setEditingBank(bank)
    setFormData({
      name: bank.name,
      address: bank.address,
      bankCode: bank.bankCode,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (bankId: string) => {
    // TODO: vérifier les emplacements associés côté backend si besoin
    const res = await fetch('/api/banks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: bankId })
    })
    if (res.ok) {
      toast({ title: "Banque supprimée", description: "La banque a été supprimée avec succès." })
      await fetchBanks()
    } else {
      toast({ title: "Erreur", description: "Erreur lors de la suppression de la banque.", variant: "destructive" })
    }
  }

  const resetForm = () => {
    setFormData({ name: "", address: "", bankCode: "" })
    setEditingBank(null)
  }

  const closeDialog = () => {
    resetForm()
    setIsDialogOpen(false)
  }

  const getLocationCount = (bankId: string) => {
    return locations.filter((loc) => loc.bankId === bankId).length;
  }

  const getCardTypeCount = (bankId: string) => {
    return cardTypes.filter((ct) => ct.bankId === bankId).length;
  }

  if (loading) {
    return <Loader message="Chargement des banques..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Banques</h1>
          <p className="text-muted-foreground">Gérez les banques et leurs informations</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsImportDialogOpen(true)}
          >
            Importer (.CSV / .XLSX)
          </Button>
          <Button
            variant="outline"
            asChild
          >
            <a href="/api/banks/import/template" download>
              Télécharger le modèle
            </a>
          </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Banque
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingBank ? "Modifier la banque" : "Nouvelle banque"}</DialogTitle>
              <DialogDescription>
                {editingBank ? "Modifiez les informations de la banque." : "Ajoutez une nouvelle banque au système."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de la banque</Label>
                  <Input
                    id="name"
                      value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Banque Centrale"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                      value={formData.address || ""}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Ex: 123 Rue Principale, Paris"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bankCode">Code banque</Label>
                  <Input
                    id="bankCode"
                      value={formData.bankCode || ""}
                    onChange={(e) => setFormData({ ...formData, bankCode: e.target.value })}
                    placeholder="Ex: BC001"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Annuler
                </Button>
                <Button type="submit">{editingBank ? "Modifier" : "Créer"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Liste des Banques
          </CardTitle>
          <CardDescription>
            {banks.length} banque{banks.length > 1 ? "s" : ""} enregistrée{banks.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Emplacements</TableHead>
                <TableHead>Types de cartes</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banks.map((bank) => (
                <TableRow key={bank.id}>
                  <TableCell className="font-medium">{bank.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{bank.bankCode}</Badge>
                  </TableCell>
                  <TableCell>{bank.address}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getLocationCount(bank.id)} emplacement{getLocationCount(bank.id) > 1 ? "s" : ""}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getCardTypeCount(bank.id)} type{getCardTypeCount(bank.id) > 1 ? "s" : ""}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(bank.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(bank)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(bank.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer une liste de banques</DialogTitle>
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
              const res = await fetch('/api/banks/import', {
                method: 'POST',
                body: formData,
              });
              const data = await res.json();
              if (data.success) {
                alert('Import réussi !');
                setIsImportDialogOpen(false);
                await fetchBanks();
              } else {
                alert('Erreur : ' + (data.error || 'Import échoué'));
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
