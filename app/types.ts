export type Transaction = {
  id: string
  description: string
  supplierName: string
  amount: number
  type: 'income' | 'expense' | 'bill'
  category: string
  paymentMethod: string
  date: string
  dueDate?: string
  isPaid?: boolean
  barcode?: string
  invoiceNumber?: string
  fileUrl?: string
}

export type Category = {
  id: string
  name: string
}

export type PaymentMethod = {
  id: string
  name: string
}

