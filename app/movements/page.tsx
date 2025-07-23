"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
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
} from "@/components/ui/dialog"
import {
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Search,
  Filter,
  Download,
  Package,
  AlertCircle,
  Printer,
  Paperclip,
  Eye,
  X,
  History,
} from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/hooks/use-auth"
import { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Loader } from "@/components/ui/loader"

interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadedAt: Date
}

interface MovementItem {
  cardTypeId: string
  quantity: number
}

interface MovementFormData {
  type: "ENTREE" | "SORTIE" | "TRANSFERT"
  bankId: string
  sourceLocationId: string
  destinationLocationId: string
  items: MovementItem[]
  notes: string
  attachments: Attachment[]
}

const generateSingleMovementPrint = (movement: any) => {
  const { sourceLocation, destLocation, sourceBank, destBank, cardType, user } = movement;

  const isInterBank = sourceBank?.id !== destBank?.id && sourceBank && destBank

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bon de ${movement.type} - ${movement.referenceNumber}</title>
      <style>
        @media print {
          @page { margin: 1cm; size: A4; }
          body { font-family: Arial, sans-serif; font-size: 10px; color: #333; }
        }
        body { font-family: Arial, sans-serif; line-height: 1.3; }
        .header { text-align: center; margin-bottom: 15px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .header h1 { margin: 0; color: #2563eb; font-size: 22px; }
        .header .ref { font-size: 14px; color: #666; margin: 5px 0; }
        .header .date { font-size: 11px; color: #888; }
        .movement-type { 
          display: inline-block; 
          padding: 5px 10px; 
          border-radius: 5px; 
          color: white; 
          font-weight: bold; 
          margin: 10px 0;
          font-size: 11px;
          ${movement.type === "ENTREE" ? "background: #16a34a;" : movement.type === "SORTIE" ? "background: #dc2626;" : "background: #2563eb;"}
        }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0; }
        .detail-section { border: 1px solid #ddd; padding: 10px; border-radius: 8px; background: #f9f9f9; }
        .detail-section h3 { margin: 0 0 10px 0; color: #333; border-bottom: 1px solid #2563eb; padding-bottom: 5px; font-size: 12px; }
        .detail-row { display: flex; justify-content: space-between; margin: 4px 0; font-size: 10px; }
        .detail-label { font-weight: bold; color: #555; }
        .detail-value { color: #333; }
        .card-info { background: white; border: 1px solid #2563eb; padding: 15px; margin: 15px 0; border-radius: 8px; }
        .quantity { font-size: 20px; font-weight: bold; color: #2563eb; text-align: center; margin: 10px 0; }
        .inter-bank-notice { background: #fef3c7; border: 1px solid #f59e0b; padding: 10px; margin: 15px 0; border-radius: 8px; font-size: 10px; }
        .inter-bank-notice h4 { margin: 0 0 5px 0; color: #92400e; font-size: 11px; }
        .notes { background: #f0f9ff; border-left: 3px solid #2563eb; padding: 10px; margin: 15px 0; font-size: 10px; }
        .footer { margin-top: 20px; text-align: center; font-size: 8px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
        .signature-section { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 30px; }
        .signature-box { text-align: center; border-top: 1px solid #333; padding-top: 8px; font-size: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>BON DE ${movement.type}</h1>
        <div class="ref">${movement.referenceNumber}</div>
        <div class="date">Généré le ${new Date(movement.date).toLocaleDateString("fr-FR")} à ${new Date(movement.date).toLocaleTimeString("fr-FR")}</div>
      </div>

      <div class="movement-type">${movement.type}</div>

      <div class="details-grid">
        ${
          movement.type !== "ENTREE"
            ? `
        <div class="detail-section">
          <h3>Emplacement Source</h3>
          <div class="detail-row">
            <span class="detail-label">Nom:</span>
            <span class="detail-value">${sourceLocation?.name || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Adresse:</span>
            <span class="detail-value">${sourceLocation?.address || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Banque:</span>
            <span class="detail-value">${sourceBank?.name || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Code Banque:</span>
            <span class="detail-value">${sourceBank?.bankCode || "N/A"}</span>
          </div>
        </div>
        `
            : `
        <div class="detail-section">
          <h3>Origine</h3>
          <div class="detail-row">
            <span class="detail-label">Source:</span>
            <span class="detail-value">Externe (Fournisseur)</span>
          </div>
        </div>
        `
        }

        ${
          movement.type !== "SORTIE"
            ? `
        <div class="detail-section">
          <h3>Emplacement Destination</h3>
          <div class="detail-row">
            <span class="detail-label">Nom:</span>
            <span class="detail-value">${destLocation?.name || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Adresse:</span>
            <span class="detail-value">${destLocation?.address || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Banque:</span>
            <span class="detail-value">${destBank?.name || "N/A"}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Code Banque:</span>
            <span class="detail-value">${destBank?.bankCode || "N/A"}</span>
          </div>
        </div>
        `
            : `
        <div class="detail-section">
          <h3>Destination</h3>
          <div class="detail-row">
            <span class="detail-label">Destination:</span>
            <span class="detail-value">Externe (Distribution)</span>
          </div>
        </div>
        `
        }
      </div>

      ${
        isInterBank
          ? `
      <div class="inter-bank-notice">
        <h4>⚠️ TRANSFERT INTER-BANQUE</h4>
        <p>Ce mouvement implique un transfert entre deux banques différentes :</p>
        <p><strong>De:</strong> ${sourceBank?.name} → <strong>Vers:</strong> ${destBank?.name}</p>
      </div>
      `
          : ""
      }

      <div class="card-info">
        <h3 style="text-align: center; margin: 0 0 15px 0;">Détails de la Carte</h3>
        <div class="detail-row">
          <span class="detail-label">Type:</span>
          <span class="detail-value">${cardType?.name || "N/A"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Sous-type:</span>
          <span class="detail-value">${cardType?.subType || "N/A"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Sous-sous-type:</span>
          <span class="detail-value">${cardType?.subSubType || "N/A"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Description:</span>
          <span class="detail-value">${cardType?.description || "N/A"}</span>
        </div>
        <div class="quantity">Quantité: ${movement.quantity.toLocaleString()}</div>
      </div>

      <div class="detail-section">
        <h3>Informations Opération</h3>
        <div class="detail-row">
          <span class="detail-label">Utilisateur:</span>
          <span class="detail-value">${user?.firstName || ''} ${user?.lastName || ''}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${new Date(movement.date).toLocaleDateString("fr-FR")}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Heure:</span>
          <span class="detail-value">${new Date(movement.date).toLocaleTimeString("fr-FR")}</span>
        </div>
      </div>

      ${
        movement.notes
          ? `
      <div class="notes">
        <h4 style="margin: 0 0 10px 0;">Notes:</h4>
        <p style="margin: 0;">${movement.notes}</p>
      </div>
      `
          : ""
      }

      <div class="signature-section">
        <div class="signature-box">
          <div>Signature Opérateur</div>
          <div style="margin-top: 30px;">Date: ___________</div>
        </div>
        <div class="signature-box">
          <div>Signature Responsable</div>
          <div style="margin-top: 30px;">Date: ___________</div>
        </div>
      </div>

      <div class="footer">
        <p>Système de Gestion de Stock - Cartes de Crédit</p>
        <p>Document généré automatiquement - ${new Date().toISOString()}</p>
      </div>
    </body>
    </html>
  `
}

const generateGlobalMovementsPrint = (movements: any[], filters: any, allBanks: any[], allCardTypes: any[]) => {
  const totalEntries = movements.filter((m) => m.type === "ENTREE").length
  const totalExits = movements.filter((m) => m.type === "SORTIE").length
  const totalTransfers = movements.filter((m) => m.type === "TRANSFERT").length
  const totalQuantity = movements.reduce((sum, m) => sum + m.quantity, 0)

  const bankName = filters.bankId === "all" ? "Toutes les banques" : allBanks.find(b => b.id === filters.bankId)?.name;
  const cardTypeName = filters.cardTypeId === "all" ? "Tous les types" : allCardTypes.find(c => c.id === filters.cardTypeId)?.name;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Rapport des Mouvements</title>
      <style>
        @media print {
          @page { margin: 1cm; size: A4; }
          body { font-family: Arial, sans-serif; font-size: 11px; }
        }
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #333; font-size: 24px; }
        .header p { margin: 5px 0; color: #666; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; background: #f9f9f9; }
        .summary-card h3 { margin: 0 0 10px 0; color: #333; font-size: 14px; }
        .summary-card .value { font-size: 18px; font-weight: bold; }
        .entries { color: #16a34a; }
        .exits { color: #dc2626; }
        .transfers { color: #2563eb; }
        .filters { background: #f0f9ff; border: 1px solid #2563eb; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .filters h3 { margin: 0 0 10px 0; color: #2563eb; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .type-entree { background-color: #dcfce7; color: #166534; }
        .type-sortie { background-color: #fecaca; color: #991b1b; }
        .type-transfert { background-color: #dbeafe; color: #1e40af; }
        .quantity { text-align: right; font-weight: bold; }
        .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Rapport des Mouvements de Stock</h1>
        <p>Généré le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}</p>
        <p>${movements.length} mouvement${movements.length > 1 ? "s" : ""} trouvé${movements.length > 1 ? "s" : ""}</p>
      </div>

      <div class="filters">
        <h3>Filtres Appliqués</h3>
        <p><strong>Période:</strong> ${filters.period === "week" ? "7 derniers jours" : filters.period === "month" ? "30 derniers jours" : "12 derniers mois"}</p>
        <p><strong>Type de mouvement:</strong> ${filters.type === "all" ? "Tous les types" : filters.type}</p>
        ${bankName ? `<p><strong>Banque:</strong> ${bankName}</p>` : ""}
        ${cardTypeName ? `<p><strong>Type de carte:</strong> ${cardTypeName}</p>` : ""}
        ${filters.search ? `<p><strong>Recherche:</strong> "${filters.search}"</p>` : ""}
      </div>

      <div class="summary">
        <div class="summary-card">
          <h3>Entrées</h3>
          <div class="value entries">${totalEntries}</div>
          <div>${movements
            .filter((m) => m.type === "ENTREE")
            .reduce((sum, m) => sum + m.quantity, 0)
            .toLocaleString()} cartes</div>
        </div>
        <div class="summary-card">
          <h3>Sorties</h3>
          <div class="value exits">${totalExits}</div>
          <div>${movements
            .filter((m) => m.type === "SORTIE")
            .reduce((sum, m) => sum + m.quantity, 0)
            .toLocaleString()} cartes</div>
        </div>
        <div class="summary-card">
          <h3>Transferts</h3>
          <div class="value transfers">${totalTransfers}</div>
          <div>${movements
            .filter((m) => m.type === "TRANSFERT")
            .reduce((sum, m) => sum + m.quantity, 0)
            .toLocaleString()} cartes</div>
        </div>
        <div class="summary-card">
          <h3>Total</h3>
          <div class="value">${movements.length}</div>
          <div>${totalQuantity.toLocaleString()} cartes</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Référence</th>
            <th>Type de Carte</th>
            <th>Quantité</th>
            <th>Origine</th>
            <th>Destination</th>
            <th>Utilisateur</th>
            <th>Notes</th>
            <th>Pièces jointes</th>
          </tr>
        </thead>
        <tbody>
          ${movements
            .map((movement) => {
              const sourceLocation = movement.sourceLocationId
                ? mockData.locations.find((l) => l.id === movement.sourceLocationId)
                : null
              const destLocation = movement.destinationLocationId
                ? mockData.locations.find((l) => l.id === movement.destinationLocationId)
                : null
              const sourceBank = sourceLocation ? mockData.banks.find((b) => b.id === sourceLocation.bankId) : null
              const destBank = destLocation ? mockData.banks.find((b) => b.id === destLocation.bankId) : null
              const cardType = mockData.cardTypes.find((c) => c.id === movement.cardTypeId)
              const user = mockData.users.find((u) => u.id === movement.userId)

              return `
              <tr>
                <td class="type-${movement.type.toLowerCase()}">${movement.type}</td>
                <td>${new Date(movement.date).toLocaleDateString("fr-FR")}<br><small>${new Date(movement.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</small></td>
                <td>${movement.referenceNumber}</td>
                <td>
                  <div class="space-y-1">
                    <div class="flex gap-1">
                      <Badge variant="outline" class="text-xs">${movement.cardType?.type}</Badge>
                      ${movement.cardType?.subType ? `<Badge variant="secondary" class="text-xs">${movement.cardType?.subType}</Badge>` : ""}
                    </div>
                    ${movement.cardType?.subSubType ? `<Badge variant="outline" class="text-xs bg-muted">${movement.cardType?.subSubType}</Badge>` : ""}
                  </div>
                </td>
                <td class="quantity">${movement.quantity.toLocaleString()}</td>
                <td>${sourceLocation ? `${sourceLocation.name}<br><small>${sourceBank?.name || ""}</small>` : "Externe"}</td>
                <td>${destLocation ? `${destLocation.name}<br><small>${destBank?.name || ""}</small>` : "Externe"}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span class="text-xs font-medium text-primary">
                        ${user?.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div class="font-medium text-sm">${user?.username}</div>
                      <div class="text-xs text-muted-foreground">
                        Email: ${user?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td style="max-width: 150px; word-wrap: break-word;">${movement.notes || "-"}</td>
                <td>
                  ${
                    movement.attachments && movement.attachments.length > 0
                      ? movement.attachments[0].name
                      : "-"
                  }
                </td>
              </tr>
            `
            })
            .join("")}
        </tbody>
      </table>

      <div class="footer">
        <p>Système de Gestion de Stock - Cartes de Crédit</p>
        <p>Document généré automatiquement - ${new Date().toISOString()}</p>
      </div>
    </body>
    </html>
  `
}

const handlePrintSingle = (movement: any) => {
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(generateSingleMovementPrint(movement))
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }
}

const handlePrintGlobal = (movements: any[], filters: any, allBanks: any[], allCardTypes: any[]) => {
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(generateGlobalMovementsPrint(movements, filters, allBanks, allCardTypes))
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }
}

export default function MovementsPage() {
  const [movements, setMovements] = useState([]);
  const [stock, setStock] = useState<any[]>([])
  const [banks, setBanks] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cardTypes, setCardTypes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("history")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMovementType, setSelectedMovementType] = useState<string>("all")
  const [validationErrors, setValidationErrors] = useState<{ [key: number]: string }>({})

  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [selectedCardType, setSelectedCardType] = useState<string>("all");

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null)
  const [isAttachmentViewerOpen, setIsAttachmentViewerOpen] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)

  const [formData, setFormData] = useState<MovementFormData>({
    type: "ENTREE",
    bankId: "",
    sourceLocationId: "",
    destinationLocationId: "",
    items: [{ cardTypeId: "", quantity: 0 }],
    notes: "",
    attachments: [],
  })

  const { toast } = useToast()

  const [detailModal, setDetailModal] = useState<{ open: boolean; movement: any | null }>({ open: false, movement: null });

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [movs, bks, locs, cts, stks] = await Promise.all([
          fetch('/api/movements'),
          fetch('/api/banks'),
          fetch('/api/locations'),
          fetch('/api/card-types'),
          fetch('/api/stock'),
        ]);

        setMovements(await movs.json());
        setBanks(await bks.json());
        setLocations(await locs.json());
        setCardTypes(await cts.json());
        setStock(await stks.json());

      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        toast({ title: "Erreur de chargement", description: "Impossible de récupérer les données.", variant: "destructive" });
      }
    };
    fetchData();
    setLoading(false);
  }, [toast]);

  const fetchMovements = async () => {
    const res = await fetch('/api/movements');
    const data = await res.json();
    setMovements(data);
  };

  // Exemple pour créer un mouvement
  const handleCreateMovement = async (formData: MovementFormData) => {
    const res = await fetch('/api/movements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      await fetchMovements();
      window.dispatchEvent(new Event("dashboard-refresh"));
      // ...fermer le dialog, reset form, etc.
    } else {
      // ...gérer l'erreur
    }
  };

  // Exemple pour modifier un mouvement
  const handleEditMovement = async (id: string, formData: Partial<MovementFormData>) => {
    const res = await fetch('/api/movements', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...formData })
    });
    if (res.ok) {
      await fetchMovements();
      window.dispatchEvent(new Event("dashboard-refresh"));
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      resetForm();
    } else {
      // ...gérer l'erreur
    }
  };

  // Exemple pour supprimer un mouvement
  const handleDeleteMovement = async (id: string) => {
    const res = await fetch('/api/movements', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      await fetchMovements();
      window.dispatchEvent(new Event("dashboard-refresh"));
      // ...afficher toast, etc.
    } else {
      // ...gérer l'erreur
    }
  };

  const filteredMovements = useMemo(() => {
    return movements
      .filter((movement: any) => {
        if (!dateRange || !dateRange.from) return true;
        const movementDate = new Date(movement.createdAt);
        if (dateRange.to) {
          return movementDate >= dateRange.from && movementDate <= dateRange.to;
        }
        return movementDate >= dateRange.from;
      })
      .filter((movement: any) => {
        if (selectedMovementType === "all") return true
        return movement.type === selectedMovementType
      })
      .filter((movement: any) => {
        const bankId = locations.find(l => l.id === movement.locationId || l.id === movement.destLocationId)?.bankId;
        return selectedBank === "all" || bankId === selectedBank;
      })
      .filter((movement: any) => {
        return selectedCardType === 'all' || movement.cardTypeId === selectedCardType;
      })
      .filter((movement: any) => {
        const searchTermLower = searchTerm.toLowerCase()
        const cardType = cardTypes.find(c => c.id === movement.cardTypeId);
        return (
          movement.referenceNumber.toLowerCase().includes(searchTermLower) ||
          (cardType?.name || '').toLowerCase().includes(searchTermLower) ||
          (cardType?.subType || '').toLowerCase().includes(searchTermLower) ||
          (cardType?.subSubType || '').toLowerCase().includes(searchTermLower)
        )
      })
  }, [movements, selectedMovementType, searchTerm, cardTypes, selectedBank, selectedCardType, locations, dateRange]);

  // Statistiques des mouvements
  const movementStats = useMemo(() => {
    const entries = filteredMovements.filter((m: any) => m.type === "ENTREE");
    const exits = filteredMovements.filter((m: any) => m.type === "SORTIE");
    const transfers = filteredMovements.filter((m: any) => m.type === "TRANSFERT");
    return {
      entries: {
        count: entries.length,
        quantity: entries.reduce((sum, m: any) => sum + m.quantity, 0),
      },
      exits: {
        count: exits.length,
        quantity: exits.reduce((sum, m: any) => sum + m.quantity, 0),
      },
      transfers: {
        count: transfers.length,
        quantity: transfers.reduce((sum, m: any) => sum + m.quantity, 0),
      },
      total: filteredMovements.length,
    };
  }, [filteredMovements]);

  const updateStock = (
    locationId: string,
    cardTypeId: string,
    quantityChange: number,
    operation: "add" | "subtract",
  ) => {
    setStock((prevStock) => {
      const existingStock = prevStock.find((s) => s.locationId === locationId && s.cardTypeId === cardTypeId)

      if (existingStock) {
        return prevStock.map((s) =>
          s.id === existingStock.id
            ? {
                ...s,
                quantity: operation === "add" ? s.quantity + quantityChange : s.quantity - quantityChange,
              }
            : s,
        )
      } else if (operation === "add") {
        return [
          ...prevStock,
          {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            locationId,
            cardTypeId,
            quantity: quantityChange,
          },
        ]
      }
      return prevStock
    })
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      const newAttachment: Attachment = {
        id: Date.now().toString(), // Using timestamp as a temporary unique ID
        name: result.name,
        type: result.type,
        size: result.size,
        url: result.url,
        uploadedAt: new Date(),
      };

      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment],
      }));

      toast({
        title: "Fichier ajouté",
        description: `${file.name} a été ajouté avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'ajouter le fichier.",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
      // Reset input
      event.target.value = "";
    }
  };

  const removeAttachment = (attachmentId: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }))
  }

  const viewAttachment = (attachment: Attachment) => {
    if (attachment && attachment.url) {
      setSelectedAttachment(attachment);
      setIsAttachmentViewerOpen(true);
  }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "🖼️"
    if (type.startsWith("video/")) return "🎥"
    if (type.startsWith("audio/")) return "🎵"
    if (type.includes("pdf")) return "📄"
    if (type.includes("word") || type.includes("document")) return "📝"
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊"
    return "📎"
  }

  const addMovementItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { cardTypeId: "", quantity: 0 }],
    })
  }

  const removeMovementItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      })
    }
  }

  const validateItem = (item: MovementItem, index: number, sourceLocationId: string): string | null => {
    if (!item.cardTypeId || item.quantity <= 0) {
      return null // Pas d'erreur si pas de sélection
    }

    if (formData.type === "SORTIE" || formData.type === "TRANSFERT") {
      const currentStock = stock.find((s) => s.locationId === sourceLocationId && s.cardTypeId === item.cardTypeId)
      const availableStock = currentStock?.quantity || 0

      if (item.quantity > availableStock) {
        const cardType = mockData.cardTypes.find((c) => c.id === item.cardTypeId)
        return `Stock insuffisant ! Disponible: ${availableStock}, Demandé: ${item.quantity}`
      }
    }

    return null
  }

  const validateAllItems = () => {
    const errors: { [key: number]: string } = {}

    formData.items.forEach((item, index) => {
      if (item.cardTypeId && item.quantity > 0) {
        const error = validateItem(item, index, formData.sourceLocationId)
        if (error) {
          errors[index] = error
        }
      }
    })

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const updateMovementItem = (index: number, field: keyof MovementItem, value: string | number) => {
    const updated = [...formData.items]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, items: updated })

    // Validation en temps réel
    setTimeout(() => {
      const newErrors = { ...validationErrors }
      const error = validateItem(updated[index], index, formData.sourceLocationId)

      if (error) {
        newErrors[index] = error
      } else {
        delete newErrors[index]
      }

      setValidationErrors(newErrors)
    }, 100)
  }

  const generateReferenceNumber = (type: string) => {
    const prefix = type === "ENTREE" ? "ENT" : type === "SORTIE" ? "SOR" : "TRA"
    const year = new Date().getFullYear()
    const count = movements.filter((m) => m.type === type).length + 1
    return `${prefix}-${year}-${String(count).padStart(3, "0")}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation générale
    const validItems = formData.items.filter((item) => item.cardTypeId && item.quantity > 0)
    if (validItems.length === 0) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez ajouter au moins un type de carte avec une quantité valide.",
        variant: "destructive",
      })
      return
    }

    // Validation des emplacements
    if (formData.type === "ENTREE") {
      const availableDest = locations.filter(l => l.bankId === formData.bankId);
      if (availableDest.length === 0) {
        toast({
          title: "Aucun emplacement destination",
          description: "Aucun emplacement de destination n'est disponible pour cette banque. Veuillez en créer un avant de poursuivre.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.bankId || !formData.destinationLocationId) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez sélectionner une banque et un emplacement de destination.",
          variant: "destructive",
        })
        return
      }
    } else if (formData.type === "SORTIE") {
      if (!formData.bankId || !formData.sourceLocationId) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez sélectionner une banque et un emplacement source.",
          variant: "destructive",
        })
        return
      }
    } else if (formData.type === "TRANSFERT") {
      const availableDest = locations.filter(l => l.bankId === formData.bankId && l.id !== formData.sourceLocationId);
      if (availableDest.length === 0) {
        toast({
          title: "Aucun emplacement destination",
          description: "Aucun emplacement de destination n'est disponible pour ce transfert. Veuillez en créer un avant de poursuivre.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.sourceLocationId || !formData.destinationLocationId) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez sélectionner les emplacements source et destination.",
          variant: "destructive",
        })
        return
      }

      if (formData.sourceLocationId === formData.destinationLocationId) {
        toast({
          title: "Erreur de validation",
          description: "L'emplacement source et destination doivent être différents.",
          variant: "destructive",
        })
        return
      }
    }

    // Validation du stock
    if (!validateAllItems()) {
      toast({
        title: "Erreur de stock",
        description: "Veuillez corriger les quantités en rouge avant de continuer.",
        variant: "destructive",
      })
      return
    }

    const referenceNumber = generateReferenceNumber(formData.type)

    const movementPayload: any = {
        type: formData.type,
      userId: user?.id,
      items: validItems.map(item => ({
        cardTypeId: item.cardTypeId,
        quantity: Number(item.quantity),
      })),
        referenceNumber,
        notes: formData.notes,
      attachments: formData.attachments,
    };

    if (formData.type === 'ENTREE') {
      movementPayload.destinationLocationId = formData.destinationLocationId;
    } else if (formData.type === 'SORTIE') {
      movementPayload.sourceLocationId = formData.sourceLocationId;
    } else if (formData.type === 'TRANSFERT') {
      movementPayload.sourceLocationId = formData.sourceLocationId;
      movementPayload.destinationLocationId = formData.destinationLocationId;
    }

    try {
      const res = await fetch('/api/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movementPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur lors de la création du mouvement.`);
      }

      await fetchMovements(); // Recharger les mouvements depuis le serveur
      const typeLabel = formData.type.toLowerCase();
    toast({
      title: `${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)} enregistrée`,
      description: `Bon de ${typeLabel} ${referenceNumber} créé avec succès.`,
      });
      resetForm();

    } catch (error) {
      toast({
        title: "Erreur d'enregistrement",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const resetForm = () => {
    setFormData({
      type: "ENTREE",
      bankId: "",
      sourceLocationId: "",
      destinationLocationId: "",
      items: [{ cardTypeId: "", quantity: 0 }],
      notes: "",
      attachments: [],
    })
    setIsDialogOpen(false)
    setValidationErrors({})
  }

  const openDialog = (type: "ENTREE" | "SORTIE" | "TRANSFERT") => {
    resetForm()
    setFormData((prev) => ({ ...prev, type }))
    setIsDialogOpen(true)
  }

  const exportMovements = () => {
    const now = new Date()
    const startDate = new Date()

    if (selectedPeriod === "week") {
      startDate.setDate(now.getDate() - 7)
    } else if (selectedPeriod === "month") {
      startDate.setMonth(now.getMonth() - 1)
    } else if (selectedPeriod === "year") {
      startDate.setFullYear(now.getFullYear() - 1)
    }

    const periodMovements = movements.filter((movement) => new Date(movement.date) >= startDate)

    const csvContent = [
      "Type,Date,Référence,Quantité,Type de Carte,Emplacement Source,Emplacement Destination,Banque Source,Banque Destination,Utilisateur,Notes",
      ...periodMovements.map((movement) =>
        [
          movement.type,
          new Date(movement.date).toLocaleDateString("fr-FR"),
          movement.referenceNumber,
          movement.quantity,
          `${movement.cardType?.type} ${movement.cardType?.subType} ${movement.cardType?.subSubType}`,
          movement.sourceLocation?.name || "",
          movement.destLocation?.name || "",
          movement.sourceBank?.name || "",
          movement.destBank?.name || "",
          movement.user?.username || "",
          movement.notes || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mouvements-${now.toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const availableLocationsForSelectedBank = useMemo(() => {
    if (!formData.bankId) return [];
    return locations.filter(loc => loc.bankId === formData.bankId);
  }, [formData.bankId, locations]);

  const availableDestinationLocationsForTransfer = useMemo(() => {
    if (!formData.bankId || !formData.sourceLocationId) return [];
    return availableLocationsForSelectedBank.filter(loc => loc.id !== formData.sourceLocationId);
  }, [formData.bankId, formData.sourceLocationId, availableLocationsForSelectedBank]);

  const isSingleLocationInBank = useMemo(() => availableLocationsForSelectedBank.length <= 1, [availableLocationsForSelectedBank]);

  // Juste avant le rendu du tableau :
  const enrichedMovements = useMemo(() => {
    return filteredMovements.map(movement => {
      // const user = mockData.users.find(u => u.id === movement.userId); // Garder mock pour l'instant si /api/users n'existe pas
      // const profile = user ? mockData.profiles.find(p => p.id === user.profileId) : null;
      return {
        ...movement,
        // user, // user est déjà dans movement
        // userProfile: profile,
        cardType: cardTypes.find(c => c.id === movement.cardTypeId),
        sourceLocation: locations.find(l => l.id === movement.sourceLocationId),
        destLocation: locations.find(l => l.id === movement.destinationLocationId),
        sourceBank: banks.find(b => b.id === locations.find(l => l.id === movement.sourceLocationId)?.bankId),
        destBank: banks.find(b => b.id === locations.find(l => l.id === movement.destinationLocationId)?.bankId),
      };
    });
  }, [filteredMovements, cardTypes, locations, banks]);

  const availableCardTypes = useMemo(() => {
    // Pour une ENTRÉE, on montre tous les types de cartes de la banque, qu'ils soient en stock ou non.
    if (formData.type === "ENTREE" && formData.bankId) {
      return cardTypes.filter(ct => ct.bankId === formData.bankId);
    }

    // Pour un TRANSFERT, on ne montre que ce qui est en stock à l'emplacement source.
    if (formData.type === "TRANSFERT" && formData.sourceLocationId) {
      const stockForLocation = stock.filter(s => s.locationId === formData.sourceLocationId);
      const cardTypeIdsInStock = new Set(stockForLocation.map(s => s.cardTypeId));
      return cardTypes.filter(ct => cardTypeIdsInStock.has(ct.id));
    }

    // Pour une SORTIE, on ne montre que ce qui est en stock dans les emplacements de la banque.
    if (formData.type === "SORTIE" && formData.bankId) {
      const bankLocations = locations.filter((loc) => loc.bankId === formData.bankId).map((loc) => loc.id);
      const cardTypeIdsInStock = new Set(
        stock
          .filter((s) => bankLocations.includes(s.locationId))
          .map((s) => s.cardTypeId)
      );
      return cardTypes.filter((ct) => cardTypeIdsInStock.has(ct.id));
    }

    return [];
  }, [formData.type, formData.bankId, formData.sourceLocationId, locations, stock, cardTypes]);

  // Ajout logique pour transfert même banque
  const sourceLocation = formData.sourceLocationId
    ? locations.find((l) => l.id === formData.sourceLocationId)
    : null;

  if (loading) {
    return <Loader message="Chargement des mouvements..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-blue-50 rounded-lg shadow-sm px-6 py-4 mb-2">
        <div className="flex items-center gap-3">
          <History className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-900">Gestion des Mouvements</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportMovements} variant="outline" className="focus:ring-2 focus:ring-blue-400">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>
      <hr className="my-2 border-blue-100" />

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrées</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{movementStats.entries.count}</div>
            <p className="text-xs text-muted-foreground">
              {movementStats.entries.quantity.toLocaleString()} cartes ajoutées
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sorties</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{movementStats.exits.count}</div>
            <p className="text-xs text-muted-foreground">
              {movementStats.exits.quantity.toLocaleString()} cartes sorties
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transferts</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{movementStats.transfers.count}</div>
            <p className="text-xs text-muted-foreground">
              {movementStats.transfers.quantity.toLocaleString()} cartes transférées
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mouvements</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{movementStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Période: {selectedPeriod === "week" ? "7 jours" : selectedPeriod === "month" ? "30 jours" : "12 mois"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-2 border border-blue-100 rounded-lg mb-2">
          <TabsTrigger value="history" className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
            <History className="h-5 w-5" />
            Historique des mouvements
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-base font-semibold bg-green-50 text-green-700 hover:bg-green-100 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all">
            <Plus className="h-5 w-5" />
            Nouvelles Opérations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres et Recherche
              </CardTitle>
              <CardDescription>
                {filteredMovements.length} mouvement{filteredMovements.length > 1 ? "s" : ""} trouvé{filteredMovements.length > 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="search-history">Recherche</Label>
                  <Input
                    id="search-history"
                    placeholder="Référence, type de carte..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type de mouvement</Label>
                  <Select value={selectedMovementType} onValueChange={setSelectedMovementType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="ENTREE">Entrée</SelectItem>
                      <SelectItem value="SORTIE">Sortie</SelectItem>
                      <SelectItem value="TRANSFERT">Transfert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Banque</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par banque" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les banques</SelectItem>
                      {banks.map(bank => <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Type de carte</Label>
                  <Select value={selectedCardType} onValueChange={setSelectedCardType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par carte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {cardTypes.map(card => <SelectItem key={card.id} value={card.id}>{card.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Plage de dates</Label>
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedMovementType("all");
                    setSelectedBank("all");
                    setSelectedCardType("all");
                    setDateRange(undefined);
                  }}
                  className="w-full"
                >
                  Réinitialiser
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePrintGlobal(filteredMovements, { 
                      period: selectedPeriod, 
                      type: selectedMovementType, 
                      search: searchTerm,
                      bankId: selectedBank,
                      cardTypeId: selectedCardType
                    }, banks, cardTypes)}
                    className="w-full"
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader className="sticky top-0 z-10 bg-white">
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Type de Carte</TableHead>
                    <TableHead className="text-right">Quantité</TableHead>
                    <TableHead>Origine</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Pièces jointes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMovements.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={11} className="text-center text-muted-foreground py-8">
                          Aucun mouvement trouvé.
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredMovements
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 50)
                      .map((movement, idx) => {
                        const cardType = cardTypes.find(c => c.id === movement.cardTypeId);
                        
                        let sourceLocation = null;
                        let destLocation = null;

                        if (movement.type === 'ENTREE') {
                          destLocation = locations.find(l => l.id === movement.locationId);
                        } else if (movement.type === 'SORTIE') {
                          sourceLocation = locations.find(l => l.id === movement.locationId);
                        } else if (movement.type === 'TRANSFERT') {
                          sourceLocation = locations.find(l => l.id === movement.locationId);
                          destLocation = locations.find(l => l.id === movement.destLocationId);
                        }

                        const sourceBank = sourceLocation ? banks.find(b => b.id === sourceLocation.bankId) : null;
                        const destBank = destLocation ? banks.find(b => b.id === destLocation.bankId) : null;

                        return (
                        <TableRow
                          key={movement.id}
                          className={
                            (idx % 2 === 0 ? "bg-white" : "bg-muted/50") +
                            " hover:bg-blue-50 transition-colors cursor-pointer"
                          }
                          onClick={() => setDetailModal({ open: true, movement })}
                          style={{ cursor: "pointer" }}
                        >
                        <TableCell>
                          <Badge
                            variant={
                              movement.type === "ENTREE"
                                ? "default"
                                : movement.type === "SORTIE"
                                  ? "destructive"
                                  : "info"
                            }
                            className={
                              movement.type === "TRANSFERT" ? "bg-blue-600 text-white" : ""
                            }
                          >
                            {movement.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{new Date(movement.createdAt).toLocaleDateString("fr-FR")}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(movement.createdAt).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{movement.referenceNumber}</Badge>
                        </TableCell>
                        <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge variant="secondary" className="text-xs px-2 py-1">
                                    {[
                                      cardType?.name,
                                      cardType?.subType,
                                      cardType?.subSubType,
                                    ]
                                      .filter(Boolean)
                                      .join(" / ")}
                              </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs max-w-xs">
                                    {cardType?.description || "Type de carte"}
                            </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          <span
                            className={
                              movement.type === "ENTREE"
                                ? "text-green-600"
                                : movement.type === "SORTIE"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }
                          >
                              {movement.type === "ENTREE"
                                ? "+"
                                : movement.type === "SORTIE"
                                ? "-"
                                : "→"}
                            {movement.quantity.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          {sourceLocation ? (
                            <div>
                              <div className="font-medium">{sourceLocation.name}</div>
                              <div className="text-xs text-muted-foreground">
                                <span>{sourceBank?.name}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Externe</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {destLocation ? (
                            <div>
                              <div className="font-medium">{destLocation.name}</div>
                              <div className="text-xs text-muted-foreground">
                                <span>{destBank?.name}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Externe</span>
                          )}
                        </TableCell>
                        <TableCell>
                            <div>
                              <div className="font-medium text-sm">
                                {movement.user?.firstName} {movement.user?.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {movement.user?.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{movement.notes || "-"}</TableCell>
                        <TableCell>
                          {movement.attachments && movement.attachments.length > 0 ? (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                {movement.attachments.length}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (movement.attachments && movement.attachments.length > 0) {
                                      viewAttachment(movement.attachments[0]);
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                              onClick={e => {
                                e.stopPropagation();
                                handlePrintSingle({ ...movement, cardType, sourceLocation, destLocation, sourceBank, destBank, user: movement.user })
                              }}
                            title="Imprimer ce mouvement"
                          >
                              <Printer className="h-4 w-4 mr-1" />
                              Imprimer
                          </Button>
                        </TableCell>
                      </TableRow>
                        )
                    })}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>

          {/* Modal de détail du mouvement */}
          {detailModal.open && detailModal.movement && (
            <Dialog open={detailModal.open} onOpenChange={open => setDetailModal({ open, movement: open ? detailModal.movement : null })}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Détail du Mouvement</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <div><b>Type :</b> {detailModal.movement.type}</div>
                  <div><b>Date :</b> {new Date(detailModal.movement.date).toLocaleString("fr-FR")}</div>
                  <div><b>Référence :</b> {detailModal.movement.referenceNumber}</div>
                  <div><b>Type de carte :</b> {[
                    detailModal.movement.cardType?.type,
                    detailModal.movement.cardType?.subType,
                    detailModal.movement.cardType?.subSubType,
                  ].filter(Boolean).join(" / ")}</div>
                  <div><b>Quantité :</b> {detailModal.movement.quantity}</div>
                  <div><b>Origine :</b> {detailModal.movement.sourceLocation?.name || "Externe"} ({detailModal.movement.sourceBank?.name || "-"})</div>
                  <div><b>Destination :</b> {detailModal.movement.destLocation?.name || "Externe"} ({detailModal.movement.destBank?.name || "-"})</div>
                  <div><b>Utilisateur :</b> {detailModal.movement.user?.firstName} {detailModal.movement.user?.lastName}</div>
                  <div className="text-xs text-muted-foreground ml-2">{detailModal.movement.user?.email}</div>
                  <div><b>Notes :</b> {detailModal.movement.notes || "-"}</div>
                  <div><b>Pièces jointes :</b> {detailModal.movement.attachments?.length || 0}</div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDetailModal({ open: false, movement: null })}>Fermer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          {/* Actions rapides */}
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <Button
              className="flex flex-col items-center justify-center gap-2 py-8 rounded-2xl shadow-md bg-green-50 hover:bg-green-100 text-green-800 text-lg font-bold transition-transform hover:scale-105 focus:ring-2 focus:ring-green-400"
              onClick={() => openDialog("ENTREE")}
              style={{ minHeight: 120 }}
            >
              <TrendingUp className="h-10 w-10 mb-2 text-green-600" />
              Nouvelle Entrée
              <span className="text-xs font-normal text-green-700 mt-1">Ajouter des cartes au stock</span>
            </Button>
            <Button
              className="flex flex-col items-center justify-center gap-2 py-8 rounded-2xl shadow-md bg-red-50 hover:bg-red-100 text-red-800 text-lg font-bold transition-transform hover:scale-105 focus:ring-2 focus:ring-red-400"
              onClick={() => openDialog("SORTIE")}
              style={{ minHeight: 120 }}
            >
              <TrendingDown className="h-10 w-10 mb-2 text-red-600" />
              Nouvelle Sortie
              <span className="text-xs font-normal text-red-700 mt-1">Retirer des cartes du stock</span>
            </Button>
            <Button
              className="flex flex-col items-center justify-center gap-2 py-8 rounded-2xl shadow-md bg-blue-50 hover:bg-blue-100 text-blue-800 text-lg font-bold transition-transform hover:scale-105 focus:ring-2 focus:ring-blue-400"
              onClick={() => openDialog("TRANSFERT")}
              style={{ minHeight: 120 }}
            >
              <ArrowRightLeft className="h-10 w-10 mb-2 text-blue-600" />
              Nouveau Transfert
              <span className="text-xs font-normal text-blue-700 mt-1">Déplacer des cartes entre emplacements</span>
            </Button>
          </div>

          {/* Résumé du stock actuel */}
          <Card>
            <CardHeader>
              <CardTitle>État Actuel du Stock</CardTitle>
              <CardDescription>Vue d'ensemble pour faciliter les opérations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {banks.slice(0, 3).map((bank) => {
                  const bankLocations = locations.filter((loc) => loc.bankId === bank.id)
                  const bankStock = stock.filter((s) => bankLocations.some((loc) => loc.id === s.locationId))
                  const totalCards = bankStock.reduce((sum, s) => sum + s.quantity, 0)

                  return (
                    <Card key={bank.id} className="border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{bank.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total cartes:</span>
                            <span className="font-mono">{totalCards.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Emplacements:</span>
                            <Badge variant="outline">{bankLocations.length}</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Types de cartes:</span>
                            <Badge variant="secondary">{new Set(bankStock.map((s) => s.cardTypeId)).size}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de création de mouvement */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {formData.type === "ENTREE" && <TrendingUp className="h-5 w-5 text-green-600" />}
              {formData.type === "SORTIE" && <TrendingDown className="h-5 w-5 text-red-600" />}
              {formData.type === "TRANSFERT" && <ArrowRightLeft className="h-5 w-5 text-blue-600" />}
              {formData.type === "ENTREE" ? "Nouvelle Entrée" : formData.type === "SORTIE" ? "Nouvelle Sortie" : "Nouveau Transfert"}
            </DialogTitle>
            <DialogDescription>
              {formData.type === "ENTREE" && "Enregistrez l'arrivée de nouvelles cartes de crédit"}
              {formData.type === "SORTIE" && "Enregistrez la sortie de cartes de crédit du stock"}
              {formData.type === "TRANSFERT" && "Transférez des cartes entre emplacements"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              {/* Sélection des emplacements */}
              <div className="grid gap-4 md:grid-cols-2">
                {(formData.type === "ENTREE" || formData.type === "SORTIE" || formData.type === "TRANSFERT") && (
                  <div className={`space-y-2 ${formData.type === 'TRANSFERT' ? 'md:col-span-2' : ''}`}>
                    <Label>Banque</Label>
                    <Select
                      value={formData.bankId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, bankId: value, sourceLocationId: "", destinationLocationId: "" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une banque" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(formData.type === "SORTIE" || formData.type === "TRANSFERT") && (
                  <div className="space-y-2">
                    <Label>Emplacement source</Label>
                    <Select
                      value={formData.sourceLocationId}
                      onValueChange={(value) => {
                        setFormData({ ...formData, sourceLocationId: value, destinationLocationId: '' });
                        setValidationErrors({});
                      }}
                      disabled={!formData.bankId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'emplacement source" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLocationsForSelectedBank.map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                            {location.name}
                              </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.type === "ENTREE" && (
                  <div className="space-y-2">
                    <Label>Emplacement destination</Label>
                    <Select
                      value={formData.destinationLocationId}
                      onValueChange={(value) => setFormData({ ...formData, destinationLocationId: value })}
                      disabled={!formData.bankId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'emplacement destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLocationsForSelectedBank.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.type === 'TRANSFERT' && (
                  <div className="space-y-2">
                    <Label>Emplacement destination</Label>
                    <Select
                      value={formData.destinationLocationId}
                      onValueChange={(value) => setFormData({ ...formData, destinationLocationId: value })}
                      disabled={!formData.sourceLocationId || isSingleLocationInBank}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDestinationLocationsForTransfer.map(loc => <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {isSingleLocationInBank && formData.bankId && <p className="text-xs text-muted-foreground pt-1">Pas d'autre emplacement dans cette banque pour un transfert.</p>}
                  </div>
                )}
              </div>

              {/* Information sur le transfert inter-banque (supprimée car simplifiée) */}

              {/* Articles du mouvement */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Types de cartes</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addMovementItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un type
                  </Button>
                </div>

                {formData.items.map((item, index) => {
                  const hasError = validationErrors[index]
                  const availableStock =
                    (formData.type === "SORTIE" || formData.type === "TRANSFERT") &&
                    formData.sourceLocationId &&
                    item.cardTypeId
                      ? stock.find(
                          (s) => s.locationId === formData.sourceLocationId && s.cardTypeId === item.cardTypeId,
                        )?.quantity || 0
                      : null

                  return (
                    <div
                      key={index}
                      className={`grid gap-4 md:grid-cols-3 p-4 border rounded-lg ${hasError ? "border-red-300 bg-red-50" : ""}`}
                    >
                      <div className="space-y-2">
                        <Label>Type de carte</Label>
                        <Select
                          value={item.cardTypeId}
                          onValueChange={(value) => updateMovementItem(index, "cardTypeId", value)}
                          disabled={availableCardTypes.length === 0}
                        >
                          <SelectTrigger className={hasError && !item.cardTypeId ? "border-red-500" : ""}>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCardTypes.length === 0 ? (
                              <div className="p-2 text-sm text-muted-foreground">Aucun type de carte disponible pour cette banque.</div>
                            ) : (
                              availableCardTypes.map((cardType) => (
                              <SelectItem key={cardType.id} value={cardType.id}>
                                {cardType.name} {cardType.subType} {cardType.subSubType}
                              </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Quantité</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity || ""}
                          onChange={(e) => updateMovementItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className={hasError ? "border-red-500 focus:border-red-500" : ""}
                        />

                        {/* Affichage du stock disponible */}
                        {availableStock !== null && item.cardTypeId && (
                          <div className="text-xs">
                            <span className="text-muted-foreground">Stock disponible: </span>
                            <span
                              className={`font-medium ${availableStock === 0 ? "text-red-600" : availableStock < 100 ? "text-orange-600" : "text-green-600"}`}
                            >
                              {availableStock.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {/* Message d'erreur */}
                        {hasError && <div className="text-xs text-red-600 font-medium">{hasError}</div>}
                      </div>

                      <div className="flex items-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeMovementItem(index)}
                          disabled={formData.items.length === 1}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes (optionnel)</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Informations complémentaires sur cette opération..."
                  rows={3}
                />
              </div>

              {/* Pièces jointes */}
              <div className="space-y-2">
                <Label>Pièces jointes (optionnel)</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      accept="*/*"
                      className="flex-1"
                    />
                    {uploadingFile && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                        Upload en cours...
                      </div>
                    )}
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Fichiers ajoutés ({formData.attachments.length})</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {formData.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-2 border rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-lg">{getFileIcon(attachment.type)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{attachment.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatFileSize(attachment.size)} • {attachment.type}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => viewAttachment(attachment)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(attachment.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Résumé des erreurs */}
            {Object.keys(validationErrors).length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-800">Erreurs de validation</span>
                </div>
                <div className="text-sm text-red-700">
                  <div>Veuillez corriger les quantités en rouge avant de continuer.</div>
                  <div className="mt-1">
                    {Object.keys(validationErrors).length} article{Object.keys(validationErrors).length > 1 ? "s" : ""}{" "}
                    en erreur
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Annuler
              </Button>
              <Button type="submit" disabled={formData.type === 'TRANSFERT' && isSingleLocationInBank}>
                Enregistrer {formData.type === "ENTREE" ? "l'entrée" : formData.type === "SORTIE" ? "la sortie" : "le transfert"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Attachment Viewer Dialog */}
      <Dialog open={isAttachmentViewerOpen} onOpenChange={setIsAttachmentViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-lg">{selectedAttachment ? getFileIcon(selectedAttachment.type) : "📎"}</span>
              {selectedAttachment?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedAttachment && (
                <div className="flex items-center gap-4 text-sm">
                  <span>Taille: {formatFileSize(selectedAttachment.size)}</span>
                  <span>Type: {selectedAttachment.type}</span>
                  <span>Ajouté le: {selectedAttachment.uploadedAt ? new Date(selectedAttachment.uploadedAt).toLocaleDateString("fr-FR") : "-"}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            {selectedAttachment && (
              <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
                {selectedAttachment.type.startsWith("image/") ? (
                  <img
                    src={selectedAttachment.url || "/placeholder.svg"}
                    alt={selectedAttachment.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : selectedAttachment.type.startsWith("video/") ? (
                  <video src={selectedAttachment.url} controls className="max-w-full max-h-full">
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                ) : selectedAttachment.type.startsWith("audio/") ? (
                  <div className="text-center space-y-4">
                    <div className="text-6xl">{getFileIcon(selectedAttachment.type)}</div>
                    <audio src={selectedAttachment.url} controls className="w-full max-w-md">
                      Votre navigateur ne supporte pas la lecture audio.
                    </audio>
                  </div>
                ) : selectedAttachment.type.includes("pdf") ? (
                  <div className="w-full h-full">
                    <iframe
                      src={selectedAttachment.url}
                      className="w-full h-full border-0"
                      title={selectedAttachment.name}
                    >
                      <div className="text-center space-y-4">
                        <div className="text-6xl">📄</div>
                        <p>Impossible d'afficher le PDF dans ce navigateur.</p>
                        <Button asChild>
                          <a href={selectedAttachment.url} target="_blank" rel="noopener noreferrer">
                            Ouvrir dans un nouvel onglet
                          </a>
                        </Button>
                      </div>
                    </iframe>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="text-6xl">{getFileIcon(selectedAttachment.type)}</div>
                    <div>
                      <h3 className="font-medium">{selectedAttachment.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Aperçu non disponible pour ce type de fichier
                      </p>
                      <Button asChild className="mt-4">
                        <a href={selectedAttachment.url} download={selectedAttachment.name}>
                          Télécharger le fichier
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAttachmentViewerOpen(false)}>
              Fermer
            </Button>
            {selectedAttachment && (
              <Button asChild>
                <a href={selectedAttachment.url} download={selectedAttachment.name}>
                  Télécharger
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
