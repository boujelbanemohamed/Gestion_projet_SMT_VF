"use client"

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    logout();
    // Redirection forcée après 1s si jamais le logout ne redirige pas
    const timeout = setTimeout(() => {
      if (!redirected.current) {
        redirected.current = true;
        window.location.href = "/login";
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [logout]);

  const handleManualRedirect = () => {
    redirected.current = true;
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p>Déconnexion en cours...</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleManualRedirect}
        >
          Aller à la page de connexion
        </button>
      </div>
    </div>
  );
} 