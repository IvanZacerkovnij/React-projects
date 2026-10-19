import { useState } from "react";
import type { FormEvent } from "react";
import { useProducts } from "../../hooks/useProducts";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const { searchProducts } = useProducts();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        searchProducts(query);
    }

    return (
        <form onSubmit={handleSubmit} role="search" className="mb-8 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
            <label htmlFor="product-search" className="sr-only">Назва товару</label>
            <input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Я шукаю…"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 focus-visible:outline-2 focus-visible:outline-green-700"
            />
            <button type="submit" className="cursor-pointer rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700">
                Знайти
            </button>
        </form>
    );
}
