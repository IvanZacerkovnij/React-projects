import { useState, type ReactNode } from "react";
import { ProductsContext } from "./ProductsContext";
import productsData from "./products";
import type { ProductType } from "./ProductType";

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<ProductType[]>(productsData);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
