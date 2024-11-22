import { Transaction } from '../app/types'

export async function sendTelegramSummary(transactions: Transaction[]) {
  const savedConfig = localStorage.getItem('appConfig')
  if (!savedConfig) {
    throw new Error('Configurações não encontradas')
  }

  const { 
    telegramBotToken, 
    telegramChatId, 
    messageTemplate, 
    separateBarcode 
  } = JSON.parse(savedConfig)

  if (!telegramBotToken || !telegramChatId) {
    throw new Error('Token do bot do Telegram ou ID do chat não configurados')
  }

  const today = new Date().toISOString().split('T')[0]
  const upcomingBills = transactions.filter(t => 
    t.type === 'bill' && !t.isPaid
    && t.dueDate
    && t.dueDate >= today
    && new Date(t.dueDate) <= new Date(today + 'T23:59:59Z')
  ).sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))

  if (upcomingBills.length === 0) {
    return 'Não há contas a vencer hoje'
  }

  const formatBill = (bill: Transaction) => {
    let template = messageTemplate || '{supplierName}: R$ {amount} - Vence em: {dueDate}'
    return template
      .replace('{supplierName}', bill.supplierName)
      .replace('{amount}', bill.amount.toFixed(2))
      .replace('{dueDate}', bill.dueDate || '')
      .replace('{barcode}', bill.barcode || '')
  }

  const billsText = upcomingBills.map(formatBill).join('\n\n')
  const message = messageTemplate
    ? messageTemplate.replace('{bills}', billsText)
    : `Resumo Diário - Contas a Vencer Hoje:\n\n${billsText}`

  try {
    await sendTelegramMessage(telegramBotToken, telegramChatId, message)

    if (separateBarcode) {
      for (const bill of upcomingBills) {
        if (bill.barcode) {
          await sendTelegramMessage(telegramBotToken, telegramChatId, `Código de barras para ${bill.supplierName}:\n${bill.barcode}`)
        }
      }
    }

    return `Resumo enviado com sucesso. ${upcomingBills.length} conta(s) a vencer hoje.`
  } catch (error) {
    console.error('Erro ao enviar resumo do Telegram:', error)
    throw error
  }
}

async function sendTelegramMessage(token: string, chatId: string, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  })

  if (!response.ok) {
    throw new Error('Falha ao enviar mensagem do Telegram')
  }
}

