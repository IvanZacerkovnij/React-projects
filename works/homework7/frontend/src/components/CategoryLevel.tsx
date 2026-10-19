import { useCategories } from '../hooks/useCategories';
import { Category } from './Category';
import { CategoryForm } from './CategoryForm';
import { ProductCard } from './ProductCard';
import { useCategoryContext } from '../hooks/useCategoryContext';

export function CategoryLevel() {
  const { parentId } = useCategoryContext();
  const { categories, products, isLoading, error, retryLoading, addCategory } = useCategories(parentId);
  const isRoot = parentId === null;
  const hasCategories = categories.length > 0;
  let title = 'Товари';

  if (isRoot) title = 'Кореневі категорії';
  else if (hasCategories) title = 'Підкатегорії';

  let content;

  if (isLoading) {
    content = <p role="status" className="text-slate-500">Завантажуємо…</p>;
  } else if (error) {
    content = (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
        <p>{error}</p>
        <button type="button" className="mt-3 cursor-pointer font-semibold underline focus-visible:outline-2" onClick={retryLoading}>Спробувати ще раз</button>
      </div>
    );
  } else if (hasCategories) {
    content = (
      <ul className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => <Category key={category.id} category={category} />)}
      </ul>
    );
  } else if (products.length > 0) {
    content = (
      <ul className="grid gap-3 sm:grid-cols-2">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </ul>
    );
  } else {
    const message = isRoot
      ? 'Категорій поки немає. Додай першу!'
      : 'У цій категорії поки немає підкатегорій і товарів.';
    content = <p role="status" className="text-slate-500">{message}</p>;
  }

  return (
    <>
      <CategoryForm parentId={parentId} disabled={isLoading || Boolean(error)} onCreated={addCategory} />
      <section aria-labelledby="categories-heading" aria-busy={isLoading} className="mt-10">
        <h2 id="categories-heading" className="mb-4 text-xl font-bold">{title}</h2>
        {content}
      </section>
    </>
  );
}
