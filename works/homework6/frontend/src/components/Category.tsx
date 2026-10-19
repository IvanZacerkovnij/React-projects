import type { Category as CategoryModel } from '../types/Category';

export function Category({ category }: { category: CategoryModel }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700">
        {category.id}
      </span>
      <h3 className="min-w-0 font-semibold break-words text-slate-800">{category.name}</h3>
    </li>
  );
}
