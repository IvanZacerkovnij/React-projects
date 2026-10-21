import { useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import type { Category, Product } from '../model/types'
import { countProductsByCategory, filterProducts, getCategoryNames } from '../utils/catalog'
import { useCatalogData } from './useCatalogData'

export type CatalogModal = 'login' | 'register' | 'category' | 'product' | null

export function useCatalog() {
  const { user, token, checking } = useAuth()
  const data = useCatalogData()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [modal, setModal] = useState<CatalogModal>(null)
  const [notice, setNotice] = useState('')
  const categoryNames = getCategoryNames(data.categories)

  function openCreate(kind: 'category' | 'product') {
    setNotice('')
    setModal(user ? kind : 'login')
  }

  function categoryCreated(category: Category) {
    data.addCategory(category)
    setModal(null)
    setNotice(`Категорію «${category.name}» створено.`)
  }

  function productCreated(product: Product) {
    data.addProduct(product)
    setSelectedCategory('')
    setModal(null)
    setNotice(`Продукт «${product.name}» створено.`)
  }

  return {
    ...data,
    token: user ? token : null,
    selectedCategory,
    selectCategory: setSelectedCategory,
    modal,
    openModal: setModal,
    closeModal: () => setModal(null),
    notice,
    dismissNotice: () => setNotice(''),
    openCreate,
    categoryCreated,
    productCreated,
    visibleProducts: filterProducts(data.products, selectedCategory),
    categoryNames,
    categoryCounts: countProductsByCategory(data.products),
    selectedName: categoryNames[selectedCategory],
    creationDisabled: checking || data.loading || !!data.error,
  }
}
