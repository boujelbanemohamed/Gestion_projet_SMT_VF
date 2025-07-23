"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { mockData } from "@/lib/mock-data"
import {
  User,
  Settings,
  Shield,
  Activity,
  Save,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Trash2,
  Edit,
  Monitor,
  Smartphone,
  Globe,
  Lock,
  Bell,
  FileText,
  BarChart3,
  Users,
  Building,
  CreditCard,
  TrendingUp,
  Archive,
  LogOut,
  Copy,
  Check,
  Info,
  FileWarningIcon as Warning,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader } from "@/components/ui/loader";

interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  profileImage: string
  profileId: string
  isActive: boolean
  createdAt: Date
  lastLogin: Date
  loginCount: number
  bio: string
  department: string
  position: string
  manager: string
  employeeId: string
  preferences: {
    language: string
    timezone: string
    theme: string
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    sessionTimeout: number
    autoLogout: boolean
    dataRetention: number
  }
  privacy: {
    profileVisibility: string
    showEmail: boolean
    showPhone: boolean
    allowDataExport: boolean
    allowDataDeletion: boolean
  }
  statistics: {
    totalLogins: number
    averageSessionDuration: number
    lastPasswordChange: Date
    dataExported: number
    profileUpdates: number
  }
}

interface ActiveSession {
  id: string
  deviceType: string
  deviceName: string
  browser: string
  ipAddress: string
  location: string
  loginTime: Date
  lastActivity: Date
  isCurrent: boolean
}

interface ProfileModification {
  id: string
  field: string
  oldValue: string
  newValue: string
  timestamp: Date
  ipAddress: string
  userAgent: string
}

interface NotificationSetting {
  id: string
  category: string
  name: string
  description: string
  email: boolean
  sms: boolean
  push: boolean
  enabled: boolean
}

const defaultProfile: UserProfile = {
  id: "1",
  username: "admin",
  email: "admin@bank.com",
  firstName: "Jean",
  lastName: "Dupont",
  phone: "+33 1 23 45 67 89",
  address: "123 Rue de la Banque",
  city: "Paris",
  postalCode: "75001",
  country: "France",
  profileImage: "",
  profileId: "1",
  isActive: true,
  createdAt: new Date("2023-01-15"),
  lastLogin: new Date(),
  loginCount: 247,
  bio: "Responsable de la gestion des stocks de cartes bancaires avec plus de 10 ans d'expérience dans le secteur financier.",
  department: "Opérations",
  position: "Gestionnaire Senior",
  manager: "Marie Martin",
  employeeId: "EMP001",
  preferences: {
    language: "fr",
    timezone: "Europe/Paris",
    theme: "system",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    sessionTimeout: 30,
    autoLogout: true,
    dataRetention: 90,
  },
  privacy: {
    profileVisibility: "internal",
    showEmail: true,
    showPhone: false,
    allowDataExport: true,
    allowDataDeletion: false,
  },
  statistics: {
    totalLogins: 247,
    averageSessionDuration: 4.5,
    lastPasswordChange: new Date("2024-01-01"),
    dataExported: 3,
    profileUpdates: 12,
  },
}

