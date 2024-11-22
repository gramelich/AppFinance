'use client'

import { useState, useEffect } from 'react'
import { Balance } from './components/balance'
import { TransactionChart } from './components/transaction-chart'
import { RecentTransactions } from './components/recent-transactions'
import { DailySummary } from './components/daily-summary'
import { Transaction } from './types'

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  const balance = transactions.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Balance balance={balance} />
        <TransactionChart transactions={transactions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions transactions={transactions.slice(-5).reverse()} />
        <DailySummary transactions={transactions} />
      </div>
    </div>
  )
}

