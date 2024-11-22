import { Transaction } from '../types'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TransactionListProps = {
  transactions: Transaction[]
  onDeleteTransaction: (id: string) => void
  onMarkAsPaid: (id: string) => void
}

export function TransactionList({ transactions, onDeleteTransaction, onMarkAsPaid }: TransactionListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lançamentos</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-gray-500">Nenhum lançamento registrado.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                <div>
                  <span className="font-medium">{transaction.description}</span>
                  <span className={`ml-2 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {transaction.amount.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{transaction.date}</span>
                  {transaction.dueDate && (
                    <span className="ml-2 text-sm text-gray-500">Vence em: {transaction.dueDate}</span>
                  )}
                  <span className="ml-2 text-sm text-gray-500">{transaction.category}</span>
                  {transaction.type === 'bill' && (
                    <span className={`ml-2 text-sm ${transaction.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.isPaid ? 'Pago' : 'Pendente'}
                    </span>
                  )}
                </div>
                <div className="space-x-2">
                  {transaction.type === 'bill' && !transaction.isPaid && (
                    <Button size="sm" onClick={() => onMarkAsPaid(transaction.id)}>
                      Marcar como Pago
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => onDeleteTransaction(transaction.id)}>
                    Excluir
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

