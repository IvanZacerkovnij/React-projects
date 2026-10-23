export type Category = { id: string; name: string }
export type Product = { id: string; name: string; description: string | null; price: number; categoryId: string }
export type CategoryValues = { name: string }
export type ProductValues = { name: string; description: string; price: number; categoryId: string }
