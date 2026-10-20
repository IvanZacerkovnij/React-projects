import { useEffect, useState } from "react";
import { useParams } from "react-router";

import type { CategoryType } from "@/types/CategoryType";
import Category from "@/components/categories/Category";
import Categories from "@/utils/Category";
import Products from "@/utils/Product";
import type {ProductType} from "@/types/ProductType.ts";
import Product from "@/components/product/Product";
import Pagination from "@/components/categories/Pagination";

const PAGE_SIZE = 8;

const CategoryContent = ({ id }: { id?: string }) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(categories.length / PAGE_SIZE);
    const currentPage = Math.min(page, Math.max(1, totalPages));
    const visibleCategories = categories.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    useEffect(() => {
        let cancelled = false;
        const loadCategories = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await Categories.GetAllCategories();
                if (cancelled) return;

                if (data) {
                    setProducts([]);
                    setCategories(
                        data.filter(category => category.parentId === null)
                    );
                }
            }
            catch {
                if (!cancelled) setError("Не вдалося завантажити категорії. Перевір, чи запущений бекенд.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        const loadSubCategories = async (categoryId: number) => {
            setLoading(true);
            setError("");

            try {
                const data = await Categories.GetSubCategoryById(categoryId);
                if (cancelled) return;

                if (data && data.length > 0) {
                    setProducts([]);
                    setCategories(data);
                } else {
                    const products = await Products.GetProductsByCategoryId(categoryId);
                    if (cancelled) return;
                    setCategories([]);
                    setProducts(products ?? []);
                }
            } catch {
                if (!cancelled) setError("Не вдалося завантажити дані категорії. Перевір, чи запущений бекенд.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        if (id) {
            loadSubCategories(Number(id));
        } else {
            loadCategories();
        }
        return () => { cancelled = true; };

    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) return <p role="alert" className="text-red-600">{error}</p>;

    if (categories.length === 0 && products.length === 0) {
        return <p role="status">{id ? "У цій категорії поки немає підкатегорій і товарів." : "Категорій поки немає."}</p>;
    }

    return (
        <>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {visibleCategories.map(category => (
                <Category
                    key={category.id}
                    category={category}
                />
            ))}

            {products.map(product => (
                <Product
                    key={product.id}
                    product={product}
                />
            ))}

        </div>
        {categories.length > 0 && (
            <p role="status" className="mt-6 text-center text-sm text-gray-600">
                Категорії {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, categories.length)} з {categories.length}
            </p>
        )}
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
    );
};

const CategoriesList = () => {
    const { id } = useParams();
    return <CategoryContent key={id ?? "root"} id={id} />;
};

export default CategoriesList;
