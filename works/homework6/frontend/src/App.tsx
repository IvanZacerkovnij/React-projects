import { useCategories } from './hooks/useCategories';
import { Category } from './components/Category';
import { CategoryForm } from './components/CategoryForm';

function App() {
  const { categories, isLoading, error, retryLoading, addCategory } = useCategories();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 font-sans text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Категорії</h1>
        <p className="mt-2 mb-8 text-slate-500">Додавай категорії та переглядай збережені.</p>
        <CategoryForm disabled={isLoading || Boolean(error)} onCreated={addCategory} />
        <section aria-labelledby="categories-heading" className="mt-10">
          <h2 id="categories-heading" className="mb-4 text-xl font-bold">Список категорій</h2>
          {isLoading ? <p role="status" className="text-slate-500">Завантажуємо категорії…</p> : error ? (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
              <p>{error}</p>
              <button type="button" className="mt-3 cursor-pointer font-semibold underline focus-visible:outline-2" onClick={retryLoading}>Спробувати ще раз</button>
            </div>
          ) : categories.length === 0 ? <p className="text-slate-500">Категорій поки немає. Додай першу!</p> : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => <Category key={category.id} category={category} />)}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
