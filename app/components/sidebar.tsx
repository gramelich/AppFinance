'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, BarChart2 } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        <Link href="/" className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${pathname === '/' ? 'bg-gray-700' : ''}`}>
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link href="/transactions" className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${pathname === '/transactions' ? 'bg-gray-700' : ''}`}>
          <PlusCircle size={20} />
          <span>Lançamentos</span>
        </Link>
        <Link href="/reports" className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${pathname === '/reports' ? 'bg-gray-700' : ''}`}>
          <BarChart2 size={20} />
          <span>Relatórios</span>
        </Link>
      </nav>
    </aside>
  )
}

