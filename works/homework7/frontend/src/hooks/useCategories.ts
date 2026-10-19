import { useEffect, useState } from 'react';
import { getCategories, getProducts } from '../api/categories';
import type { Category } from '../types/Category';
import type { Product } from '../types/Product';

export function useCategories(parentId: number | null) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const items = await getCategories(parentId, controller.signal);
        const categoryProducts = items.length === 0 && parentId !== null
          ? await getProducts(parentId, controller.signal)
          : [];
        if (!controller.signal.aborted) {
          setCategories(items);
          setProducts(categoryProducts);
        }
      } catch (exception: unknown) {
        if (!controller.signal.aborted) {
          setError(exception instanceof Error ? exception.message : 'Не вдалося завантажити дані.');
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [parentId, loadAttempt]);

  function retryLoading() {
    setError('');
    setIsLoading(true);
    setLoadAttempt((attempt) => attempt + 1);
  }

  function addCategory(category: Category) {
    setCategories((items) => [...items, category]);
    setProducts([]);
  }

  return { categories, products, isLoading, error, retryLoading, addCategory };
}
