"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader } from "@/components/ui/loader";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [form, setForm] = useState({ key: "", value: "" });
  const [notif, setNotif] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [smtp, setSmtp] = useState({
    smtp_host: "",
    smtp_port: "",
    smtp_user: "",
    smtp_password: "",
    smtp_tls: false,
  });
  const [testEmail, setTestEmail] = useState("");
  const [testing, setTesting] = useState(false);
  const [smtpStatus, setSmtpStatus] = useState<null | "ok" | "error">(null);
  const [smtpStatusMsg, setSmtpStatusMsg] = useState("");
  const [tab, setTab] = useState("smtp");
  const [notifPrefs, setNotifPrefs] = useState({ mouvement: true, rapport: true, erreur: true, newAccount: true });
  const [notifLoading, setNotifLoading] = useState(false);
  const [recipients, setRecipients] = useState({ admins: false, operateurs: false, users: [] });
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [templateNewAccount, setTemplateNewAccount] = useState({ subject: "Bienvenue sur la plateforme", body: "Bonjour {firstName},\n\nVotre compte ({email}) a bien été créé.\nMot de passe initial : {password}\n\nBienvenue !" });
  const [templateStockAlert, setTemplateStockAlert] = useState({ subject: "Alerte stock bas", body: "Le stock de la carte {cardName} à l’emplacement {location} est passé sous le seuil critique." });
  const [templateLoading, setTemplateLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchSettings();
    setLoading(false);
  }, []);

  const fetchSettings = async () => {
    const res = await fetch('/api/settings');
    const data = await res.json();
    setSettings(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotif("");
    if (editingKey) {
      // Edition
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: editingKey, value: form.value })
      });
      if (res.ok) {
        setNotif("Paramètre modifié !");
        setEditingKey(null);
        setForm({ key: "", value: "" });
        fetchSettings();
      } else {
        setNotif("Erreur lors de la modification.");
      }
    } else {
      // Création
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setNotif("Paramètre ajouté !");
        setForm({ key: "", value: "" });
        fetchSettings();
      } else {
        setNotif("Erreur lors de l'ajout.");
      }
    }
  };

  const handleEdit = (setting: any) => {
    setEditingKey(setting.key);
    setForm({ key: setting.key, value: setting.value });
  };

  const handleDelete = async (key: string) => {
    setNotif("");
    const res = await fetch('/api/settings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    if (res.ok) {
      setNotif("Paramètre supprimé.");
      fetchSettings();
    } else {
      setNotif("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    // Charger les paramètres SMTP existants
    fetch("/api/settings").then(res => res.json()).then(data => {
      const smtpFields = ["smtp_host", "smtp_port", "smtp_user", "smtp_password", "smtp_tls"];
      const smtpConfig: any = {};
      for (const key of smtpFields) {
        const found = data.find((s: any) => s.key === key);
        smtpConfig[key] = found ? found.value : (key === "smtp_tls" ? false : "");
      }
      setSmtp(smtpConfig);
    });
  }, []);

  const handleSmtpChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setSmtp((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSmtp = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batch: true, values: smtp }),
      });
      if (res.ok) {
        toast({ title: "Paramètres SMTP enregistrés !" });
        // Recharge les valeurs pour vérifier la sauvegarde
        fetch("/api/settings").then(res => res.json()).then(data => {
          const smtpFields = ["smtp_host", "smtp_port", "smtp_user", "smtp_password", "smtp_tls"];
          const smtpConfig: any = {};
          for (const key of smtpFields) {
            const found = data.find((s: any) => s.key === key);
            smtpConfig[key] = found ? found.value : (key === "smtp_tls" ? false : "");
          }
          setSmtp(smtpConfig);
        });
      } else {
        toast({ title: "Erreur lors de la sauvegarde des paramètres SMTP", variant: "destructive" });
      }
    } catch (e) {
      toast({ title: "Erreur réseau lors de la sauvegarde", variant: "destructive" });
    }
  };

  const handleTestEmail = async () => {
    setTesting(true);
    const res = await fetch("/api/settings/test-smtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: testEmail }),
    });
    const data = await res.json();
    setTesting(false);
    if (res.ok) {
      toast({ title: "Email de test envoyé avec succès !" });
    } else {
      toast({ title: "Erreur d'envoi", description: data.error || "Erreur inconnue", variant: "destructive" });
    }
  };

  const checkSmtpStatus = async () => {
    setSmtpStatus(null);
    setSmtpStatusMsg("Vérification en cours...");
    const testEmail = smtp.smtp_user || "test@example.com";
    const res = await fetch("/api/settings/test-smtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: testEmail }),
    });
    const data = await res.json();
    if (res.ok) {
      setSmtpStatus("ok");
      setSmtpStatusMsg("SMTP fonctionnel !");
    } else {
      setSmtpStatus("error");
      setSmtpStatusMsg(data.error || "Erreur SMTP");
    }
  };

  // Charger les préférences de notification et la liste des utilisateurs au mount
  useEffect(() => {
    fetch("/api/settings/notification-prefs").then(res => res.json()).then(data => {
      if (data && data.settings) setNotifPrefs(data.settings);
      if (data && data.recipients) {
        try {
          if (typeof data.recipients === 'string' && data.recipients.trim() !== "" && (/^\s*[{[]/.test(data.recipients))) {
            let parsed = null;
            try {
              parsed = JSON.parse(data.recipients);
            } catch (e) {
              console.warn("Erreur JSON.parse sur data.recipients:", data.recipients, e);
            }
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              setRecipients(parsed);
            } else {
              setRecipients({ admins: false, operateurs: false, users: [] });
            }
          } else if (typeof data.recipients === 'object' && data.recipients !== null) {
            setRecipients(data.recipients);
          } else {
            setRecipients({ admins: false, operateurs: false, users: [] });
          }
        } catch (e) {
          setRecipients({ admins: false, operateurs: false, users: [] });
        }
      } else {
        setRecipients({ admins: false, operateurs: false, users: [] });
      }
    });
    setUsersLoading(true);
    fetch("/api/settings/notification-prefs?recipients=1")
      .then(res => res.json())
      .then(data => {
        if (data && data.users) setAllUsers(data.users);
        setUsersLoading(false);
      })
      .catch(() => {
        setUsersError("Erreur lors du chargement des utilisateurs.");
        setUsersLoading(false);
      });
  }, []);

  const handleNotifChange = (key: string, value: boolean) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleRecipientChange = (key: string, value: boolean) => {
    setRecipients((prev) => ({ ...prev, [key]: value }));
  };

  const handleUserSelect = (userId: string) => {
    setRecipients((prev) => ({ ...prev, users: prev.users.includes(userId) ? prev.users.filter(u => u !== userId) : [...prev.users, userId] }));
  };

  const handleSaveNotif = async () => {
    setNotifLoading(true);
    await fetch("/api/settings/notification-prefs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: notifPrefs, recipients }),
    });
    setNotifLoading(false);
    toast({ title: "Préférences de notification enregistrées !" });
  };

  const notificationTypes = [
    {
      key: "movement",
      label: "Notification de mouvement de stock",
      variables: ["{type}", "{quantity}", "{cardName}", "{location}", "{user}"]
    },
    {
      key: "report",
      label: "Notification de génération de rapport",
      variables: ["{reportType}", "{date}"]
    },
    {
      key: "error",
      label: "Notification d’erreur système",
      variables: ["{errorMessage}", "{date}"]
    },
    {
      key: "newAccount",
      label: "Notification lors de la création d’un nouveau compte",
      variables: ["{firstName}", "{lastName}", "{email}", "{password}"]
    },
  ];
  const [templates, setTemplates] = useState<any>({
    movement: { subject: "Mouvement de stock", body: "{user} a effectué un mouvement de type {type} de {quantity} cartes {cardName} à {location}.", ui: true, email: false },
    report: { subject: "Rapport généré", body: "Un rapport de type {reportType} a été généré le {date}.", ui: true, email: false },
    error: { subject: "Erreur système", body: "Erreur : {errorMessage} le {date}.", ui: true, email: false },
    newAccount: { subject: "Bienvenue sur la plateforme", body: "Bonjour {firstName},\n\nVotre compte ({email}) a bien été créé.\nMot de passe initial : {password}\n\nBienvenue !", ui: true, email: false },
  });

  // Charger les modèles au mount
  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => {
      notificationTypes.forEach(type => {
        const t = data.find((s: any) => s.key === `template_${type.key}`);
        if (t && typeof t.value === 'string' && t.value.trim() !== "" && (/^\s*[{[]/.test(t.value))) {
          try {
            const parsed = JSON.parse(t.value);
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              setTemplates((prev: any) => ({ ...prev, [type.key]: { ...prev[type.key], ...parsed } }));
            } else {
              console.warn(`La valeur pour ${type.key} n'est pas un objet JSON valide, ignorée.`);
            }
          } catch (e) {
            console.warn(`Impossible de parser le modèle ${type.key} :`, t.value, e);
          }
        }
      });
    });
  }, []);

  const handleTemplateChange = (key: string, field: string, value: any) => {
    setTemplates((prev: any) => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleSaveTemplates = async () => {
    setTemplateLoading(true);
    const values: any = {};
    notificationTypes.forEach(type => {
      values[`template_${type.key}`] = JSON.stringify(templates[type.key]);
    });
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batch: true, values }),
    });
    setTemplateLoading(false);
    toast({ title: "Modèles enregistrés !" });
  };

  if (loading) {
    return <Loader message="Chargement des paramètres..." />;
  }

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="smtp">SMTP</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="templates">Modèles de notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="smtp">
        {/* Section SMTP uniquement, suppression de la section Paramètres globaux */}
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" onClick={checkSmtpStatus}>Vérifier l’état SMTP</Button>
          {smtpStatus === "ok" && <span className="text-green-600 font-semibold">✅ {smtpStatusMsg}</span>}
          {smtpStatus === "error" && <span className="text-red-600 font-semibold">❌ {smtpStatusMsg}</span>}
          {smtpStatus === null && smtpStatusMsg && <span>{smtpStatusMsg}</span>}
        </div>
        <h2 className="text-lg font-bold mt-8 mb-2">Configuration SMTP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="smtp_host" value={smtp.smtp_host} onChange={handleSmtpChange} placeholder="SMTP Host" />
          <Input name="smtp_port" value={smtp.smtp_port} onChange={handleSmtpChange} placeholder="SMTP Port" type="number" />
          <Input name="smtp_user" value={smtp.smtp_user} onChange={handleSmtpChange} placeholder="SMTP User (email)" type="email" />
          <Input name="smtp_password" value={smtp.smtp_password} onChange={handleSmtpChange} placeholder="SMTP Password" type="password" />
          <div className="flex items-center gap-2">
            <Switch name="smtp_tls" checked={smtp.smtp_tls} onCheckedChange={(checked) => setSmtp((prev) => ({ ...prev, smtp_tls: checked }))} />
            <span>Utiliser TLS/SSL</span>
          </div>
        </div>
        <Button className="mt-4" onClick={handleSaveSmtp}>Enregistrer SMTP</Button>
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Envoyer un email de test</h3>
          <div className="flex gap-2">
                    <Input
              value={testEmail}
              onChange={e => setTestEmail(e.target.value)}
              placeholder="Adresse email de test"
              type="email"
            />
            <Button onClick={handleTestEmail} disabled={testing || !testEmail}>
              {testing ? "Envoi..." : "Envoyer"}
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <h2 className="text-lg font-bold mb-4">Paramètres de notification</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Switch checked={notifPrefs.mouvement} onCheckedChange={v => handleNotifChange("mouvement", v)} />
            <span>Notification de mouvement de stock</span>
          </div>
          <div className="flex items-center gap-4">
            <Switch checked={notifPrefs.rapport} onCheckedChange={v => handleNotifChange("rapport", v)} />
            <span>Notification de génération de rapport</span>
          </div>
          <div className="flex items-center gap-4">
            <Switch checked={notifPrefs.erreur} onCheckedChange={v => handleNotifChange("erreur", v)} />
            <span>Notification d’erreur système</span>
          </div>
          <div className="flex items-center gap-4">
            <Switch checked={notifPrefs.newAccount} onCheckedChange={v => handleNotifChange("newAccount", v)} />
            <span>Notification lors de la création d’un nouveau compte</span>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Destinataires des alertes de stock bas</h3>
          <div className="flex items-center gap-4 mb-2">
            <input type="checkbox" checked={recipients.admins} onChange={e => handleRecipientChange("admins", e.target.checked)} id="admins" />
            <label htmlFor="admins">Tous les admins</label>
            <input type="checkbox" checked={recipients.operateurs} onChange={e => handleRecipientChange("operateurs", e.target.checked)} id="operateurs" />
            <label htmlFor="operateurs">Tous les opérateurs</label>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Utilisateurs spécifiques :</label>
            {usersLoading ? (
              <span>Chargement des utilisateurs...</span>
            ) : usersError ? (
              <span className="text-red-600">{usersError}</span>
            ) : allUsers.length === 0 ? (
              <span>Aucun utilisateur trouvé.</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {allUsers.map((u: any) => (
                  <label key={u.id} className="flex items-center gap-1">
                    <input type="checkbox" checked={recipients.users.includes(u.id)} onChange={() => handleUserSelect(u.id)} />
                    <span>{u.firstName} {u.lastName} ({u.role})</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button className="mt-6" onClick={handleSaveNotif} disabled={notifLoading}>
          {notifLoading ? "Enregistrement..." : "Enregistrer les préférences"}
        </Button>
      </TabsContent>
      <TabsContent value="templates">
        <h2 className="text-lg font-bold mb-4">Modèles de notifications</h2>
        {notificationTypes.map(type => (
          <div key={type.key} className="mb-8">
            <h3 className="font-semibold mb-2">{type.label}</h3>
            <div className="flex gap-4 mb-2">
              <Switch checked={templates[type.key].ui} onCheckedChange={v => handleTemplateChange(type.key, 'ui', v)} />
              <span>Afficher sur l’interface</span>
              <Switch checked={templates[type.key].email} onCheckedChange={v => handleTemplateChange(type.key, 'email', v)} />
              <span>Envoyer par email</span>
            </div>
            <Input value={templates[type.key].subject} onChange={e => handleTemplateChange(type.key, 'subject', e.target.value)} placeholder="Sujet (email)" className="mb-2" />
            <Textarea value={templates[type.key].body} onChange={e => handleTemplateChange(type.key, 'body', e.target.value)} placeholder="Message" rows={4} />
            <div className="text-xs text-muted-foreground mt-1">Variables disponibles : {type.variables.join(', ')}</div>
          </div>
        ))}
        <Button onClick={handleSaveTemplates} disabled={templateLoading}>{templateLoading ? "Enregistrement..." : "Enregistrer les modèles"}</Button>
      </TabsContent>
    </Tabs>
  );
}
