"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("stock");
  const [generatedReport, setGeneratedReport] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState("");

  // Charger l'historique au chargement
  useEffect(() => {
    fetchSavedReports();
  }, []);

  const fetchReport = async (type: string) => {
    setLoading(true);
    setNotif("");
    const res = await fetch(`/api/reports?type=${type}`);
    const data = await res.json();
    setGeneratedReport(data.data || []);
    setLoading(false);
  };

  const fetchSavedReports = async () => {
    const res = await fetch('/api/reports');
    const data = await res.json();
    setHistory(data);
  };

  const handleSaveReport = async () => {
    if (!generatedReport.length) return;
    setNotif("");
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: reportType,
        content: JSON.stringify(generatedReport),
        createdBy: "super-admin" // à adapter si tu as un vrai user
      })
    });
    if (res.ok) {
      setNotif("Rapport sauvegardé !");
      fetchSavedReports();
    } else {
      setNotif("Erreur lors de la sauvegarde du rapport.");
    }
  };

  const handleSendEmail = async () => {
    if (!generatedReport.length) return;
    setNotif("");
    try {
      const res = await fetch('/api/reports/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: reportType,
          content: generatedReport
        })
      });
      if (res.ok) {
        setNotif("Email envoyé avec succès !");
      } else {
        setNotif("Erreur lors de l'envoi de l'email.");
      }
    } catch (e) {
      setNotif("Erreur lors de l'envoi de l'email.");
    }
  };

  if (loading) {
    return <Loader message="Chargement des rapports..." />;
  }

  return (
    <div className="space-y-8">
          <Card>
            <CardHeader>
          <CardTitle>Générer un rapport</CardTitle>
            </CardHeader>
            <CardContent>
          <div className="flex gap-4 mb-4">
            <select value={reportType} onChange={e => setReportType(e.target.value)} className="border rounded px-2 py-1">
              <option value="stock">Stock</option>
              <option value="mouvements">Mouvements</option>
            </select>
            <Button onClick={() => fetchReport(reportType)} disabled={loading}>
              {loading ? "Chargement..." : "Générer"}
            </Button>
            <Button onClick={handleSaveReport} disabled={!generatedReport.length} variant="outline">
              Sauvegarder ce rapport
                  </Button>
            <Button onClick={handleSendEmail} disabled={!generatedReport.length} variant="secondary">
              📤 Envoyer par email
                  </Button>
            {notif && <span className="ml-4 text-green-600">{notif}</span>}
          </div>
          {generatedReport.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {Object.keys(generatedReport[0]).map((key) => (
                      <TableHead key={key}>{key}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedReport.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((val, i) => (
                        <TableCell key={i}>{typeof val === 'object' ? JSON.stringify(val) : String(val)}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
          <CardTitle>Historique des rapports sauvegardés</CardTitle>
            </CardHeader>
            <CardContent>
          {history.length === 0 ? (
            <div className="text-muted-foreground">Aucun rapport sauvegardé.</div>
          ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead>Contenu (JSON)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {history.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleString("fr-FR")}</TableCell>
                    <TableCell>{r.createdBy || "-"}</TableCell>
                    <TableCell className="max-w-xs truncate text-xs">{r.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          )}
              </CardContent>
            </Card>
    </div>
  );
}
