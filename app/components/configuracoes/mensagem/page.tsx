'use client'

import { ConfigForm } from '@/components/config-form'

export default function MessageConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configurações de Mensagem</h1>
      <ConfigForm configType="message" />
    </div>
  )
}

