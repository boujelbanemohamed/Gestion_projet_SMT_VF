"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Plus, Download, Upload } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CardType {
  id: string;
  name: string;
  subType?: string | null;
  subSubType?: string | null;
  description?: string | null;
  bankId: string;
  bankName?: string;
  specificities?: string | null;
  contact?: string | null;
  createdAt?: string;
}

interface Bank {
  id: string;
  name: string;
}

const initialForm = {
  name: "",
  subType: "",
  subSubType: "",
  description: "",
  bankId: "",
  specificities: "",
  contact: "",
};

export default function CardTypesPage() {
  const [cardTypes, setCardTypes] = useState<CardType[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<'listing' | 'ajout'>("listing");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewCard, setViewCard] = useState<CardType | null>(null);
  const { toast } = useToast();
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedSubSubType, setSelectedSubSubType] = useState<string>("all");
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [importReport, setImportReport] = useState<any|null>(null);
  const [importFile, setImportFile] = useState<File|null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/card-types')
      .then(res => res.json())
      .then(data => { setCardTypes(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeTab]);

  useEffect(() => {
    fetch('/api/banks')
      .then(res => res.json())
      .then(data => setBanks(data))
      .catch(() => setBanks([]));
  }, []);

  useEffect(() => {
    if (activeTab === 'ajout' && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [activeTab, editingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = form.name && form.subType && form.subSubType && form.description && form.bankId;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    const res = await fetch('/api/card-types', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        bankId: form.bankId,
        createdAt: new Date().toISOString(),
        subType: form.subType,
        subSubType: form.subSubType,
        description: form.description,
        specificities: form.specificities,
        contact: form.contact,
      })
    });
    setLoading(false);
    if (res.ok) {
      toast({ title: "Succès", description: "Carte ajoutée avec succès !", variant: "default" });
      setForm(initialForm);
      setActiveTab('listing');
      setEditingId(null);
      fetch('/api/card-types').then(res => res.json()).then(setCardTypes);
    } else {
      const data = await res.json();
      console.error('Erreur lors de l\'ajout:', data, JSON.stringify(data));
      toast({
        title: "Erreur",
        description: (data.error || "") + (data.details ? " " + data.details : ""),
        variant: "destructive"
      });
      return;
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const res = await fetch('/api/card-types', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: deleteId })
    });
    setLoading(false);
    if (res.ok) {
      toast({ title: "Suppression", description: "Carte supprimée.", variant: "default" });
      setDeleteId(null);
      fetch('/api/card-types').then(res => res.json()).then(setCardTypes);
    } else {
      toast({ title: "Erreur", description: "Erreur lors de la suppression.", variant: "destructive" });
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleEdit = (card: CardType) => {
    setForm({
      name: card.name || '',
      subType: card.subType || '',
      subSubType: card.subSubType || '',
      description: card.description || '',
      bankId: card.bankId || '',
      specificities: card.specificities || '',
      contact: card.contact || '',
    });
    setEditingId(card.id);
    setActiveTab('ajout');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/card-types', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingId,
        name: form.name,
        bankId: form.bankId,
        createdAt: new Date().toISOString(),
        subType: form.subType,
        subSubType: form.subSubType,
        description: form.description,
        specificities: form.specificities,
        contact: form.contact,
      })
    });
    setLoading(false);
    if (res.ok) {
      toast({ title: "Succès", description: "Carte modifiée avec succès !", variant: "default" });
      setForm(initialForm);
      setActiveTab('listing');
      setEditingId(null);
      fetch('/api/card-types').then(res => res.json()).then(setCardTypes);
    } else {
      const errorData = await res.json();
      toast({ title: "Erreur", description: errorData.error || "Erreur lors de la modification.", variant: "destructive" });
      if (errorData.details) {
        alert(JSON.stringify(errorData.details, null, 2));
      }
    }
  };

  // Filtered card types
  const filteredCardTypes = cardTypes.filter(card => {
    const matchesSearch =
      (card.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (card.subType ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (card.bankName ?? '').toLowerCase().includes(search.toLowerCase());
    const matchesBank = selectedBank === "all" || card.bankId === selectedBank;
    const matchesType = selectedType === "all" || card.name === selectedType;
    const matchesSubSubType = selectedSubSubType === "all" || card.subSubType === selectedSubSubType;
    return matchesSearch && matchesBank && matchesType && matchesSubSubType;
  });
  // Liste des types uniques pour le filtre
  const uniqueTypes = Array.from(new Set(cardTypes.map(card => card.name).filter(Boolean)));
  // Liste des sous-sous-types uniques pour le filtre
  const uniqueSubSubTypes = Array.from(new Set(cardTypes.map(card => card.subSubType).filter(Boolean)));

  // Génération PDF du listing
  const handlePrintPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(16);
    doc.text("Listing des types de cartes", 14, 14);
    autoTable(doc, {
      startY: 22,
      head: [[
        "Type",
        "Sous-type",
        "Sous-sous-type",
        "Description",
        "Banque",
        "Spécificités",
        "Contact",
        "Créé le",
      ]],
      body: filteredCardTypes.map(card => [
        card.name,
        card.subType,
        card.subSubType,
        card.description,
        card.bankName,
        card.specificities,
        card.contact,
        card.createdAt ? new Date(card.createdAt).toLocaleString() : '-',
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [49, 130, 206] },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      margin: { left: 14, right: 14 },
      tableWidth: 'auto',
    });
    doc.save("listing-types-cartes.pdf");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Types de Cartes</h1>
          <p className="text-muted-foreground">Gérez les types de cartes bancaires</p>
        </div>
      </div>
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="listing">Listing des cartes</TabsTrigger>
          <TabsTrigger value="ajout">{editingId ? "Édition d'une carte" : "Ajout d'une carte"}</TabsTrigger>
        </TabsList>
        <TabsContent value="ajout">
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>{editingId ? "Édition d'une carte" : "Ajout d'une carte"}</CardTitle>
                <CardDescription>Remplissez le formulaire pour {editingId ? "modifier" : "ajouter"} un type de carte.</CardDescription>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" asChild className="flex items-center gap-2">
                  <a href="/api/card-types/import/template" download>
                    <Download className="h-4 w-4" /> Télécharger le modèle CSV
                  </a>
                </Button>
                <form
                  className="flex items-center gap-2"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!importFile) return;
                    const formData = new FormData();
                    formData.append('file', importFile);
                    const res = await fetch('/api/card-types/import', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    setImportReport(data);
                    if (data.success) {
                      toast({ title: 'Import réussi !', description: `${data.results.filter((r:any)=>r.success).length} ajoutés, ${data.results.filter((r:any)=>!r.success).length} erreurs.` });
                      setActiveTab('listing');
                      fetch('/api/card-types').then(res => res.json()).then(setCardTypes);
                    } else {
                      toast({ title: 'Erreur', description: data.error || 'Import échoué', variant: 'destructive' });
                    }
                  }}
                >
                  <label htmlFor="import-file" className="sr-only">Fichier CSV</label>
                  <Input
                    id="import-file"
                    type="file"
                    name="file"
                    accept=".csv"
                    required
                    className="w-auto"
                    onChange={e => setImportFile(e.target.files?.[0] || null)}
                  />
                  <Button type="submit" variant="secondary" disabled={!importFile} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Importer
                  </Button>
                  {importFile && <span className="text-xs text-muted-foreground ml-2">{importFile.name}</span>}
                </form>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="name">Type *</Label>
                    <Input ref={firstInputRef} id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Ex: Visa, Mastercard..." className="w-full" />
                  </div>
                  <div>
                    <Label htmlFor="subType">Sous-type *</Label>
                    <Input id="subType" name="subType" value={form.subType} onChange={handleChange} required placeholder="Ex: Classic, Gold..." className="w-full" />
                  </div>
                  <div>
                    <Label htmlFor="subSubType">Sous-sous-type *</Label>
                    <Input id="subSubType" name="subSubType" value={form.subSubType} onChange={handleChange} required placeholder="Ex: Premium, Jeune..." className="w-full" />
                  </div>
                  <div>
                    <Label htmlFor="bankId">Banque demandeuse *</Label>
                    <select id="bankId" name="bankId" value={form.bankId} onChange={handleChange} required className="border px-3 py-2 rounded w-full">
                      <option value="">Sélectionner une banque</option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.id}>{bank.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" name="description" value={form.description} onChange={handleChange} required placeholder="Description détaillée de la carte..." className="w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="specificities">Spécificités</Label>
                    <Input id="specificities" name="specificities" value={form.specificities} onChange={handleChange} placeholder="Ex: NFC, débit différé..." className="w-full" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact</Label>
                    <Input id="contact" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact référent..." className="w-full" />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button type="submit" disabled={!isFormValid}>{editingId ? "Mettre à jour" : "Ajouter"}</Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={() => { setForm(initialForm); setEditingId(null); }}>Annuler</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
          {importReport && (
            <Card className="mb-4 max-w-6xl mx-auto mt-6">
              <CardHeader>
                <CardTitle>Rapport d'import</CardTitle>
                <CardDescription>
                  {importReport.success
                    ? `${importReport.results.filter((r:any)=>r.success).length} ajoutés, ${importReport.results.filter((r:any)=>!r.success).length} erreurs.`
                    : importReport.error}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {importReport.results && importReport.results.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Erreur</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importReport.results.map((r:any, i:number) => (
                        <TableRow key={i}>
                          <TableCell>{r.name || '-'}</TableCell>
                          <TableCell>
                            {r.success ? <Badge variant="secondary">Ajouté</Badge> : <Badge variant="destructive">Erreur</Badge>}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{r.error || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="flex justify-end mt-2">
                  <Button size="sm" variant="outline" onClick={() => { setImportReport(null); setImportFile(null); }}>Fermer</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="listing">
          <Card>
            <CardHeader>
              <CardTitle>Listing des cartes</CardTitle>
              <CardDescription>Consultez, modifiez ou supprimez les types de cartes existants.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <Input
                  type="text"
                  placeholder="Rechercher par type, sous-type ou banque..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full md:w-72"
                />
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Filtrer par banque" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les banques</SelectItem>
                    {banks.map((bank) => (
                      <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Filtrer par type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSubSubType} onValueChange={setSelectedSubSubType}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Filtrer par sous-sous-type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les sous-sous-types</SelectItem>
                    {uniqueSubSubTypes.map((sst) => (
                      <SelectItem key={sst} value={sst}>{sst}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => { setSearch(""); setSelectedBank("all"); setSelectedType("all"); setSelectedSubSubType("all"); }}>Réinitialiser</Button>
                <Button variant="outline" onClick={handlePrintPDF} className="print:hidden">Imprimer en PDF</Button>
              </div>
              <div className="mb-4 text-sm text-muted-foreground font-medium">
                Total cartes : <Badge variant="secondary">{filteredCardTypes.length}</Badge>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full" />
                  ))}
                </div>
              ) : filteredCardTypes.length === 0 ? (
                <div className="text-muted-foreground">Aucune carte enregistrée.</div>
              ) : (
                <div className="overflow-x-auto print:overflow-visible">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Sous-type</TableHead>
                        <TableHead>Sous-sous-type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Banque</TableHead>
                        <TableHead>Spécificités</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Créé le</TableHead>
                        <TableHead className="print:table-cell hidden print:!table-cell">ID</TableHead>
                        <TableHead className="print:table-cell hidden print:!table-cell">Détails complets</TableHead>
                        <TableHead className="text-center print:hidden">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCardTypes.map((card, idx) => (
                        <TableRow key={card.id}>
                          <TableCell><Badge variant="outline">{card.name || '-'}</Badge></TableCell>
                          <TableCell><Badge variant="secondary">{card.subType || '-'}</Badge></TableCell>
                          <TableCell><Badge variant="outline">{card.subSubType || '-'}</Badge></TableCell>
                          <TableCell className="max-w-xs truncate" title={card.description}>{card.description || '-'}</TableCell>
                          <TableCell><Badge variant="secondary">{card.bankName || '-'}</Badge></TableCell>
                          <TableCell className="text-xs text-muted-foreground">{card.specificities || '-'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{card.contact || '-'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{card.createdAt ? new Date(card.createdAt).toLocaleString() : '-'}</TableCell>
                          <TableCell className="text-xs text-muted-foreground print:table-cell hidden print:!table-cell">{card.id}</TableCell>
                          <TableCell className="text-xs text-muted-foreground print:table-cell hidden print:!table-cell">
                            Type: {card.name}, Sous-type: {card.subType}, Sous-sous-type: {card.subSubType}, Description: {card.description}, Banque: {card.bankName}, Spécificités: {card.specificities}, Contact: {card.contact}, Créé le: {card.createdAt ? new Date(card.createdAt).toLocaleString() : '-'}
                          </TableCell>
                          <TableCell className="text-center print:hidden">
                            <div className="flex flex-col gap-2 items-center">
                              <Button variant="outline" size="sm" className="w-full" onClick={() => setViewCard(card)}>Visualiser</Button>
                              <Button variant="outline" size="sm" className="w-full" onClick={() => handleEdit(card)}>Modifier</Button>
                              <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDelete(card.id)}>Supprimer</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <Dialog open={!!viewCard} onOpenChange={() => setViewCard(null)}>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Détails de la carte</DialogTitle>
                    <DialogDescription>Informations complètes sur le type de carte</DialogDescription>
                  </DialogHeader>
                  {viewCard && (
                    <div className="space-y-3 text-base text-muted-foreground">
                      <div><span className="font-semibold">Type :</span> {viewCard.name}</div>
                      <div><span className="font-semibold">Sous-type :</span> {viewCard.subType}</div>
                      <div><span className="font-semibold">Sous-sous-type :</span> {viewCard.subSubType}</div>
                      <div><span className="font-semibold">Description :</span> {viewCard.description}</div>
                      <div><span className="font-semibold">Banque :</span> {viewCard.bankName}</div>
                      <div><span className="font-semibold">Contact :</span> {viewCard.contact}</div>
                      <div><span className="font-semibold">Spécificités :</span> {viewCard.specificities}</div>
                      <div><span className="font-semibold">Créé le :</span> {viewCard.createdAt ? new Date(viewCard.createdAt).toLocaleString() : '-'}</div>
                    </div>
                  )}
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Fermer</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {/* Confirmation de suppression */}
              <AlertDialog open={!!deleteId} onOpenChange={cancelDelete}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>Voulez-vous vraiment supprimer ce type de carte ? Cette action est irréversible.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button variant="outline" onClick={cancelDelete}>Annuler</Button>
                    <Button variant="destructive" onClick={confirmDelete}>Supprimer</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 