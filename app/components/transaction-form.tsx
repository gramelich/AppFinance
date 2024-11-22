'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Transaction } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type TransactionFormProps = {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void
}

const categories = [
  'Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 
  'Lazer', 'Vestuário', 'Salário', 'Investimentos', 'Outros'
]

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense' | 'bill'>('expense')
  const [category, setCategory] = useState(categories[0])
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && amount) {
      onAddTransaction({
        description,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toISOString().split('T')[0],
        dueDate: type === 'bill' ? dueDate : undefined,
        isPaid: type !== 'bill'
      })
      setDescription('')
      setAmount('')
      setType('expense')
      setCategory(categories[0])
      setDueDate('')
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
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Adicionar Lançamento</Button>
        </form>
      </CardContent>
    </Card>
  )
}

