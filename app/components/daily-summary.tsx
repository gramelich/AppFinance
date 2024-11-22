import { Transaction } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DailySummaryProps = {
  transactions: Transaction[]
}

export function DailySummary({ transactions }: DailySummaryProps) {
  const today = new Date().toISOString().split('T')[0]
  const upcomingBills = transactions.filter(t => 
    t.type === 'bill' && !t.isPaid && t.dueDate && t.dueDate >= today
  ).sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Diário</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Contas a Vencer:</h3>
        {upcomingBills.length === 0 ? (
          <p>Não há contas a vencer nos próximos dias.</p>
        ) : (
          <ul className="space-y-2">
            {upcomingBills.map(bill => (
              <li key={bill.id} className="flex justify-between">
                <span>{bill.description}</span>
                <span>R$ {bill.amount.toFixed(2)} - Vence em: {bill.dueDate}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

