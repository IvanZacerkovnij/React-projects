import { useState } from "react";
import type { Product } from "../types/Product";
import { AddToCartButton } from "./AddToCartButton";
import { GalleryButton } from "./GalleryButton";
import { FavoriteButton } from "./FavoriteButton";
import { addProductToCartWithFeedback, addProductToFavoritesWithFeedback } from "../utils/productActions";
import { getNextImageIndex, getPreviousImageIndex } from "../utils/productGallery";

export function ProductCard({ product } : { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [message, setMessage] = useState("");

    const discountedPrice =
        product.price * (1 - product.discountPercent / 100);

    return (
        <article className="w-full max-w-[390px] rounded-3xl border border-gray-200 bg-white p-6 shadow-xl">
            {product.media.length > 0 && (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <img
                        className="block h-60 w-full rounded-lg object-contain"
                        src={product.media[currentImageIndex]}
                        alt={`${product.name} — фото ${currentImageIndex + 1}`}
                    />

                    {product.media.length > 1 && (
                        <div className="mt-3 flex items-center justify-center gap-4 p-1">
                            <GalleryButton direction="previous" onClick={() =>
                                setCurrentImageIndex((index) => getPreviousImageIndex(index, product.media.length))
                            } />
                            <output className="min-w-10 text-center text-sm text-gray-500 tabular-nums" aria-live="polite">
                                {currentImageIndex + 1} / {product.media.length}
                            </output>
                            <GalleryButton direction="next" onClick={() =>
                                setCurrentImageIndex((index) => getNextImageIndex(index, product.media.length))
                            } />
                        </div>
                    )}
                </div>
            )}

            <h2 className="mt-5 mb-3 text-[22px] leading-tight font-bold tracking-tight">{product.name}</h2>

            <p className="my-3.5 text-sm leading-relaxed text-gray-500">
                ⭐ {product.rating} · Відгуків: {product.reviewsCount}
            </p>

            {product.discountPercent > 0 && (
                <div>
                    <del className="text-gray-400">{product.price} грн</del>
                    <span className="ml-2 inline-block rounded-md bg-red-100 px-2 py-1 text-[13px] font-bold text-red-700"> −{product.discountPercent}%</span>
                </div>
            )}

            <p className="mt-3 mb-5 text-[28px] leading-relaxed font-bold text-gray-900">{discountedPrice.toFixed(2)} грн</p>

            <div className="flex items-center gap-3">
                <FavoriteButton onClick={() => setMessage(addProductToFavoritesWithFeedback(product))} />
                <AddToCartButton onClick={() => setMessage(addProductToCartWithFeedback(product))} />
            </div>
            <p role="status" className="mt-3 min-h-5 text-sm text-gray-600">{message}</p>
        </article>
    );
}
