import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export function ProductList() {
    const { products } = useProducts();

    return (
        <section aria-label="Результати пошуку">
            <p role="status" className="mb-4 text-sm text-slate-600">
                {products.length > 0 ? `Знайдено товарів: ${products.length}` : "Нічого не знайдено"}
            </p>
            <div className="grid auto-rows-fr items-stretch justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        </section>
    );
}
