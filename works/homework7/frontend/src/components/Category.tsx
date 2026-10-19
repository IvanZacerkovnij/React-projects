import type { Category as CategoryModel } from '../types/Category';

export function Category({ category, onOpen }: { category: CategoryModel; onOpen: (category: CategoryModel) => void }) {
  return (
    <li>
      <button type="button" onClick={() => onOpen(category)} className="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm hover:border-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-700">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700">
        {category.id}
      </span>
      <h3 className="min-w-0 font-semibold break-words text-slate-800">{category.name}</h3>
      <span aria-hidden="true" className="ml-auto">→</span>
      </button>
    </li>
  );
}
