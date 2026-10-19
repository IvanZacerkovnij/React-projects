import type { Product } from "../types/Product";

export const products: Product[] = [
    {
        id: 1,
        name: "wireless headphones",
        price: 2500,
        media: [
            "/images/photoOne.jpg",
            "/images/photoTwo.jpg",
            "/images/photoThree.jpg",
        ],
        reviewsCount: 10,
        rating: 4.2,
        discountPercent: 15,
    },
    {
        id: 2,
        name: "Bluetooth headphones Pro",
        price: 3200,
        media: ["/images/photoTwo.jpg"],
        reviewsCount: 18,
        rating: 4.7,
        discountPercent: 10,
    },
    {
        id: 3,
        name: "Wireless earbuds Mini",
        price: 1800,
        media: ["/images/photoThree.jpg"],
        reviewsCount: 7,
        rating: 4.5,
        discountPercent: 0,
    },
];
