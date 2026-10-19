import { useContext } from 'react';
import { CategoryContext } from '../providers/CategoryContext';

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used inside CategoryProvider.');
  }
  return context;
}
