import type { Product } from "../types/Product";

export type CartItem = Product & { quantity: number };

function readItems<Item>(key: string): Item[] {
    const storedItems = localStorage.getItem(key);
    if (!storedItems) return [];

    const items: unknown = JSON.parse(storedItems);
    if (!Array.isArray(items)) {
        throw new Error("Некоректні збережені дані");
    }
    return items as Item[];
}

export function addToFavorites(product: Product): void {
    const favorites = readItems<Product>("favorites");
    if (favorites.some((item) => item.id === product.id)) return;

    localStorage.setItem("favorites", JSON.stringify([...favorites, product]));
}

export function addToCart(product: Product): void {
    const cart = readItems<CartItem>("cart");
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}
