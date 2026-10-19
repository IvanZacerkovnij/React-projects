import { createContext } from "react";
import type { Product } from "../types/Product";

type ProductContextValue = {
    products: Product[];
    searchProducts: (query: string) => void;
};

export const ProductContext = createContext<ProductContextValue | undefined>(undefined);
