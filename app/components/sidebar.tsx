'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, PlusCircle, BarChart2, Settings, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/transactions', icon: PlusCircle, label: 'Lançamentos' },
    { href: '/reports', icon: BarChart2, label: 'Relatórios' },
    { 
      href: '/configuracoes', 
      icon: Settings, 
      label: 'Configurações',
      subItems: [
        { href: '/configuracoes/telegram', label: 'Telegram' },
        { href: '/configuracoes/whatsapp', label: 'WhatsApp' },
        { href: '/configuracoes/supabase', label: 'Supabase' },
        { href: '/configuracoes/formas-pagamento', label: 'Formas de Pagamento' },
        { href: '/configuracoes/categorias', label: 'Categorias' },
        { href: '/configuracoes/mensagem', label: 'Mensagem' },
      ]
    },
  ]

  return (
    <>
      <Button className="md:hidden fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        <Menu size={24} />
      </Button>
      <aside className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed left-0 top-0 z-40 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                  pathname === item.href ? 'bg-gray-700' : ''
                }`}
                onClick={() => {
                  setIsOpen(false);
                  setExpandedItem(expandedItem === item.href ? null : item.href);
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
              {item.subItems && expandedItem === item.href && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                        pathname === subItem.href ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

