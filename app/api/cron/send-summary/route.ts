import { NextResponse } from 'next/server'
import { sendTelegramSummary } from '@/lib/sendTelegramSummary'
import { sendWhatsAppSummary } from '@/lib/sendWhatsAppSummary'
import { Transaction } from '@/app/types'

export async function POST(request: Request) {
  try {
    const { transactions, platform } = await request.json()
    let result

    if (platform === 'telegram') {
      result = await sendTelegramSummary(transactions)
    } else if (platform === 'whatsapp') {
      result = await sendWhatsAppSummary(transactions)
    } else {
      throw new Error('Plataforma não suportada')
    }

    return NextResponse.json({ message: result })
  } catch (error) {
    console.error('Erro ao enviar resumo:', error)
    return NextResponse.json({ error: 'Falha ao enviar resumo: ' + (error as Error).message }, { status: 500 })
  }
}

