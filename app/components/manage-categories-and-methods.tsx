'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Category, PaymentMethod } from '../types'

export function ManageCategoriesAndMethods() {
  const [categories, setCategories] = useState<Category[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [newPaymentMethod, setNewPaymentMethod] = useState('')

  useEffect(() => {
    const storedCategories = localStorage.getItem('categories')
    const storedPaymentMethods = localStorage.getItem('paymentMethods')
    if (storedCategories) setCategories(JSON.parse(storedCategories))
    if (storedPaymentMethods) setPaymentMethods(JSON.parse(storedPaymentMethods))
  }, [])

  const saveToLocalStorage = () => {
    localStorage.setItem('categories', JSON.stringify(categories))
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods))
  }

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, { id: Date.now().toString(), name: newCategory }])
      setNewCategory('')
      saveToLocalStorage()
    }
  }

  const addPaymentMethod = () => {
    if (newPaymentMethod) {
      setPaymentMethods([...paymentMethods, { id: Date.now().toString(), name: newPaymentMethod }])
      setNewPaymentMethod('')
      saveToLocalStorage()
    }
  }

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id))
    saveToLocalStorage()
  }

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
    saveToLocalStorage()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nova categoria"
              />
              <Button onClick={addCategory}>Adicionar</Button>
            </div>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category.id} className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <Button variant="destructive" size="sm" onClick={() => deleteCategory(category.id)}>
                    Excluir
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Formas de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newPaymentMethod}
                onChange={(e) => setNewPaymentMethod(e.target.value)}
                placeholder="Nova forma de pagamento"
              />
              <Button onClick={addPaymentMethod}>Adicionar</Button>
            </div>
            <ul className="space-y-2">
              {paymentMethods.map(method => (
                <li key={method.id} className="flex justify-between items-center">
                  <span>{method.name}</span>
                  <Button variant="destructive" size="sm" onClick={() => deletePaymentMethod(method.id)}>
                    Excluir
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

