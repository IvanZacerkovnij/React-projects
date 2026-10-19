import { useState } from 'react';
import { useCategories } from './hooks/useCategories';
import { Category } from './components/Category';
import { CategoryForm } from './components/CategoryForm';
import { ProductCard } from './components/ProductCard';
import type { Category as CategoryModel } from './types/Category';

function CategoryLevel({ parentId, onOpen }: { parentId: number | null; onOpen: (category: CategoryModel) => void }) {
  const { categories, products, isLoading, error, retryLoading, addCategory } = useCategories(parentId);

  return (
    <>
      <CategoryForm parentId={parentId} disabled={isLoading || Boolean(error)} onCreated={addCategory} />
      <section aria-labelledby="categories-heading" aria-busy={isLoading} className="mt-10">
        <h2 id="categories-heading" className="mb-4 text-xl font-bold">
          {parentId === null ? 'Кореневі категорії' : categories.length > 0 ? 'Підкатегорії' : 'Товари'}
        </h2>
        {isLoading ? <p role="status" className="text-slate-500">Завантажуємо…</p> : error ? (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
            <p>{error}</p>
            <button type="button" className="mt-3 cursor-pointer font-semibold underline focus-visible:outline-2" onClick={retryLoading}>Спробувати ще раз</button>
          </div>
        ) : categories.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => <Category key={category.id} category={category} onOpen={onOpen} />)}
          </ul>
        ) : products.length > 0 ? (
          <ul className="grid gap-3 sm:grid-cols-2">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </ul>
        ) : <p role="status" className="text-slate-500">{parentId === null ? 'Категорій поки немає. Додай першу!' : 'У цій категорії поки немає підкатегорій і товарів.'}</p>}
      </section>
    </>
  );
}

function App() {
  const [path, setPath] = useState<CategoryModel[]>([]);
  const currentCategory = path.at(-1);
  const parentId = currentCategory?.id ?? null;

  function openCategory(category: CategoryModel) {
    setPath((previousPath) => [...previousPath, category]);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 font-sans text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Категорії</h1>
        <p className="mt-2 mb-6 text-slate-500">Обери категорію, щоб переглянути підкатегорії або товари.</p>
        <nav aria-label="Навігація категоріями" className="mb-6">
          <div className="mb-4 flex gap-4">
            <button type="button" disabled={path.length === 0} onClick={() => setPath((previousPath) => previousPath.slice(0, -1))} className="cursor-pointer font-semibold text-emerald-700 underline disabled:cursor-default disabled:opacity-40">← Назад</button>
            <button type="button" disabled={path.length === 0} onClick={() => setPath([])} className="cursor-pointer font-semibold text-emerald-700 underline disabled:cursor-default disabled:opacity-40">До кореневих категорій</button>
          </div>
          <ol className="flex flex-wrap gap-2 text-sm text-slate-600">
            <li>Кореневі категорії</li>
            {path.map((category) => <li key={category.id}><span aria-hidden="true"> / </span><span aria-current={category.id === parentId ? 'page' : undefined}>{category.name}</span></li>)}
          </ol>
        </nav>
        <h2 className="mb-4 text-2xl font-semibold">{currentCategory?.name ?? 'Усі категорії'}</h2>
        <CategoryLevel key={parentId ?? 'root'} parentId={parentId} onOpen={openCategory} />
      </div>
    </main>
  )
}

export default App
