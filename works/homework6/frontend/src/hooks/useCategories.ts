import { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';
import type { Category } from '../types/Category';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getCategories(controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) setCategories(items);
      })
      .catch((exception: unknown) => {
        if (!controller.signal.aborted) {
          setError(exception instanceof Error ? exception.message : 'Не вдалося завантажити категорії.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [loadAttempt]);

  function retryLoading() {
    setError('');
    setIsLoading(true);
    setLoadAttempt((attempt) => attempt + 1);
  }

  function addCategory(category: Category) {
    setCategories((items) => [...items, category]);
  }

  return { categories, isLoading, error, retryLoading, addCategory };
}
