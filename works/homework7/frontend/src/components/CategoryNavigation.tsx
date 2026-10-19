import { useCategoryContext } from '../hooks/useCategoryContext';

export function CategoryNavigation() {
  const { path, goBack, goToRoot } = useCategoryContext();
  const isRoot = path.length === 0;
  const currentCategoryId = path.at(-1)?.id;
  const buttonClassName = 'cursor-pointer font-semibold text-emerald-700 underline disabled:cursor-default disabled:opacity-40';

  return (
    <nav aria-label="Навігація категоріями" className="mb-6">
      <div className="mb-4 flex gap-4">
        <button type="button" disabled={isRoot} onClick={goBack} className={buttonClassName}>← Назад</button>
        <button type="button" disabled={isRoot} onClick={goToRoot} className={buttonClassName}>До кореневих категорій</button>
      </div>
      <ol className="flex flex-wrap gap-2 text-sm text-slate-600">
        <li>Кореневі категорії</li>
        {path.map((category) => (
          <li key={category.id}>
            <span aria-hidden="true"> / </span>
            <span aria-current={category.id === currentCategoryId ? 'page' : undefined}>{category.name}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
