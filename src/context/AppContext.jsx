import { createContext, useState , useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
    const fetchProducts = async()=>{
        setProducts(dummyProducts)
    }

    const addToCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1
        }
        else{
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success("Added to Cart")
    }

    const updateCartItem = (itemId, quantity) =>{
            let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity;
            setCartItems(cartData)
            toast.success("Cart Updated")
    }

    const removeFromCart = (itemId) =>{
         let cartData = structuredClone(cartItems)
         if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] === 0){
                 delete cartData[itemId]
            }
         }
         toast.success("Removed from Cart")
         setCartItems(cartData)
    }

    const getCartCount = () =>{
        let totalCount =0;
        for(const item in cartItems){
            totalCount +=cartItems[item]
        }
        return totalCount;
    }

    const getCartAmount = () =>{
        let totalAmount =0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items )
            if(cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount*100) /100;
    }

    useEffect(()=>{
        fetchProducts()
    }, [])

    const value={addToCart, getCartAmount,getCartCount, searchQuery,setSearchQuery, removeFromCart,cartItems, updateCartItem, navigate, user, setUser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency}
    return <AppContext.Provider value={value}>
              {children}
           </AppContext.Provider>
}

export const  useAppContext = () =>{
    return useContext(AppContext)
}