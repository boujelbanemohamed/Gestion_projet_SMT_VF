"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/hooks/use-auth"
import { mockData } from "@/lib/mock-data"
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Shield,
  Key,
  Activity,
  Search,
  Filter,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  XCircle,
  Save,
  X,
  Plus,
  Minus,
} from "lucide-react"
import { Loader } from "@/components/ui/loader";

interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  profileId: string
  bankId?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  createdBy: string
  permissions: string[]
  sessionId?: string
  failedLoginAttempts: number
  lockedUntil?: Date
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  level: number
  isSystem: boolean
}

interface Permission {
  id: string
  name: string
  description: string
  category: string
  resource: string
  action: string
}

interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  details: string
  timestamp: Date
  ipAddress: string
  userAgent: string
}

// Ajout pour la gestion des sessions réelles
interface Session {
  id: string;
  userId: string;
  user: User;
  createdAt: string;
  lastActivity: string;
  ip?: string;
  userAgent?: string;
  revoked: boolean;
}

const permissions: Permission[] = [
  // Stock permissions
  {
    id: "stock.view",
    name: "Voir le stock",
    description: "Consulter les informations de stock",
    category: "Stock",
    resource: "stock",
    action: "view",
  },
  {
    id: "stock.create",
    name: "Créer des entrées",
    description: "Ajouter de nouvelles entrées de stock",
    category: "Stock",
    resource: "stock",
    action: "create",
  },
  {
    id: "stock.update",
    name: "Modifier le stock",
    description: "Modifier les quantités de stock",
    category: "Stock",
    resource: "stock",
    action: "update",
  },
  {
    id: "stock.delete",
    name: "Supprimer du stock",
    description: "Supprimer des entrées de stock",
    category: "Stock",
    resource: "stock",
    action: "delete",
  },
  {
    id: "stock.transfer",
    name: "Transférer le stock",
    description: "Effectuer des transferts entre emplacements",
    category: "Stock",
    resource: "stock",
    action: "transfer",
  },

  // User permissions
  {
    id: "users.view",
    name: "Voir les utilisateurs",
    description: "Consulter la liste des utilisateurs",
    category: "Utilisateurs",
    resource: "users",
    action: "view",
  },
  {
    id: "users.create",
    name: "Créer des utilisateurs",
    description: "Ajouter de nouveaux utilisateurs",
    category: "Utilisateurs",
    resource: "users",
    action: "create",
  },
  {
    id: "users.update",
    name: "Modifier les utilisateurs",
    description: "Modifier les informations utilisateur",
    category: "Utilisateurs",
    resource: "users",
    action: "update",
  },
  {
    id: "users.delete",
    name: "Supprimer des utilisateurs",
    description: "Supprimer des comptes utilisateur",
    category: "Utilisateurs",
    resource: "users",
    action: "delete",
  },

  // Reports permissions
  {
    id: "reports.view",
    name: "Voir les rapports",
    description: "Consulter les rapports",
    category: "Rapports",
    resource: "reports",
    action: "view",
  },
  {
    id: "reports.export",
    name: "Exporter les rapports",
    description: "Exporter les rapports en PDF/Excel",
    category: "Rapports",
    resource: "reports",
    action: "export",
  },

  // Location permissions
  {
    id: "locations.view",
    name: "Voir les emplacements",
    description: "Consulter les emplacements",
    category: "Emplacements",
    resource: "locations",
    action: "view",
  },
  {
    id: "locations.manage",
    name: "Gérer les emplacements",
    description: "Créer/modifier/supprimer des emplacements",
    category: "Emplacements",
    resource: "locations",
    action: "manage",
  },

  // System permissions
  {
    id: "system.admin",
    name: "Administration système",
    description: "Accès complet au système",
    category: "Système",
    resource: "system",
    action: "admin",
  },
  {
    id: "audit.view",
    name: "Voir les logs d'audit",
    description: "Consulter les journaux d'audit",
    category: "Système",
    resource: "audit",
    action: "view",
  },
  // Attachment permissions
  {
    id: "attachments.view",
    name: "Voir les pièces jointes",
    description: "Consulter les pièces jointes des mouvements",
    category: "Pièces jointes",
    resource: "attachments",
    action: "view",
  },
  {
    id: "attachments.upload",
    name: "Ajouter des pièces jointes",
    description: "Télécharger des pièces jointes aux mouvements",
    category: "Pièces jointes",
    resource: "attachments",
    action: "upload",
  },
  {
    id: "attachments.delete",
    name: "Supprimer des pièces jointes",
    description: "Supprimer des pièces jointes des mouvements",
    category: "Pièces jointes",
    resource: "attachments",
    action: "delete",
  },
]

