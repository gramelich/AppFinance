'use client'

import { useState, useEffect } from 'react'
import { TransactionForm } from '../components/transaction-form'
import { TransactionList } from '../components/transaction-list'
import { FilterForm } from '../components/filter-form'
import { Transaction } from '../types'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
      setFilteredTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    setTransactions([...transactions, newTransaction])
    setFilteredTransactions([...filteredTransactions, newTransaction])
  }

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id)
    setTransactions(updatedTransactions)
    setFilteredTransactions(updatedTransactions)
  }

  const markAsPaid = (id: string) => {
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, isPaid: true } : t
    )
    setTransactions(updatedTransactions)
    setFilteredTransactions(updatedTransactions)
  }

  const handleFilter = (startDate: string, endDate: string, type: string) => {
    let filtered = transactions
    if (startDate) {
      filtered = filtered.filter(t => t.date >= startDate)
    }
    if (endDate) {
      filtered = filtered.filter(t => t.date <= endDate)
    }
    if (type !== 'all') {
      filtered = filtered.filter(t => t.type === type)
    }
    setFilteredTransactions(filtered)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Lançamentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TransactionForm onAddTransaction={addTransaction} />
          <FilterForm onFilter={handleFilter} />
        </div>
        <TransactionList 
          transactions={filteredTransactions} 
          onDeleteTransaction={deleteTransaction}
          onMarkAsPaid={markAsPaid}
        />
      </div>
    </div>
  )
}

