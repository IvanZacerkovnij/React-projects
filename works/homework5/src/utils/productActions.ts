import type { Product } from "../types/Product";
import { addToCart, addToFavorites } from "./productStorage";

export function addProductToFavoritesWithFeedback(product: Product): string {
    try {
        addToFavorites(product);
        return "Товар в улюблених ❤️";
    } catch {
        return "Не вдалося зберегти улюблені. Перевір доступ до сховища браузера.";
    }
}

export function addProductToCartWithFeedback(product: Product): string {
    try {
        addToCart(product);
        return "Товар додано в кошик 🛒";
    } catch {
        return "Не вдалося зберегти кошик. Перевір доступ до сховища браузера.";
    }
}
