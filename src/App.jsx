import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import {Toaster} from "react-hot-toast"
import Footer from "./components/Footer"
import { useAppContext } from "./context/AppContext"
import Login from "./components/Login"
import AllProducts from "./pages/AllProduct"
import ProductCategory from "./pages/ProductCategory"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"


const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin} = useAppContext()
  return (
    <div>
      {isSellerPath ? null :  <Navbar/> }
      {showUserLogin ? <Login/>:null}
       
       <Toaster/>
      <div className={`${isSellerPath ? "" : "px-6 md:px-12 lg:px-18 xl:px-28"}`}>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/products' element={<AllProducts/>}/>
           <Route path='/products/:category' element={<ProductCategory/>}/>
            <Route path='/products/:category/:id' element={<ProductDetails/>}/>
             <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </div>
      {!isSellerPath&&<Footer/>}

    </div>
  )
}

export default App