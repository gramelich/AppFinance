'use client'

import { ConfigForm } from '@/components/config-form'

export default function WhatsAppConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configurações do WhatsApp</h1>
      <ConfigForm configType="whatsapp" />
    </div>
  )
}

