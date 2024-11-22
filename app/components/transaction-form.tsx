'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction, Category, PaymentMethod } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TransactionFormProps = {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense' | 'bill'>('expense')
  const [category, setCategory] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [barcode, setBarcode] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories')
    const storedPaymentMethods = localStorage.getItem('paymentMethods')
    if (storedCategories) setCategories(JSON.parse(storedCategories))
    if (storedPaymentMethods) setPaymentMethods(JSON.parse(storedPaymentMethods))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && amount && supplierName && category && paymentMethod) {
      onAddTransaction({
        description,
        supplierName,
        amount: parseFloat(amount),
        type,
        category,
        paymentMethod,
        date: new Date().toISOString().split('T')[0],
        dueDate: type === 'bill' ? dueDate : undefined,
        isPaid: type !== 'bill',
        barcode,
        invoiceNumber,
        fileUrl
      })
      // Reset form fields
      setDescription('')
      setSupplierName('')
      setAmount('')
      setType('expense')
      setCategory('')
      setPaymentMethod('')
      setDueDate('')
      setBarcode('')
      setInvoiceNumber('')
      setFileUrl('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Lançamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="supplierName">Nome do Fornecedor</Label>
            <Input
              id="supplierName"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <RadioGroup value={type} onValueChange={(value: 'income' | 'expense' | 'bill') => setType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="income" id="income" />
              <Label htmlFor="income">Entrada</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expense" id="expense" />
              <Label htmlFor="expense">Saída</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bill" id="bill" />
              <Label htmlFor="bill">Conta a Pagar</Label>
            </div>
          </RadioGroup>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method.id} value={method.name}>{method.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {type === 'bill' && (
            <div>
              <Label htmlFor="dueDate">Data de Vencimento</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="barcode">Código de Barras</Label>
            <Input
              id="barcode"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="invoiceNumber">Número da Nota Fiscal</Label>
            <Input
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="fileUrl">URL do Arquivo</Label>
            <Input
              id="fileUrl"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
            />
          </div>
          <Button type="submit">Adicionar Lançamento</Button>
        </form>
      </CardContent>
    </Card>
  )
}

