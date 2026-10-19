import type { Category } from '../types/Category';

const categoriesUrl = '/api/categories';

async function readResponse(response: Response): Promise<Category | Category[]> {
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

export async function getCategories(signal?: AbortSignal): Promise<Category[]> {
  const response = await fetch(categoriesUrl, { signal });
  return await readResponse(response) as Category[];
}

export async function createCategory(name: string): Promise<Category> {
  const response = await fetch(categoriesUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  return await readResponse(response) as Category;
}
