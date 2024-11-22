'use client'

import { useState, useEffect } from 'react'
import { Balance } from './components/balance'
import { TransactionChart } from './components/transaction-chart'
import { RecentTransactions } from './components/recent-transactions'
import { DailySummary } from './components/daily-summary'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction } from './types'
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isSending, setIsSending] = useState(false)
  const [platform, setPlatform] = useState<'telegram' | 'whatsapp'>('telegram')
  const { toast } = useToast()

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  const balance = transactions.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  )

  const handleManualSend = async () => {
    setIsSending(true)
    try {
      const response = await fetch('/api/send-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions, platform }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao enviar resumo')
      }

      toast({
        title: "Sucesso",
        description: result.message,
      })
    } catch (error) {
      console.error('Erro ao enviar resumo:', error)
      toast({
        title: "Erro",
        description: (error as Error).message || 'Erro ao enviar resumo. Verifique o console para mais detalhes.',
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Balance balance={balance} />
        <TransactionChart transactions={transactions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions.slice(-5).reverse()} />
        <DailySummary transactions={transactions} />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Select value={platform} onValueChange={(value: 'telegram' | 'whatsapp') => setPlatform(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione a plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="telegram">Telegram</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleManualSend} disabled={isSending}>
          {isSending ? 'Enviando...' : `Enviar Resumo pelo ${platform === 'telegram' ? 'Telegram' : 'WhatsApp'}`}
        </Button>
      </div>
    </div>
  )
}

