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
              <li key={transaction.id} className="flex flex-col bg-white p-3 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{transaction.description}</span>
                    <span className="ml-2 text-sm text-gray-500">({transaction.supplierName})</span>
                  </div>
                  <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Data: {transaction.date}</p>
                  <p>Categoria: {transaction.category}</p>
                  <p>Forma de Pagamento: {transaction.paymentMethod}</p>
                  {transaction.dueDate && <p>Vence em: {transaction.dueDate}</p>}
                  {transaction.barcode && <p>Código de Barras: {transaction.barcode}</p>}
                  {transaction.invoiceNumber && <p>Nota Fiscal: {transaction.invoiceNumber}</p>}
                  {transaction.fileUrl && (
                    <p>
                      Arquivo: <a href={transaction.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver arquivo</a>
                    </p>
                  )}
                  {transaction.type === 'bill' && (
                    <p className={transaction.isPaid ? 'text-green-600' : 'text-red-600'}>
                      {transaction.isPaid ? 'Pago' : 'Pendente'}
                    </p>
                  )}
                </div>
                <div className="mt-2 space-x-2">
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

