import { useCategories } from '../hooks/useCategories';
import { Category } from './Category';
import { CategoryForm } from './CategoryForm';

export function Categories() {
  const { categories, isLoading, error, retryLoading, addCategory } = useCategories();

  let content;

  if (isLoading) {
    content = <p role="status" className="text-slate-500">Завантажуємо категорії…</p>;
  } else if (error) {
    content = (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
        <p>{error}</p>
        <button type="button" className="mt-3 cursor-pointer font-semibold underline focus-visible:outline-2" onClick={retryLoading}>Спробувати ще раз</button>
      </div>
    );
  } else if (categories.length === 0) {
    content = <p className="text-slate-500">Категорій поки немає. Додай першу!</p>;
  } else {
    content = (
      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => <Category key={category.id} category={category} />)}
      </ul>
    );
  }

  return (
    <>
      <CategoryForm disabled={isLoading || Boolean(error)} onCreated={addCategory} />
      <section aria-labelledby="categories-heading" className="mt-10">
        <h2 id="categories-heading" className="mb-4 text-xl font-bold">Список категорій</h2>
        {content}
      </section>
    </>
  );
}
