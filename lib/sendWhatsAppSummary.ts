import { Transaction } from '../app/types'

export async function sendWhatsAppSummary(transactions: Transaction[]) {
  const savedConfig = localStorage.getItem('appConfig')
  if (!savedConfig) {
    throw new Error('Configurações não encontradas')
  }

  const { whatsappToken, whatsappPhoneNumberId, whatsappRecipient } = JSON.parse(savedConfig)

  if (!whatsappToken || !whatsappPhoneNumberId || !whatsappRecipient) {
    throw new Error('Configurações do WhatsApp incompletas')
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

  const message = `Resumo Diário - Contas a Vencer Hoje:\n\n${upcomingBills.map(bill => 
    `${bill.description}: R$ ${bill.amount.toFixed(2)} - Vence em: ${bill.dueDate}`
  ).join('\n')}`

  try {
    const response = await fetch(`https://graph.facebook.com/v13.0/${whatsappPhoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: whatsappRecipient,
        type: 'text',
        text: { body: message }
      }),
    })

    if (!response.ok) {
      throw new Error('Falha ao enviar mensagem do WhatsApp')
    }

    return `Resumo enviado com sucesso pelo WhatsApp. ${upcomingBills.length} conta(s) a vencer hoje.`
  } catch (error) {
    console.error('Erro ao enviar resumo do WhatsApp:', error)
    throw error
  }
}

