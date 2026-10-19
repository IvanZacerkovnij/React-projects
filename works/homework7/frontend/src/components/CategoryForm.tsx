import { useCategoryForm } from '../hooks/useCategoryForm';
import type { Category } from '../types/Category';

type CategoryFormProps = {
  onCreated: (category: Category) => void;
  disabled: boolean;
  parentId: number | null;
};

export function CategoryForm({ onCreated, disabled, parentId }: CategoryFormProps) {
  const { name, setName, isSaving, error, message, handleSubmit } = useCategoryForm(onCreated, disabled, parentId);

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">{parentId === null ? 'Нова коренева категорія' : 'Нова підкатегорія'}</h2>
      <label htmlFor="category-name" className="mb-2 block text-sm font-medium">Назва категорії</label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="category-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={100}
          required
          disabled={isSaving || disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'category-error' : undefined}
          placeholder="Наприклад, Навушники"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
        />
        <button type="submit" disabled={isSaving || disabled} className="cursor-pointer rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
          {isSaving ? 'Зберігаємо…' : 'Додати'}
        </button>
      </div>
      {error && <p id="category-error" role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      <p role="status" className="mt-3 text-sm text-emerald-700">{message}</p>
    </form>
  );
}
