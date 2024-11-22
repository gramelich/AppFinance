'use client'

import Link from 'next/link'
import { useAdminAuth } from '@/contexts/AdminAuthContext'
import { AdminLogin } from '../components/admin-login'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const configOptions = [
  { title: 'Telegram', href: '/configuracoes/telegram' },
  { title: 'WhatsApp', href: '/configuracoes/whatsapp' },
  { title: 'Supabase', href: '/configuracoes/supabase' },
  { title: 'Formas de Pagamento', href: '/configuracoes/formas-pagamento' },
  { title: 'Categorias', href: '/configuracoes/categorias' },
  { title: 'Mensagem', href: '/configuracoes/mensagem' },
]

export default function ConfigPage() {
  const { isAuthenticated, logout } = useAdminAuth()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configOptions.map((option) => (
          <Card key={option.href}>
            <CardHeader>
              <CardTitle>{option.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={option.href}>
                <Button className="w-full">Configurar</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={logout} variant="outline" className="w-full">Logout</Button>
    </div>
  )
}

