import type { Category } from '../types/Category';
import type { Product } from '../types/Product';

const categoriesUrl = '/api/categories';

async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Помилка запиту (${response.status}).`;
    try {
      const problem = await response.json();
      message = Object.values(problem.errors ?? {}).flat().join(' ')
        || problem.detail || problem.title || message;
    } catch {
      message = 'Сервер недоступний. Перевір, чи запущений бекенд.';
    }
    throw new Error(message);
  }
  return response.json();
}

export async function getCategories(parentId: number | null, signal?: AbortSignal): Promise<Category[]> {
  const url = parentId === null ? categoriesUrl : `${categoriesUrl}?parentId=${parentId}`;
  const response = await fetch(url, { signal });
  return readResponse<Category[]>(response);
}

export async function getProducts(categoryId: number, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(`${categoriesUrl}/${categoryId}/products`, { signal });
  return readResponse<Product[]>(response);
}

export async function createCategory(name: string, parentId: number | null): Promise<Category> {
  const response = await fetch(categoriesUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, parentId }),
  });
  return readResponse<Category>(response);
}
