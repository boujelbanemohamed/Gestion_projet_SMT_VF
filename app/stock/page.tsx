"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Search, Filter, Download, Printer } from "lucide-react"
import { mockData } from "@/lib/mock-data"
import { Loader } from "@/components/ui/loader";

const generatePrintContent = (stockData: any[], selectedBank = "all", alertThresholds: Record<string, number> = {}, banksList: any[] = []) => {
  const filteredData = selectedBank === "all" ? stockData : stockData.filter((item) => item.bank?.id === selectedBank)

  const bankName =
    selectedBank === "all" ? "Toutes les Banques" : (banksList.find((b) => b.id === selectedBank)?.name || "")

  const totalCards = filteredData.reduce((sum, item) => sum + item.quantity, 0)
  const totalTypes = new Set(filteredData.map((item) => item.cardTypeId)).size
  const totalLocations = new Set(filteredData.map((item) => item.locationId)).size

  function getStatus(item: any) {
    const threshold = alertThresholds[item.cardType?.id] ?? 100;
    if (item.quantity <= threshold) return { label: "Alerte seuil !", class: "status-critical" };
    return { label: "OK", class: "status-ok" };
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>État du Stock - ${bankName}</title>
      <style>
        @media print {
          @page { margin: 1cm; size: A4; }
          body { font-family: Arial, sans-serif; font-size: 12px; }
        }
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #333; font-size: 24px; }
        .header p { margin: 5px 0; color: #666; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; background: #f9f9f9; }
        .summary-card h3 { margin: 0 0 10px 0; color: #333; font-size: 14px; }
        .summary-card .value { font-size: 20px; font-weight: bold; color: #2563eb; }
        .bank-section { margin-bottom: 40px; page-break-inside: avoid; }
        .bank-title { background: #2563eb; color: white; padding: 10px; margin-bottom: 15px; font-size: 16px; font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 11px; }
        th { background-color: #f5f5f5; font-weight: bold; }
        .quantity { text-align: right; font-weight: bold; }
        .status-ok { color: #16a34a; }
        .status-critical { color: #dc2626; }
        .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>État du Stock de Cartes de Crédit</h1>
        <p><strong>${bankName}</strong></p>
        <p>Généré le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}</p>
      </div>

      <div class="summary">
        <div class="summary-card">
          <h3>Total Cartes</h3>
          <div class="value">${totalCards.toLocaleString()}</div>
        </div>
        <div class="summary-card">
          <h3>Types de Cartes</h3>
          <div class="value">${totalTypes}</div>
        </div>
        <div class="summary-card">
          <h3>Emplacements</h3>
          <div class="value">${totalLocations}</div>
        </div>
        <div class="summary-card">
          <h3>Banques</h3>
          <div class="value">${selectedBank === "all" ? banksList.length : 1}</div>
        </div>
      </div>

      ${
        selectedBank === "all"
          ? banksList
              .map((bank) => {
                const bankStock = filteredData.filter((item) => item.bank?.id === bank.id)
                // Trouver les emplacements de la banque
                const bankLocations = stockData.filter((item) => item.bank?.id === bank.id).map(item => item.location).filter(Boolean)
                const uniqueLocations = Array.from(new Set(bankLocations.map(l => l?.id))).filter(Boolean)
                let content = `<div class=\"bank-section\">\n<div class=\"bank-title\">${bank.name} (${bank.bankCode})</div>\n<p><strong>Adresse:</strong> ${bank.address}</p>`;
                if (uniqueLocations.length === 0) {
                  content += `<div class=\"text-red-600 font-bold my-4\">Cette banque ne dispose d'aucun emplacement.</div>`;
                } else if (bankStock.length === 0) {
                  content += `<div class=\"text-orange-600 font-bold my-4\">Cette banque a un stock vide.</div>`;
                } else {
                  content += `<table>\n<thead>\n<tr>\n<th>Emplacement</th>\n<th>Type de Carte</th>\n<th>Sous-type</th>\n<th>Sous-sous-type</th>\n<th>Quantité</th>\n<th>Statut</th>\n</tr>\n</thead>\n<tbody>`;
                  content += bankStock
                      .map(
                      (item) => {
                        const status = getStatus(item);
                        return `\n<tr>\n<td>${item.location?.name || "N/A"}</td>\n<td>${item.cardType?.type || "N/A"}</td>\n<td>${item.cardType?.subType || "N/A"}</td>\n<td>${item.cardType?.subSubType || "N/A"}</td>\n<td class=\"quantity\">${item.quantity.toLocaleString()}</td>\n<td class=\"${status.class}\">${status.label}</td>\n</tr>`;
                      }
                      )
                    .join("");
                  content += `</tbody>\n</table>`;
                  content += `<p><strong>Total pour ${bank.name}:</strong> ${bankStock.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()} cartes</p>`;
                }
                content += `</div>`;
                return content;
              })
              .join("")
          : `
          <div class="bank-section">
            <table>
              <thead>
                <tr>
                  <th>Emplacement</th>
                  <th>Type de Carte</th>
                  <th>Sous-type</th>
                  <th>Sous-sous-type</th>
                  <th>Quantité</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                ${filteredData
                  .map(
                    (item) => {
                      const status = getStatus(item);
                      return `
                  <tr>
                    <td>${item.location?.name || "N/A"}</td>
                    <td>${item.cardType?.type || "N/A"}</td>
                    <td>${item.cardType?.subType || "N/A"}</td>
                    <td>${item.cardType?.subSubType || "N/A"}</td>
                    <td class="quantity">${item.quantity.toLocaleString()}</td>
                    <td class="${status.class}">${status.label}</td>
                  </tr>
                `;
                    }
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `
      }

      <div class="footer">
        <p>Système de Gestion de Stock - Cartes de Crédit</p>
        <p>Document généré automatiquement - ${new Date().toISOString()}</p>
      </div>
    </body>
    </html>
  `
}

// Correction : utiliser enrichedStock pour l'impression
let latestEnrichedStock: any[] = [];

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBank, setSelectedBank] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedCardType, setSelectedCardType] = useState<string>("all")

  // Nouveaux états pour les vraies données
  const [stock, setStock] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [cardTypes, setCardTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/stock").then(r => r.json()),
      fetch("/api/banks").then(r => r.json()),
      fetch("/api/locations").then(r => r.json()),
      fetch("/api/card-types").then(r => r.json()),
    ]).then(([stockData, banksData, locationsData, cardTypesData]) => {
      setStock(stockData);
      setBanks(banksData);
      setLocations(locationsData);
      setCardTypes(cardTypesData);
      setLoading(false);
    });
  }, []);

  // Données enrichies avec les informations des relations
  const enrichedStock = useMemo(() => {
    return stock.map((stockItem) => {
      const location = locations.find((l) => l.id === stockItem.locationId);
      const bank = location ? banks.find((b) => b.id === location.bankId) : null;
      const cardType = cardTypes.find((c) => c.id === stockItem.cardTypeId);
      return {
        ...stockItem,
        location,
        bank,
        cardType,
      };
    });
  }, [stock, banks, locations, cardTypes]);

  // Correction : handlePrint doit être défini ici pour accéder à enrichedStock
  const handlePrint = (selectedBankForPrint = "all") => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(generatePrintContent(enrichedStock, selectedBankForPrint, alertThresholds, banks))
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
    }
  }

  // Filtrage des données
  const filteredStock = useMemo(() => {
    return enrichedStock.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        (item.cardType?.type?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.cardType?.subType?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.cardType?.subSubType?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.bank?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.location?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())

      const matchesBank = selectedBank === "all" || item.bank?.id === selectedBank
      const matchesLocation = selectedLocation === "all" || item.location?.id === selectedLocation
      const matchesCardType = selectedCardType === "all" || item.cardType?.id === selectedCardType

      return matchesSearch && matchesBank && matchesLocation && matchesCardType
    })
  }, [enrichedStock, searchTerm, selectedBank, selectedLocation, selectedCardType])

  // Statistiques
  const totalCards = filteredStock.reduce((sum, item) => sum + item.quantity, 0)
  const totalTypes = new Set(filteredStock.map((item) => item.cardTypeId)).size
  const totalLocations = new Set(filteredStock.map((item) => item.locationId)).size

  // Emplacements filtrés par banque sélectionnée
  const availableLocations = useMemo(() => {
    if (selectedBank === "all") return locations
    return locations.filter((loc) => loc.bankId === selectedBank)
  }, [selectedBank, locations])

  const exportToCSV = () => {
    const headers = ["Banque", "Emplacement", "Type", "Sous-type", "Sous-sous-type", "Quantité"]
    const csvContent = [
      headers.join(","),
      ...filteredStock.map((item) =>
        [
          item.bank?.name || "",
          item.location?.name || "",
          item.cardType?.type || "",
          item.cardType?.subType || "",
          item.cardType?.subSubType || "",
          item.quantity,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `stock-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // 1. Ajoute un useState pour gérer les seuils localement
  // Remplace la gestion du seuil d'alerte par cardTypeId par une gestion par stockId
  const [alertThresholds, setAlertThresholds] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialise les seuils à partir des données réelles du stock
    const thresholds: Record<string, number> = {};
    stock.forEach(item => {
      thresholds[item.id] = item.alertThreshold ?? 0;
    });
    setAlertThresholds(thresholds);
  }, [stock]);

  // Remplace l'initialisation de alertThresholds pour qu'elle soit toujours synchronisée avec enrichedStock
  useEffect(() => {
    const thresholds: Record<string, number> = {};
    enrichedStock.forEach(item => {
      thresholds[item.id] = item.alertThreshold ?? 0;
    });
    setAlertThresholds(thresholds);
  }, [enrichedStock]);

  // 2. Fonction pour mettre à jour le seuil d'un type de carte
  const handleThresholdChange = async (stockId: string, value: number) => {
    setAlertThresholds(prev => ({ ...prev, [stockId]: value }));
    // Envoie la modification au backend
    await fetch('/api/stock', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: stockId, alertThreshold: value }),
    });
  };

  if (loading) {
    return <Loader message="Chargement du stock..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">État du Stock</h1>
          <p className="text-muted-foreground">Consultation et analyse du stock de cartes de crédit</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter CSV
          </Button>
          <Select
            value={""}
            onValueChange={(value) => {
              if (value) handlePrint(value)
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Imprimer le stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Toutes les banques
                </div>
              </SelectItem>
              {banks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  <div className="flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    {bank.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cartes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Cartes en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Types de Cartes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTypes}</div>
            <p className="text-xs text-muted-foreground">Variétés disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emplacements</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLocations}</div>
            <p className="text-xs text-muted-foreground">Lieux de stockage</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Banque</label>
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Emplacement</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les emplacements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les emplacements</SelectItem>
                  {availableLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type de carte</label>
              <Select value={selectedCardType} onValueChange={setSelectedCardType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {cardTypes.map((cardType) => (
                    <SelectItem key={cardType.id} value={cardType.id}>
                      {cardType.type} {cardType.subType} {cardType.subSubType}
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
                  setSelectedLocation("all")
                  setSelectedCardType("all")
                }}
                className="w-full"
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau du stock */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Détaillé</CardTitle>
          <CardDescription>
            {filteredStock.length} entrée{filteredStock.length > 1 ? "s" : ""} trouvée
            {filteredStock.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banque</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sous-type</TableHead>
                <TableHead>Sous-sous-type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Seuil d'alerte</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStock.map((item) => {
                const threshold = alertThresholds[item.id] ?? 0;
                const isOk = item.quantity > threshold;
                return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.bank?.name}</TableCell>
                  <TableCell>{item.location?.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.cardType?.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.cardType?.subType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.cardType?.subSubType}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{item.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        value={threshold}
                        onChange={e => handleThresholdChange(item.id, Number(e.target.value))}
                        className="w-20 text-center"
                      />
                    </TableCell>
                    <TableCell>
                      {isOk ? (
                        <Badge variant="default" className="bg-green-600 text-white">OK</Badge>
                      ) : (
                        <Badge variant="destructive">Alerte seuil !</Badge>
                      )}
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
