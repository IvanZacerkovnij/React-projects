import { useState } from "react";
import type { ReactNode } from "react";
import { products } from "../mock/products";
import { ProductContext } from "./ProductContext";

export function ProductProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState("");
    const normalizedQuery = query.trim().toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(normalizedQuery)
    );

    return (
        <ProductContext.Provider value={{ products: filteredProducts, searchProducts: setQuery }}>
            {children}
        </ProductContext.Provider>
    );
}
