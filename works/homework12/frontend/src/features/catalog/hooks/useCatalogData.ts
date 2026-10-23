import { useEffect, useState } from 'react'
import { getErrorMessage } from '../../../shared/utils/errors'
import { getCategories, getProducts } from '../api/catalogApi'
import type { Category, Product } from '../model/types'
import { sortByName } from '../utils/catalog'

export function useCatalogData() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const [nextCategories, nextProducts] = await Promise.all([
          getCategories(controller.signal),
          getProducts(controller.signal),
        ])
        if (controller.signal.aborted) return
        setCategories(nextCategories)
        setProducts(nextProducts)
      } catch (caught) {
        if (!controller.signal.aborted) setError(getErrorMessage(caught, 'Не вдалося завантажити каталог.'))
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void load()
    return () => controller.abort()
  }, [attempt])

  function reload() {
    setLoading(true)
    setError('')
    setAttempt(previous => previous + 1)
  }

  function addCategory(category: Category) {
    setCategories(previous => sortByName([...previous, category]))
  }

  function addProduct(product: Product) {
    setProducts(previous => sortByName([...previous, product]))
  }

  return { categories, products, loading, error, reload, addCategory, addProduct }
}
