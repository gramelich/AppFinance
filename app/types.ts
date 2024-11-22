export type Transaction = {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'bill'
  category: string
  date: string
  dueDate?: string
  isPaid?: boolean
}

