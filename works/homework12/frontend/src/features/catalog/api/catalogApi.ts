import { request } from '../../../shared/api/http'
import type { Category, CategoryValues, Product, ProductValues } from '../model/types'

export function getCategories(signal?: AbortSignal) {
  return request<Category[]>('categories', { signal })
}

export function getProducts(signal?: AbortSignal) {
  return request<Product[]>('products', { signal })
}

function create<Result>(path: string, values: unknown, token: string) {
  return request<Result>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(values),
  })
}

export function createCategory(values: CategoryValues, token: string) {
  return create<Category>('categories', { name: values.name.trim() }, token)
}

export function createProduct(values: ProductValues, token: string) {
  return create<Product>('products', { ...values, name: values.name.trim(), description: values.description.trim() || null }, token)
}
