import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from './components/sidebar'
import { AdminAuthProvider } from '@/contexts/AdminAuthContext'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aplicativo Financeiro',
  description: 'Gerencie suas finanças pessoais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AdminAuthProvider>
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              {children}
            </main>
          </div>
          <Toaster />
        </AdminAuthProvider>
      </body>
    </html>
  )
}

