import { useState } from 'react';
import type { FormEvent } from 'react';
import { createCategory } from '../api/categories';
import type { Category } from '../types/Category';

export function useCategoryForm(onCreated: (category: Category) => void, disabled: boolean, parentId: number | null) {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving || disabled) return;
    setError('');
    setMessage('');
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Введи назву категорії.');
      return;
    }

    setIsSaving(true);
    try {
      const category = await createCategory(trimmedName, parentId);
      onCreated(category);
      setName('');
      setMessage(`Категорію «${category.name}» додано.`);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Не вдалося створити категорію.');
    } finally {
      setIsSaving(false);
    }
  }

  return { name, setName, isSaving, error, message, handleSubmit };
}