const initialRoles: Role[] = [
  {
    id: "super-admin",
    name: "Super Administrateur",
    description: "Accès illimité à toutes les fonctionnalités",
    permissions: permissions.map((p) => p.id),
    level: 100,
    isSystem: true,
  },
  {
    id: "admin",
    name: "Administrateur",
    description: "Accès complet sauf gestion des Super Administrateurs",
    permissions: permissions.filter((p) => p.id !== "system.admin").map((p) => p.id),
    level: 80,
    isSystem: true,
  },
  {
    id: "stock-operator",
    name: "Opérateur de Stock",
    description: "Gestion des entrées, sorties et transferts",
    permissions: [
      "stock.view",
      "stock.create",
      "stock.update",
      "stock.transfer",
      "locations.view",
      "reports.view",
      "attachments.view",
      "attachments.upload",
    ],
    level: 50,
    isSystem: true,
  },
  {
    id: "report-reader",
    name: "Lecteur de Rapports",
    description: "Accès en lecture seule aux rapports",
    permissions: ["stock.view", "reports.view", "reports.export", "locations.view", "attachments.view"],
    level: 30,
    isSystem: true,
  },
]

const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@bank.com",
    firstName: "Admin",
    lastName: "System",
    profileId: "super-admin",
    isActive: true,
    lastLogin: new Date("2024-01-15T10:30:00"),
    createdAt: new Date("2024-01-01T00:00:00"),
    createdBy: "system",
    permissions: initialRoles.find((r) => r.id === "super-admin")?.permissions || [],
    failedLoginAttempts: 0,
  },
  {
    id: "2",
    username: "operator1",
    email: "operator1@bank.com",
    firstName: "Jean",
    lastName: "Dupont",
    profileId: "stock-operator",
    bankId: "bank1",
    isActive: true,
    lastLogin: new Date("2024-01-15T09:15:00"),
    createdAt: new Date("2024-01-02T00:00:00"),
    createdBy: "1",
    permissions: initialRoles.find((r) => r.id === "stock-operator")?.permissions || [],
    failedLoginAttempts: 0,
  },
  {
    id: "3",
    username: "reader1",
    email: "reader1@bank.com",
    firstName: "Marie",
    lastName: "Martin",
    profileId: "report-reader",
    bankId: "bank2",
    isActive: false,
    lastLogin: new Date("2024-01-10T14:20:00"),
    createdAt: new Date("2024-01-03T00:00:00"),
    createdBy: "1",
    permissions: initialRoles.find((r) => r.id === "report-reader")?.permissions || [],
    failedLoginAttempts: 3,
    lockedUntil: new Date("2024-01-16T14:20:00"),
  },
]

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    userId: "1",
    action: "USER_LOGIN",
    resource: "auth",
    details: "Connexion réussie",
    timestamp: new Date("2024-01-15T10:30:00"),
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0...",
  },
  {
    id: "2",
    userId: "1",
    action: "USER_CREATE",
    resource: "users",
    details: "Création utilisateur: operator2",
    timestamp: new Date("2024-01-15T10:25:00"),
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0...",
  },
  {
    id: "3",
    userId: "2",
    action: "STOCK_UPDATE",
    resource: "stock",
    details: "Modification stock: Visa Classic - Agence Centre (+100)",
    timestamp: new Date("2024-01-15T09:15:00"),
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0...",
  },
]

