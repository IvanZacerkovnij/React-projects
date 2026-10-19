import './App.css'
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
  <>
    <ProductCard product={product}/>
  </>
  )
}

export default App
