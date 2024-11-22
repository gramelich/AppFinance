'use client'

import { ConfigForm } from '@/components/config-form'

export default function TelegramConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configurações do Telegram</h1>
      <ConfigForm configType="telegram" />
    </div>
  )
}

