import { Categories } from './components/Categories';

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 font-sans text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Категорії</h1>
        <p className="mt-2 mb-8 text-slate-500">Додавай категорії та переглядай збережені.</p>
        <Categories />
      </div>
    </main>
  )
}

export default App
