'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { supabase, getAppConfig, updateAppConfig, AppConfig } from '@/lib/supabase'

type ConfigFormProps = {
  configType: 'telegram' | 'whatsapp' | 'supabase' | 'message';
}

export function ConfigForm({ configType }: ConfigFormProps) {
  const [config, setConfig] = useState<AppConfig>({
    supabase_url: 'https://nwthziuaddvhbkxuxhtb.supabase.co',
    supabase_api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dGh6aXVhZGR2aGJreHV4aHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NTc1MzIsImV4cCI6MjA0NzUzMzUzMn0.mGUwY5xqF6muUM5CA1sA872XUuYdlol9FezBOF88drY',
    telegram_bot_token: '',
    telegram_chat_id: '',
    whatsapp_token: '',
    whatsapp_phone_number_id: '',
    whatsapp_recipient: '',
    message_template: '',
    separate_barcode: false,
    admin_password: '' // Added admin_password to the state
  })

  useEffect(() => {
    async function loadConfig() {
      const savedConfig = await getAppConfig()
      if (savedConfig) {
        setConfig(savedConfig)
      }
    }
    loadConfig()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setConfig(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setConfig(prev => ({ ...prev, separate_barcode: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let updatedConfig: Partial<AppConfig> = {};

    switch (configType) {
      case 'telegram':
        updatedConfig = {
          telegram_bot_token: config.telegram_bot_token,
          telegram_chat_id: config.telegram_chat_id,
        };
        break;
      case 'whatsapp':
        updatedConfig = {
          whatsapp_token: config.whatsapp_token,
          whatsapp_phone_number_id: config.whatsapp_phone_number_id,
          whatsapp_recipient: config.whatsapp_recipient,
        };
        break;
      case 'supabase':
        updatedConfig = {
          supabase_url: config.supabase_url,
          supabase_api_key: config.supabase_api_key,
        };
        break;
      case 'message':
        updatedConfig = {
          message_template: config.message_template,
          separate_barcode: config.separate_barcode,
        };
        break;
    }

    const result = await updateAppConfig(updatedConfig)

    if (result) {
      toast({
        title: "Configurações salvas",
        description: "As configurações foram salvas com sucesso.",
      })
    } else {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      })
    }
  }

  const renderFields = () => {
    switch (configType) {
      case 'telegram':
        return (
          <>
            <div>
              <Label htmlFor="telegram_bot_token">Token do Bot do Telegram</Label>
              <Input
                id="telegram_bot_token"
                name="telegram_bot_token"
                value={config.telegram_bot_token}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="telegram_chat_id">ID do Chat do Telegram</Label>
              <Input
                id="telegram_chat_id"
                name="telegram_chat_id"
                value={config.telegram_chat_id}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 'whatsapp':
        return (
          <>
            <div>
              <Label htmlFor="whatsapp_token">Token de Acesso do WhatsApp</Label>
              <Input
                id="whatsapp_token"
                name="whatsapp_token"
                value={config.whatsapp_token}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsapp_phone_number_id">ID do Número de Telefone do WhatsApp</Label>
              <Input
                id="whatsapp_phone_number_id"
                name="whatsapp_phone_number_id"
                value={config.whatsapp_phone_number_id}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="whatsapp_recipient">Número do Destinatário do WhatsApp</Label>
              <Input
                id="whatsapp_recipient"
                name="whatsapp_recipient"
                value={config.whatsapp_recipient}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 'supabase':
        return (
          <>
            <div>
              <Label htmlFor="supabase_url">URL do Supabase</Label>
              <Input
                id="supabase_url"
                name="supabase_url"
                value={config.supabase_url}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="supabase_api_key">Chave API do Supabase</Label>
              <Input
                id="supabase_api_key"
                name="supabase_api_key"
                type="password"
                value={config.supabase_api_key}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      case 'message':
        return (
          <>
            <div>
              <Label htmlFor="message_template">Template da Mensagem</Label>
              <Textarea
                id="message_template"
                name="message_template"
                value={config.message_template}
                onChange={handleChange}
                rows={10}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="separate_barcode"
                checked={config.separate_barcode}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="separate_barcode">Enviar código de barras em mensagem separada</Label>
            </div>
          </>
        );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de {configType.charAt(0).toUpperCase() + configType.slice(1)}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFields()}
          <Button type="submit">Salvar Configurações</Button>
        </form>
      </CardContent>
    </Card>
}

// Confirm that this file exists and is in the correct path: app/components/config-form.tsx
// If not, move it to this location.

