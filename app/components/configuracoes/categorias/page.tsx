'use client'

import { ManageCategoriesAndMethods } from '@/components/manage-categories-and-methods'

export default function CategoriesConfigPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configurações de Categorias</h1>
      <ManageCategoriesAndMethods type="categories" />
    </div>
  )
}

