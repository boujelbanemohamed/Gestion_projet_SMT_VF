"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { mockData } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
  email: string
  profile: string
  isActive: boolean
  profileImage?: string // Ajouté pour la photo de profil
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Force la déconnexion pour nettoyer un localStorage potentiellement corrompu
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)

    // Ajout : écoute les changements de currentUser dans le localStorage
    const onStorage = (event: StorageEvent) => {
      if (event.key === "currentUser" && event.newValue) {
        setUser(JSON.parse(event.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [])

  const login = async (username: string, password: string): Promise<boolean | string> => {
    // Appel réel à l'API /api/login
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        // On adapte le format utilisateur pour le front
        const userSession = {
          id: data.user.id,
          username: data.user.firstName + ' ' + data.user.lastName,
          email: data.user.email,
          profile: data.user.role,
          isActive: true,
          profileImage: data.user.profileImage, // Ajouté pour la photo de profil
        };
        setUser(userSession);
        localStorage.setItem('currentUser', JSON.stringify(userSession));
        return true;
      } else {
        return data.error || false;
      }
    } catch (e) {
      return false;
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
