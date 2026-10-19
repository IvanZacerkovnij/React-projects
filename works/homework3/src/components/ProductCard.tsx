import { useState } from "react";
import type { Product } from "../types/Product";
import { AddToCartButton } from "./AddToCartButton";
import { GalleryButton } from "./GalleryButton";

export function ProductCard({ product } : { product: Product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function showPreviousImage() {
        setCurrentImageIndex((previousIndex) =>
            (previousIndex - 1 + product.media.length) % product.media.length
        );
    }

    function showNextImage() {
        setCurrentImageIndex((previousIndex) =>
            (previousIndex + 1) % product.media.length
        );
    }

    const discountedPrice =
        product.price * (1 - product.discountPercent / 100);

    return (
        <article className="product-card">
            {product.media.length > 0 && (
                <div className="product-gallery">
                    <img
                        src={product.media[currentImageIndex]}
                        alt={`${product.name} — фото ${currentImageIndex + 1}`}
                    />

                    {product.media.length > 1 && (
                        <div className="gallery-controls">
                            <GalleryButton direction="previous" onClick={showPreviousImage} />
                            <output aria-live="polite">
                                {currentImageIndex + 1} / {product.media.length}
                            </output>
                            <GalleryButton direction="next" onClick={showNextImage} />
                        </div>
                    )}
                </div>
            )}

            <h2>{product.name}</h2>

            <p>
                ⭐ {product.rating} · Відгуків: {product.reviewsCount}
            </p>

            {product.discountPercent > 0 && (
                <div>
                    <del>{product.price} грн</del>
                    <span> −{product.discountPercent}%</span>
                </div>
            )}

            <p>{discountedPrice.toFixed(2)} грн</p>

            <AddToCartButton />
        </article>
    );
}
