import { useCategoryContext } from './hooks/useCategoryContext';
import { CategoryLevel } from './components/CategoryLevel';
import { CategoryNavigation } from './components/CategoryNavigation';

function App() {
  const { currentCategory, parentId } = useCategoryContext();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 font-sans text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Категорії</h1>
        <p className="mt-2 mb-6 text-slate-500">Обери категорію, щоб переглянути підкатегорії або товари.</p>
        <CategoryNavigation />
        <h2 className="mb-4 text-2xl font-semibold">{currentCategory?.name ?? 'Усі категорії'}</h2>
        <CategoryLevel key={parentId ?? 'root'} />
      </div>
    </main>
  )
}

export default App
