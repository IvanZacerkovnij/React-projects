import {ProductCard} from "./components/ProductCard.tsx";
import type {Product} from "./types/Product.ts";



const product: Product = {
    id: 1,
    name: "wireless headphones",
    price: 2500,
    media: [
        "/images/photoOne.jpg",
        "/images/photoTwo.jpg",
        "/images/photoThree.jpg"],
    reviewsCount: 10,
    rating: 4.2,
    discountPercent: 15,
}
function App() {
 return(
  <main className="grid min-h-screen min-w-80 place-items-center bg-[radial-gradient(ellipse_at_top,#e2f4e9,#f1f5f9_65%)] p-6 font-sans text-gray-800">
    <ProductCard product={product}/>
  </main>
  )
}

export default App
