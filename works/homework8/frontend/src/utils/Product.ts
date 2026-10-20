import type {ProductType} from "@/types/ProductType.ts";

class Product {
    private static readonly path:string = import.meta.env.VITE_PATH_TO_SERVER
        + import.meta.env.VITE_PATH_TO_API
        + "product/";
    public static async GetProductsByCategoryId(id: number):Promise<ProductType[]|null> {
        const response = await fetch(
            Product.path + 'by-category/'+id
        );
        if (response.status === 404) return [];
        if (!response.ok) throw new Error(`Не вдалося завантажити товари (${response.status}).`);
        return await response.json();
    }
 }
export default Product;