export default function UsersPage() {
  const { user } = useAuth()
  const userConnecte = { id: "1", email: "admin@banque.com", role: "super-admin", profileId: "super-admin" };
  console.log("userConnecte", userConnecte);
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("active")
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isEditingRole, setIsEditingRole] = useState(false)
  const [editingRolePermissions, setEditingRolePermissions] = useState<string[]>([])
  const [banks, setBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    profileId: "super-admin",
    bankId: "",
    password: "",
    confirmPassword: "",
    isActive: true,
  })

  // Charger les banques depuis l'API
  const fetchBanks = async () => {
    const res = await fetch('/api/banks');
    const data = await res.json();
    setBanks(data);
  };

  // Fonction pour charger les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
    const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Erreur API');
    const data = await res.json();
    setUsers(data);
    } catch (e) {
      setUsersError("Erreur lors du chargement des utilisateurs.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger dynamiquement les rôles et permissions depuis l'API
  const fetchRoles = async () => {
    const res = await fetch('/api/roles');
    const data = await res.json();
    console.log('ROLES FROM API', data);
    setRoles(data);
  };
  const fetchPermissions = async () => {
    const res = await fetch('/api/permissions');
    const data = await res.json();
    setPermissions(data);
  };

  // Charger les sessions actives depuis l'API
  const fetchSessions = async () => {
    setLoadingSessions(true);
    const res = await fetch('/api/users/sessions');
    const data = await res.json();
    setSessions(Array.isArray(data) ? data : []);
    setLoadingSessions(false);
  };

  // Charger les logs d'audit depuis l'API
  const fetchAuditLogs = async () => {
    setLoadingAudit(true);
    const res = await fetch('/api/users/audit');
    const data = await res.json();
    setAuditLogs(Array.isArray(data) ? data : []);
    setLoadingAudit(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchBanks();
    fetchRoles();
    fetchPermissions();
    fetchSessions();
    fetchAuditLogs();
  }, []);

  // Log pour diagnostiquer le contenu des utilisateurs reçus de l'API
  console.log("USERS FROM API", users);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Recherche sur prénom, nom, email
      const matchesSearch =
        `${user.firstName ?? ''} ${user.lastName ?? ''}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par rôle
      const matchesRole = filterRole === "all" || user.role === filterRole;

      // Pas de filtre statut/locked (à moins d'ajouter ces champs dans la base)
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  const handleCreateUser = async () => {
    // Préparer les données à envoyer selon le schéma Prisma
    const userToCreate = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.profileId,
      bankId: formData.bankId || null,
    }
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToCreate)
      })
      if (res.ok) {
        await fetchUsers(); // Recharge la liste après création
        setIsCreateDialogOpen(false)
        resetForm()
      } else {
        const errorData = await res.json();
        if (res.status === 409 && errorData.field === 'email') {
          alert('Utilisateur déjà existant : veuillez changer l\'adresse email.');
        } else {
          alert(errorData.error || 'Erreur lors de la création de l\'utilisateur');
        }
      }
    } catch (e) {
      alert('Erreur lors de la création de l\'utilisateur')
    }
  }

  const handleEditUser = async () => {
    if (!selectedUser) return;

    const updateData = {
      id: selectedUser.id,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.profileId,
      bankId: formData.bankId || null,
      // Ajoute d'autres champs si besoin
    };

    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (res.ok) {
        await fetchUsers(); // Recharge la liste après modification
        setIsEditDialogOpen(false);
        setSelectedUser(null);
        resetForm();
      } else {
        const errorData = await res.json();
        if (res.status === 409 && errorData.field === 'email') {
          alert('Utilisateur déjà existant : veuillez changer l\'adresse email.');
        } else {
          alert(errorData.error || 'Erreur lors de la modification de l\'utilisateur');
        }
      }
    } catch (e) {
      alert('Erreur lors de la modification de l\'utilisateur');
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const handleToggleUserStatus = (userId: string) => {
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    setUsers(updatedUsers)
  }

  const handleUnlockUser = (userId: string) => {
    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, lockedUntil: undefined, failedLoginAttempts: 0 } : u,
    )
    setUsers(updatedUsers)
  }

  const handleEditRole = (role: any) => {
    setSelectedRole(role)
    setEditingRolePermissions(
      role.permissions.map((p: any) => typeof p === 'string' ? p : p.id)
    )
    setIsEditingRole(true)
  }

  // Adapter la sauvegarde des permissions d'un rôle
  const handleSaveRolePermissions = async () => {
    if (!selectedRole) return
    try {
      const res = await fetch('/api/roles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedRole.id,
          name: selectedRole.name,
          description: selectedRole.description,
          permissionIds: editingRolePermissions.map(p => typeof p === 'object' ? p.id : p),
        }),
      });
      if (res.ok) {
        await fetchRoles();
        console.log('fetchRoles called after PATCH');
        setIsEditingRole(false);
        setEditingRolePermissions([]);
      } else {
        alert('Erreur lors de la modification du rôle');
      }
    } catch (e) {
      alert('Erreur lors de la modification du rôle');
    }
  }

  // Adapter la création d'un rôle
  const handleCreateRole = async (name: string, description: string, permissionIds: string[]) => {
    try {
      const res = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          // Correction : n'envoie que des IDs (string)
          permissionIds: permissionIds.map(p => typeof p === 'object' ? p.id : p),
        }),
      });
      if (res.ok) {
        await fetchRoles();
      } else {
        alert('Erreur lors de la création du rôle');
      }
    } catch (e) {
      alert('Erreur lors de la création du rôle');
    }
  }

  // Adapter la suppression d'un rôle
  const handleDeleteRole = async (roleId: string) => {
    try {
      const res = await fetch('/api/roles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: roleId }),
      });
      if (res.ok) {
        await fetchRoles();
      } else {
        alert('Erreur lors de la suppression du rôle');
      }
    } catch (e) {
      alert('Erreur lors de la suppression du rôle');
    }
  }

  const handleCancelRoleEdit = () => {
    setIsEditingRole(false)
    setEditingRolePermissions([])
  }

  const handlePermissionToggle = (permissionId: string, checked: boolean) => {
    if (checked) {
      setEditingRolePermissions([...editingRolePermissions, permissionId])
    } else {
      setEditingRolePermissions(editingRolePermissions.filter((p) => p !== permissionId))
    }
  }

  const handleSelectAllPermissions = (category: string) => {
    const categoryPermissions = permissions.filter((p) => p.category === category).map((p) => p.id)
    const newPermissions = [...new Set([...editingRolePermissions, ...categoryPermissions])]
    setEditingRolePermissions(newPermissions)
  }

  const handleDeselectAllPermissions = (category: string) => {
    const categoryPermissions = permissions.filter((p) => p.category === category).map((p) => p.id)
    const newPermissions = editingRolePermissions.filter((p) => !categoryPermissions.includes(p))
    setEditingRolePermissions(newPermissions)
  }

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      profileId: "super-admin",
      bankId: "",
      password: "",
      confirmPassword: "",
      isActive: true,
    })
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileId: user.profileId,
      bankId: user.bankId || "",
      password: "",
      confirmPassword: "",
      isActive: user.isActive,
    })
    setIsEditDialogOpen(true)
  }

  const getUserStatusBadge = (user: User) => {
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Verrouillé
        </Badge>
      )
    }
    if (!user.isActive) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Inactif
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Actif
      </Badge>
    )
  }

  const getRoleName = (roleId: string) => {
    return roles.find((r) => r.id === roleId)?.name || "Inconnu"
  }

  const getBankName = (bankId?: string) => {
    if (!bankId) return "Toutes les banques"
    return banks.find((b) => b.id === bankId)?.name || "Banque inconnue"
  }

  // Révoquer une session
  const revokeSession = async (id: string) => {
    await fetch('/api/users/sessions/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchSessions();
  }

  // Log de rendu du composant
  console.log('UsersPage render', roles);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Gestion des Utilisateurs
          </h1>
          <p className="text-muted-foreground mt-2">Gérez les utilisateurs, rôles et permissions du système</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Nouvel Utilisateur
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="roles">Rôles & Permissions</TabsTrigger>
          <TabsTrigger value="sessions">Sessions Actives</TabsTrigger>
          <TabsTrigger value="audit">Journal d'Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {loading ? (
            <Loader message="Chargement des utilisateurs..." />
          ) : usersError ? (
            <div className="text-red-600 text-center py-8">{usersError}</div>
          ) : (
            <>
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Rechercher</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Nom, email, utilisateur..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="role-filter">Rôle</Label>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les rôles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status-filter">Statut</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actifs</SelectItem>
                      <SelectItem value="inactive">Inactifs</SelectItem>
                      <SelectItem value="locked">Verrouillés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setFilterRole("all")
                      setFilterStatus("all")
                    }}
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.firstName ?? ""}</TableCell>
                      <TableCell>{user.lastName ?? ""}</TableCell>
                      <TableCell>{user.email ?? ""}</TableCell>
                      <TableCell>{user.role ?? ""}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                            {user && userConnecte && (user.email !== userConnecte.email) && (userConnecte.role === 'super-admin' || userConnecte.profileId === 'super-admin') && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={async () => {
                                      await fetch('/api/users', {
                                        method: 'DELETE',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ id: user.id })
                                      });
                                      await fetchUsers();
                                    }} className="bg-red-600 text-white">Supprimer</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          {loading ? (
            <Loader message="Chargement des rôles..." />
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Roles List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Rôles Système
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedRole?.id === role.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => {
                      setSelectedRole(role)
                      setIsEditingRole(false)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{role.name}</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">Niveau {role.level}</Badge>
                          <Badge variant="secondary">
                            {
                              Array.isArray(role.permissions)
                                ? role.permissions.map((p: any) => typeof p === 'string' ? p : p.id).length
                                : 0
                            } permissions
                          </Badge>
                          {role.isSystem && <Badge>Système</Badge>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditRole(role)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Role Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    {selectedRole ? `Permissions - ${selectedRole.name}` : "Sélectionnez un rôle"}
                  </div>
                  {selectedRole && isEditingRole && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancelRoleEdit}>
                        <X className="h-4 w-4" />
                        Annuler
                      </Button>
                      <Button size="sm" onClick={handleSaveRolePermissions}>
                        <Save className="h-4 w-4" />
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedRole ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Informations du rôle</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Nom:</strong> {selectedRole.name}
                        </div>
                        <div>
                          <strong>Description:</strong> {selectedRole.description}
                        </div>
                        <div>
                          <strong>Niveau:</strong> {selectedRole.level}
                        </div>
                        <div>
                          <strong>Type:</strong> {selectedRole.isSystem ? "Système" : "Personnalisé"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">
                          Permissions ({isEditingRole ? editingRolePermissions.length : selectedRole.permissions.length}
                          )
                        </h4>
                        {!isEditingRole && (
                          <Button variant="outline" size="sm" onClick={() => handleEditRole(selectedRole)}>
                            <Edit className="h-4 w-4" />
                            Modifier
                          </Button>
                        )}
                      </div>
                      {!isEditingRole && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {selectedRole.permissions.map((p: any) => (
                            <Badge key={typeof p === 'string' ? p : p.id} variant="outline" className="text-xs">
                              {typeof p === 'string'
                                ? (permissions.find(perm => perm.id === p)?.name || p)
                                : p.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {(() => {
                          const currentPermissions = isEditingRole
                            ? editingRolePermissions
                            : selectedRole.permissions.map((p: any) => typeof p === 'string' ? p : p.id);
                          const groupedPermissions = permissions.reduce(
                            (acc, permission) => {
                              if (!acc[permission.category]) {
                                acc[permission.category] = []
                              }
                              acc[permission.category].push(permission)
                              return acc
                            },
                            {} as Record<string, Permission[]>,
                          )

                          return Object.entries(groupedPermissions).map(([category, perms]) => (
                            <div key={category} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-sm">{category}</h5>
                                {isEditingRole && (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleSelectAllPermissions(category)}
                                    >
                                      <Plus className="h-3 w-3" />
                                      Tout
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeselectAllPermissions(category)}
                                    >
                                      <Minus className="h-3 w-3" />
                                      Rien
                                    </Button>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-1">
                                {perms.map((permission) => (
                                  <div key={permission.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      {isEditingRole ? (
                                        <Checkbox
                                          checked={editingRolePermissions.includes(permission.id)}
                                          onCheckedChange={(checked) =>
                                            handlePermissionToggle(permission.id, checked as boolean)
                                          }
                                        />
                                      ) : (
                                        <div
                                          className={`h-4 w-4 rounded border-2 ${
                                            currentPermissions.includes(permission.id)
                                              ? "bg-primary border-primary"
                                              : "border-muted-foreground"
                                          }`}
                                        >
                                          {currentPermissions.includes(permission.id) && (
                                            <CheckCircle className="h-3 w-3 text-primary-foreground" />
                                          )}
                                        </div>
                                      )}
                                      <span>{permission.name}</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                      {permission.action}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Sélectionnez un rôle pour voir ses permissions</p>
                )}
              </CardContent>
            </Card>
          </div>
          )}
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          {loadingSessions ? (
            <Loader message="Chargement des sessions..." />
          ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Sessions Actives
              </CardTitle>
              <CardDescription>Gérez les sessions utilisateurs actives</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Adresse IP</TableHead>
                    <TableHead>Navigateur</TableHead>
                    <TableHead>Début de session</TableHead>
                    <TableHead>Dernière activité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {session.user?.firstName} {session.user?.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">@{session.user?.username}</div>
                        </div>
                      </TableCell>
                      <TableCell>{session.ip || '-'}</TableCell>
                      <TableCell>{session.userAgent || '-'}</TableCell>
                      <TableCell>{new Date(session.createdAt).toLocaleString("fr-FR")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          {new Date(session.lastActivity).toLocaleString("fr-FR")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => revokeSession(session.id)}>
                          Révoquer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          )}
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          {loadingAudit ? (
            <Loader message="Chargement du journal d'audit..." />
          ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Journal d'Audit
              </CardTitle>
              <CardDescription>Historique des actions effectuées dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date/Heure</TableHead>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Ressource</TableHead>
                    <TableHead>Détails</TableHead>
                    <TableHead>Adresse IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp ? new Date(log.timestamp).toLocaleString("fr-FR") : "-"}</TableCell>
                      <TableCell>
                        {log.user?.username || log.user?.email || "Utilisateur supprimé"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.action?.includes("LOGIN")
                              ? "default"
                              : log.action?.includes("CREATE")
                                ? "default"
                                : log.action?.includes("DELETE")
                                  ? "destructive"
                                  : "secondary"
                          }
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
            <DialogDescription>Remplissez les informations pour créer un nouveau compte utilisateur</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Rôle</Label>
              <Select
                value={formData.profileId}
                onValueChange={(value) => setFormData({ ...formData, profileId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bank">Banque</Label>
              <Select value={formData.bankId} onValueChange={(value) => setFormData({ ...formData, bankId: value })}>
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
            <div className="col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Compte actif</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateUser}>Créer l'utilisateur</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>Modifiez les informations de l'utilisateur</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-firstName">Prénom</Label>
              <Input
                id="edit-firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-lastName">Nom</Label>
              <Input
                id="edit-lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-username">Nom d'utilisateur</Label>
              <Input
                id="edit-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Rôle</Label>
              <Select
                value={formData.profileId}
                onValueChange={(value) => setFormData({ ...formData, profileId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-bank">Banque</Label>
              <Select value={formData.bankId} onValueChange={(value) => setFormData({ ...formData, bankId: value })}>
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
            <div className="col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="edit-isActive">Compte actif</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditUser}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