export default function ProfilePage() {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [profileModifications, setProfileModifications] = useState<ProfileModification[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([]);
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [pendingProfileImageFile, setPendingProfileImageFile] = useState<File | null>(null);
  const [pendingProfileImagePreview, setPendingProfileImagePreview] = useState<string | null>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
    if (user) {
        try {
          const res = await fetch(`/api/users/${user.id}`);
          if (res.ok) {
            const userProfile = await res.json();
        setProfile({
          ...defaultProfile,
              ...userProfile,
              createdAt: userProfile.createdAt ? new Date(userProfile.createdAt) : new Date(),
              lastLogin: userProfile.lastLogin ? new Date(userProfile.lastLogin) : new Date(),
              statistics: {
                ...defaultProfile.statistics,
                ...userProfile.statistics,
                lastPasswordChange: userProfile.statistics?.lastPasswordChange
                  ? new Date(userProfile.statistics.lastPasswordChange)
                  : new Date(),
              },
            });
          }
        } catch (e) {
          setProfile(defaultProfile);
        }
      }
      setLoading(false);
    }
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/users/${user.id}/activity`).then(res => res.json()).then(setRecentActivity);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/users/${user.id}/modifications`).then(res => res.json()).then(setProfileModifications);
    }
  }, [user?.id]);

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      let profileImageUrl = profile.profileImage;
      if (pendingProfileImageFile) {
        const formData = new FormData();
        formData.append('file', pendingProfileImageFile);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error || 'Upload failed');
        }
        profileImageUrl = result.url;
      }
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          postalCode: profile.postalCode,
          country: profile.country,
          department: profile.department,
          position: profile.position,
          manager: profile.manager,
          profileImage: profileImageUrl,
          preferences: profile.preferences,
          privacy: profile.privacy,
        })
      });
      if (res.ok) {
        setIsEditing(false);
        setPendingProfileImageFile(null);
        setPendingProfileImagePreview(null);
        // Mettre à jour la photo dans le contexte utilisateur
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const updatedUser = { ...currentUser, profileImage: profileImageUrl };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        if (user) {
          user.profileImage = profileImageUrl;
          // Déclencher un event de storage pour forcer la synchro du header
          window.dispatchEvent(new StorageEvent('storage', { key: 'currentUser', newValue: JSON.stringify(updatedUser) }));
        }
        toast({ title: "Profil mis à jour", description: "Vos informations ont bien été enregistrées." });
      } else {
        const errorData = await res.json();
        toast({ title: "Erreur", description: errorData.error || "Erreur lors de la sauvegarde du profil.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Erreur", description: error.message || "Erreur lors de la sauvegarde du profil.", variant: "destructive" });
    } finally {
    setIsSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    const errors: string[] = []

    if (!passwordForm.currentPassword) {
      errors.push("Le mot de passe actuel est requis")
    }

    if (!passwordForm.newPassword) {
      errors.push("Le nouveau mot de passe est requis")
    } else if (passwordForm.newPassword.length < 8) {
      errors.push("Le nouveau mot de passe doit contenir au moins 8 caractères")
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.push("Les mots de passe ne correspondent pas")
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      errors.push("Le nouveau mot de passe doit être différent de l'ancien")
    }

    setPasswordErrors(errors)

    if (errors.length === 0) {
      setIsSaving(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSaving(false)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })

      // Update statistics
      setProfile((prev) => ({
        ...prev,
        statistics: {
          ...prev.statistics,
          lastPasswordChange: new Date(),
        },
      }))
    }
  }

  const handleExportData = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export progress
    for (let i = 0; i <= 100; i += 10) {
      setExportProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsExporting(false)
    setExportProgress(0)

    // Update statistics
    setProfile((prev) => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        dataExported: prev.statistics.dataExported + 1,
      },
    }))
  }

  const handleTerminateSession = async (sessionId: string) => {
    setActiveSessions((prev) => prev.filter((session) => session.id !== sessionId))
  }

  const handleTerminateAllSessions = async () => {
    setActiveSessions((prev) => prev.filter((session) => session.isCurrent))
  }

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updatePreferences = (field: keyof UserProfile["preferences"], value: any) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const updatePrivacy = (field: keyof UserProfile["privacy"], value: any) => {
    setProfile((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value,
      },
    }))
  }

  const updateNotificationSetting = (id: string, field: keyof NotificationSetting, value: any) => {
    setNotificationSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, [field]: value } : setting)),
    )
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "À l'instant"
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`
    }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Monitor className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getProfileCompletionPercentage = () => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.address,
      profile.city,
      profile.postalCode,
      profile.bio,
      profile.department,
      profile.position,
    ]
    const completedFields = fields.filter((field) => field && field.trim() !== "").length
    return Math.round((completedFields / fields.length) * 100)
  }

  // Ajout : gestion de l'upload de la photo de profil
  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({ title: "Fichier trop volumineux", description: "La photo de profil ne doit pas dépasser 5 MB.", variant: "destructive" });
      return;
    }
    setPendingProfileImageFile(file);
    setPendingProfileImagePreview(URL.createObjectURL(file));
  };

  if (loading) {
    return <Loader message="Chargement du profil..." />;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Accès non autorisé</h1>
          <p className="text-muted-foreground mt-2">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <User className="h-8 w-8" />
            Mon Profil
          </h1>
          <p className="text-muted-foreground mt-2">Gérez vos informations personnelles et préférences</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </>
          )}
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      {/* Profile Completion Banner */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Complétude du profil</h3>
                <p className="text-sm text-muted-foreground">
                  Votre profil est complété à {getProfileCompletionPercentage()}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{getProfileCompletionPercentage()}%</div>
              <Progress value={getProfileCompletionPercentage()} className="w-24 mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
          <TabsTrigger value="data">Données</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations Personnelles
                  </CardTitle>
                  <CardDescription>Gérez vos informations de profil et de contact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={pendingProfileImagePreview || profile.profileImage || "/placeholder.svg"}
                          alt={`${profile.firstName} ${profile.lastName}`}
                        />
                        <AvatarFallback className="text-lg">
                          {getInitials(profile.firstName, profile.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                            >
                              <Camera className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Changer la photo de profil</DialogTitle>
                              <DialogDescription>
                                Téléchargez une nouvelle photo de profil. Formats acceptés: JPG, PNG (max 5MB)
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                      <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                  </div>
                                  <input type="file" className="hidden" accept="image/*" onChange={handleProfileImageUpload} />
                                </label>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {
                                setProfile((prev) => ({ ...prev, profileImage: "" }));
                                setPendingProfileImageFile(null);
                                setPendingProfileImagePreview(null);
                              }}>Supprimer la photo</Button>
                              <Button variant="outline">Annuler</Button>
                              <Button onClick={handleSaveProfile} disabled={isSaving}>
                                {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="text-xl font-semibold">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-muted-foreground flex items-center gap-2">
                        @{profile.username}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(profile.username, "username")}
                        >
                          {copiedField === "username" ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant={profile.isActive ? "default" : "secondary"}>
                          {profile.isActive ? "Actif" : "Inactif"}
                        </Badge>
                        <Badge variant="outline">
                          {mockData.profiles.find((p) => p.id === profile.profileId)?.name || "Utilisateur"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          ID: {profile.employeeId}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => updateProfile("bio", e.target.value)}
                        disabled={!isEditing}
                        placeholder="Décrivez votre rôle et votre expérience..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => updateProfile("firstName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => updateProfile("lastName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => updateProfile("email", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => updateProfile("phone", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="address"
                            value={profile.address}
                            onChange={(e) => updateProfile("address", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            value={profile.city}
                            onChange={(e) => updateProfile("city", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input
                            id="postalCode"
                            value={profile.postalCode}
                            onChange={(e) => updateProfile("postalCode", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="country">Pays</Label>
                        <Select
                          value={profile.country}
                          onValueChange={(value) => updateProfile("country", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Tunisie">Tunisie</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Belgique">Belgique</SelectItem>
                            <SelectItem value="Suisse">Suisse</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Informations professionnelles</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department">Département</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="department"
                            value={profile.department}
                            onChange={(e) => updateProfile("department", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="position">Poste</Label>
                        <Input
                          id="position"
                          value={profile.position}
                          onChange={(e) => updateProfile("position", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="manager">Manager</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="manager"
                            value={profile.manager}
                            onChange={(e) => updateProfile("manager", e.target.value)}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="employeeId">ID Employé</Label>
                        <Input id="employeeId" value={profile.employeeId} disabled />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Card */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Membre depuis</span>
                      </div>
                      <span className="text-sm font-medium">
                        {profile.createdAt.toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Connexions totales</span>
                      </div>
                      <span className="text-sm font-medium">{profile.statistics?.totalLogins ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Session moyenne</span>
                      </div>
                      <span className="text-sm font-medium">{profile.statistics?.averageSessionDuration ?? 0}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Dernier MDP</span>
                      </div>
                      <span className="text-sm font-medium">
                        {profile.statistics?.lastPasswordChange ? formatDate(profile.statistics.lastPasswordChange) : "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Exports données</span>
                      </div>
                      <span className="text-sm font-medium">{profile.statistics?.dataExported ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Modifications</span>
                      </div>
                      <span className="text-sm font-medium">{profile.statistics?.profileUpdates ?? 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.isArray(recentActivity) && recentActivity.length > 0 ? (
                      recentActivity.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${act.type === 'login' ? 'bg-green-500' : act.type === 'modification' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                      <div className="flex-1">
                            <p className="text-sm">{act.description}</p>
                            <p className="text-xs text-muted-foreground">{typeof act.timestamp === 'string' ? new Date(act.timestamp).toLocaleString() : ''}</p>
                      </div>
                    </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-sm">Aucune activité récente</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Changer le mot de passe
                </CardTitle>
                <CardDescription>Modifiez votre mot de passe pour sécuriser votre compte</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {passwordErrors.length > 0 && (
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-600">Erreurs de validation</span>
                    </div>
                    <ul className="text-sm text-red-600 space-y-1">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button onClick={handlePasswordChange} disabled={isSaving} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  {isSaving ? "Modification..." : "Changer le mot de passe"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Exigences de sécurité
                </CardTitle>
                <CardDescription>Critères requis pour un mot de passe sécurisé</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Au moins 8 caractères</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Au moins une majuscule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Au moins une minuscule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Au moins un chiffre</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Au moins un caractère spécial</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h4 className="font-medium">Authentification à deux facteurs</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">2FA</p>
                      <p className="text-sm text-muted-foreground">
                        Sécurité renforcée avec authentification à deux facteurs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Sessions actives
              </CardTitle>
              <CardDescription>Gérez vos sessions actives sur différents appareils</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-full">{getDeviceIcon(session.deviceType)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{session.deviceName}</h4>
                          {session.isCurrent && (
                            <Badge variant="default" className="text-xs">
                              Session actuelle
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{session.browser}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.ipAddress} • {session.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Connecté: {formatDate(session.loginTime)} • Dernière activité:{" "}
                          {getRelativeTime(session.lastActivity)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.isCurrent ? (
                        <Badge variant="outline" className="text-green-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Actif
                        </Badge>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <LogOut className="h-4 w-4 mr-2" />
                              Terminer
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Terminer la session</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir terminer cette session ? L'utilisateur sera déconnecté de cet
                                appareil.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleTerminateSession(session.id)}>
                                Terminer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Terminer toutes les autres sessions</h4>
                  <p className="text-sm text-muted-foreground">Déconnectez-vous de tous les autres appareils</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Terminer toutes
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Terminer toutes les sessions</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action terminera toutes vos sessions actives sauf celle-ci. Vous devrez vous reconnecter
                        sur tous vos autres appareils.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleTerminateAllSessions}>Terminer toutes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Paramètres de notifications
              </CardTitle>
              <CardDescription>Configurez vos préférences de notifications par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Sécurité", "Stock", "Système", "Rapports"].map((category) => (
                  <div key={category}>
                    <h4 className="font-medium mb-4 flex items-center gap-2">
                      {category === "Sécurité" && <Shield className="h-4 w-4" />}
                      {category === "Stock" && <CreditCard className="h-4 w-4" />}
                      {category === "Système" && <Settings className="h-4 w-4" />}
                      {category === "Rapports" && <FileText className="h-4 w-4" />}
                      {category}
                    </h4>
                    <div className="space-y-4">
                      {notificationSettings
                        .filter((setting) => setting.category === category)
                        .map((setting) => (
                          <div key={setting.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{setting.name}</h5>
                                  <Switch
                                    checked={setting.enabled}
                                    onCheckedChange={(checked) =>
                                      updateNotificationSetting(setting.id, "enabled", checked)
                                    }
                                  />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
                              </div>
                            </div>
                            {setting.enabled && (
                              <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={setting.email}
                                    onCheckedChange={(checked) =>
                                      updateNotificationSetting(setting.id, "email", checked)
                                    }
                                  />
                                  <Mail className="h-4 w-4" />
                                  <span>Email</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={setting.sms}
                                    onCheckedChange={(checked) => updateNotificationSetting(setting.id, "sms", checked)}
                                  />
                                  <Phone className="h-4 w-4" />
                                  <span>SMS</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={setting.push}
                                    onCheckedChange={(checked) =>
                                      updateNotificationSetting(setting.id, "push", checked)
                                    }
                                  />
                                  <Bell className="h-4 w-4" />
                                  <span>Push</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Paramètres de confidentialité
              </CardTitle>
              <CardDescription>Contrôlez la visibilité de vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="profileVisibility">Visibilité du profil</Label>
                  <Select
                    value={profile.privacy?.profileVisibility ?? "private"}
                    onValueChange={(value) => updatePrivacy("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible par tous</SelectItem>
                      <SelectItem value="internal">Interne - Visible par l'organisation</SelectItem>
                      <SelectItem value="team">Équipe - Visible par votre équipe</SelectItem>
                      <SelectItem value="private">Privé - Visible par vous seul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Informations visibles</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Adresse email</p>
                        <p className="text-sm text-muted-foreground">
                          Permettre aux autres utilisateurs de voir votre email
                        </p>
                      </div>
                      <Switch
                        checked={profile.privacy?.showEmail ?? false}
                        onCheckedChange={(checked) => updatePrivacy("showEmail", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Numéro de téléphone</p>
                        <p className="text-sm text-muted-foreground">
                          Permettre aux autres utilisateurs de voir votre téléphone
                        </p>
                      </div>
                      <Switch
                        checked={profile.privacy?.showPhone ?? false}
                        onCheckedChange={(checked) => updatePrivacy("showPhone", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Contrôle des données</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Export des données autorisé</p>
                        <p className="text-sm text-muted-foreground">Permettre l'export de vos données personnelles</p>
                      </div>
                      <Switch
                        checked={profile.privacy?.allowDataExport ?? false}
                        onCheckedChange={(checked) => updatePrivacy("allowDataExport", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Suppression des données autorisée</p>
                        <p className="text-sm text-muted-foreground">Permettre la suppression de vos données (RGPD)</p>
                      </div>
                      <Switch
                        checked={profile.privacy?.allowDataDeletion ?? false}
                        onCheckedChange={(checked) => updatePrivacy("allowDataDeletion", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export des données
                </CardTitle>
                <CardDescription>Téléchargez une copie de toutes vos données personnelles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-600">Informations sur l'export</span>
                  </div>
                  <ul className="text-sm text-blue-600 space-y-1">
                    <li>• Profil et informations personnelles</li>
                    <li>• Historique des connexions</li>
                    <li>• Paramètres et préférences</li>
                    <li>• Activités et modifications</li>
                  </ul>
                </div>

                {isExporting && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Export en cours...</span>
                      <span>{exportProgress}%</span>
                    </div>
                    <Progress value={exportProgress} />
                  </div>
                )}

                <Button
                  onClick={handleExportData}
                  disabled={isExporting || !profile.privacy?.allowDataExport}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Export en cours..." : "Exporter mes données"}
                </Button>

                {!profile.privacy?.allowDataExport && (
                  <p className="text-sm text-muted-foreground">
                    L'export des données est désactivé dans vos paramètres de confidentialité.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Suppression du compte
                </CardTitle>
                <CardDescription>Supprimez définitivement votre compte et toutes vos données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Warning className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-600">Action irréversible</span>
                  </div>
                  <p className="text-sm text-red-600">
                    Cette action supprimera définitivement votre compte et toutes les données associées. Cette action ne
                    peut pas être annulée.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full" disabled={!profile.privacy?.allowDataDeletion}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer mon compte
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer définitivement le compte</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action supprimera définitivement votre compte et toutes vos données. Tapez "SUPPRIMER"
                        pour confirmer cette action irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                      <Input placeholder="Tapez SUPPRIMER pour confirmer" />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                        Supprimer définitivement
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {!profile.privacy?.allowDataDeletion && (
                  <p className="text-sm text-muted-foreground">
                    La suppression du compte est désactivée dans vos paramètres de confidentialité.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Rétention des données
              </CardTitle>
              <CardDescription>Configurez la durée de conservation de vos données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dataRetention">Durée de rétention (jours)</Label>
                <Select
                  value={profile.preferences?.dataRetention?.toString() ?? "30"}
                  onValueChange={(value) => updatePreferences("dataRetention", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 jours</SelectItem>
                    <SelectItem value="90">90 jours</SelectItem>
                    <SelectItem value="180">180 jours</SelectItem>
                    <SelectItem value="365">1 an</SelectItem>
                    <SelectItem value="730">2 ans</SelectItem>
                    <SelectItem value="-1">Indéfiniment</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Les données d'activité seront automatiquement supprimées après cette période.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Historique des modifications
                </CardTitle>
                <CardDescription>Consultez l'historique de toutes les modifications de votre profil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(profileModifications) && profileModifications.length > 0 ? (
                    profileModifications.map((modification) => (
                    <div key={modification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="p-1 bg-blue-100 rounded-full mt-1">
                        <Edit className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{modification.field} modifié</h4>
                          <span className="text-xs text-muted-foreground">
                              {getRelativeTime(new Date(modification.timestamp))}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Ancien: {modification.oldValue}</p>
                          <p>Nouveau: {modification.newValue}</p>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {modification.ipAddress} • {modification.userAgent}
                        </div>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground text-sm">Aucune modification récente</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Paramètres de session
                </CardTitle>
                <CardDescription>Configurez les paramètres de sécurité de vos sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sessionTimeout">Délai d'expiration (minutes)</Label>
                  <Select
                    value={profile.preferences?.sessionTimeout?.toString() ?? "30"}
                    onValueChange={(value) => updatePreferences("sessionTimeout", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 heure</SelectItem>
                      <SelectItem value="120">2 heures</SelectItem>
                      <SelectItem value="480">8 heures</SelectItem>
                      <SelectItem value="-1">Jamais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Déconnexion automatique</p>
                    <p className="text-sm text-muted-foreground">Se déconnecter automatiquement après inactivité</p>
                  </div>
                  <Switch
                    checked={profile.preferences?.autoLogout ?? false}
                    onCheckedChange={(checked) => updatePreferences("autoLogout", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Statistiques de session</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sessions actives</p>
                      <p className="font-medium">A IMPLEMENTER</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Durée moyenne</p>
                      <p className="font-medium">{profile.statistics?.averageSessionDuration ?? 0}h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
