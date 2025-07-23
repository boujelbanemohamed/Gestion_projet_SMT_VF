"use client"
import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"
import type React from "react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  // Autoriser /login et /logout sans auth
  if (pathname.startsWith("/login") || pathname.startsWith("/logout")) {
    return <>{children}</>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }
  // Correction : vérifier explicitement que user n'est pas null/undefined
  if (!user || !user.email) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600 font-bold">
          Vous êtes déconnecté, pour accéder à la plateforme merci de vous connecter.
        </div>
      </div>
    );
  }
  return <>{children}</>;
} 