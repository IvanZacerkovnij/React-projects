import { useContext } from "react";
import { ProductContext } from "../providers/ProductContext";

export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts потрібно використовувати всередині ProductProvider");
    }
    return context;
}
