import { createContext } from 'react';
import type { Category } from '../types/Category';

type CategoryContextValue = {
  path: Category[];
  currentCategory: Category | undefined;
  parentId: number | null;
  openCategory: (category: Category) => void;
  goBack: () => void;
  goToRoot: () => void;
};

export const CategoryContext = createContext<CategoryContextValue | undefined>(undefined);
