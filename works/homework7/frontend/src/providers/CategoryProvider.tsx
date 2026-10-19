import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Category } from '../types/Category';
import { CategoryContext } from './CategoryContext';

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<Category[]>([]);
  const currentCategory = path.at(-1);
  const parentId = currentCategory?.id ?? null;

  function openCategory(category: Category) {
    setPath((previousPath) => [...previousPath, category]);
  }

  function goBack() {
    setPath((previousPath) => previousPath.slice(0, -1));
  }

  function goToRoot() {
    setPath([]);
  }

  return (
    <CategoryContext.Provider value={{ path, currentCategory, parentId, openCategory, goBack, goToRoot }}>
      {children}
    </CategoryContext.Provider>
  );
}
