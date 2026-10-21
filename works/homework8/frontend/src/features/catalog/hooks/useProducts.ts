import { useContext } from "react";
import { ProductsContext } from "../model/ProductsContext";
import type { ProductsContextType } from "../model/ProductsContext";

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);

    if (!context) {
        throw new Error("useProducts must be used inside ProductsProvider");
    }

    return context;
};
