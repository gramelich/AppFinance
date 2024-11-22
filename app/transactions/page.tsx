'use client'

import { useState, useEffect } from 'react'
import { TransactionForm } from '../components/transaction-form'
import { TransactionList } from '../components/transaction-list'
import { FilterForm } from '../components/filter-form'
import { Transaction } from '../types'
import { supabase } from '@/lib/supabase'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  async function fetchTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
    
    if (error) {
      console.error('Error fetching transactions:', error)
    } else {
      setTransactions(data || [])
      setFilteredTransactions(data || [])
    }
  }

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()

    if (error) {
      console.error('Error adding transaction:', error)
    } else if (data) {
      setTransactions([...transactions, data[0]])
      setFilteredTransactions([...filteredTransactions, data[0]])
    }
  }

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting transaction:', error)
    } else {
      const updatedTransactions = transactions.filter(t => t.id !== id)
      setTransactions(updatedTransactions)
      setFilteredTransactions(updatedTransactions)
    }
  }

  const markAsPaid = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .update({ isPaid: true })
      .eq('id', id)

    if (error) {
      console.error('Error marking transaction as paid:', error)
    } else {
      const updatedTransactions = transactions.map(t => 
        t.id === id ? { ...t, isPaid: true } : t
      )
      setTransactions(updatedTransactions)
      setFilteredTransactions(updatedTransactions)
    }
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

