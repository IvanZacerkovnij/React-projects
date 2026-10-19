import { ProductList } from "./components/products/ProductList";
import { SearchBar } from "./components/search/SearchBar";
import { ProductProvider } from "./providers/ProductProvider";
function App() {
 return(
  <ProductProvider>
    <main className="min-h-screen min-w-80 bg-[radial-gradient(ellipse_at_top,#e2f4e9,#f1f5f9_65%)] p-6 font-sans text-gray-800">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Каталог товарів</h1>
        <SearchBar />
        <ProductList />
      </div>
    </main>
  </ProductProvider>
  )
}

export default App
