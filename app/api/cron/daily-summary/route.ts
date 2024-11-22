import { NextResponse } from 'next/server'
import { sendTelegramSummary } from '@/lib/sendTelegramSummary'
import { Transaction } from '@/app/types'

export async function GET() {
  try {
    // Aqui você deve buscar as transações do seu banco de dados
    // Por enquanto, vamos usar um array vazio como exemplo
    const transactions: Transaction[] = []

    await sendTelegramSummary(transactions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar resumo diário:', error)
    return NextResponse.json({ error: 'Falha ao enviar resumo diário' }, { status: 500 })
  }
}

export const config = {
  runtime: 'edge',
}

