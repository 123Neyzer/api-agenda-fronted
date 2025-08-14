"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Sidebar from "./Sidebar"
import Header from "./Header"

interface AppLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  showUserInfo?: boolean
  headerContent?: React.ReactNode
}

export default function AppLayout({ 
  children, 
  title, 
  description, 
  showUserInfo = true, 
  headerContent
}: AppLayoutProps) {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Sesión cerrada exitosamente')
      router.push("/login")
    } catch (error) {
      console.error('Error en logout:', error)
      toast.error('Error al cerrar sesión')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-gray-600">Debes iniciar sesión para acceder a esta página.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        onLogout={handleLogout}
        showUserInfo={showUserInfo}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          title={title}
          description={description}
          headerContent={headerContent}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 