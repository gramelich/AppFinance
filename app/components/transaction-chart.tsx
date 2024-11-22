'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Transaction } from '../types'

type TransactionChartProps = {
  transactions: Transaction[]
}

export function TransactionChart({ transactions }: TransactionChartProps) {
  const chartData = transactions.reduce((acc, transaction) => {
    const date = transaction.date
    const existingEntry = acc.find(entry => entry.date === date)
    if (existingEntry) {
      if (transaction.type === 'income') {
        existingEntry.income += transaction.amount
      } else {
        existingEntry.expense += transaction.amount
      }
    } else {
      acc.push({
        date,
        income: transaction.type === 'income' ? transaction.amount : 0,
        expense: transaction.type === 'expense' ? transaction.amount : 0
      })
    }
    return acc
  }, [] as { date: string; income: number; expense: number }[])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#4ade80" name="Entrada" />
              <Bar dataKey="expense" fill="#f87171" name="Saída" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

