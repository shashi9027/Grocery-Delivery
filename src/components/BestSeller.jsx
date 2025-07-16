import { useAppContext } from "../context/AppContext"
import ProductCard from "./ProductCard"

const BestSeller = () => {
  const {products} = useAppContext()
  return (
    <div className="mt-16">
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-6">
          {products?.filter((product)=> product.inStock).slice(0,5).map((product, index)=> (<ProductCard key={index} product={product}/>))}
         
        </div>
    </div>
  )
}

export default BestSeller