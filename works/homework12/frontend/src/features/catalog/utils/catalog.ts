import type { Category, Product } from '../model/types'

export function sortByName<Item extends { name: string }>(items: Item[]) {
  return [...items].sort((first, second) => first.name.localeCompare(second.name, 'uk'))
}

export function filterProducts(products: Product[], categoryId: string) {
  return categoryId ? products.filter(product => product.categoryId === categoryId) : products
}

export function countProductsByCategory(products: Product[]) {
  const counts: Record<string, number> = {}
  for (const product of products) {
    counts[product.categoryId] = (counts[product.categoryId] ?? 0) + 1
  }
  return counts
}

export function getCategoryNames(categories: Category[]) {
  return Object.fromEntries(categories.map(category => [category.id, category.name]))
}
