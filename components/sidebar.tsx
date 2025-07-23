"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Building2,
  MapPin,
  CreditCard,
  Package,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

const navigation = [
  {
    name: "Tableau de Bord",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Banques",
    href: "/banks",
    icon: Building2,
  },
  {
    name: "Emplacements",
    href: "/locations",
    icon: MapPin,
  },
  {
    name: "Types de Cartes",
    href: "/card-types",
    icon: CreditCard,
  },
  {
    name: "Stock",
    href: "/stock",
    icon: Package,
  },
  {
    name: "Mouvements",
    href: "/movements",
    icon: ArrowRightLeft,
  },
  {
    name: "Rapports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Utilisateurs",
    href: "/users",
    icon: Users,
  },
  {
    name: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  if (isLoading) return null
  if (!user) return null

  return (
    <div className={cn("flex flex-col border-r bg-card transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <h2 className="text-lg font-semibold">Gestion Stock</h2>}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", collapsed && "px-2")}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
