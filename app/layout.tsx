import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Sidebar } from './components/sidebar'

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
        <AuthProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

