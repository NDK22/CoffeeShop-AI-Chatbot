import { createContext, useContext, useState } from "react";

type CartItems ={
    [key:string]: number
}
type CartContextType = {
    cartItems: CartItems;
    addToCart: (itemKey: string, quantity: number) => void;
    setQuantity: (itemKey: string, delta: number) => void;
    emptyCart: () => void
}

// Create a cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: React.ReactNode}) =>{

    const [cartItems, setCartItems] = useState<CartItems>({});

    const addToCart = (itemKey: string, quantity: number) => {
        setCartItems((prevCartItems) => {
            return {...prevCartItems, [itemKey]: (prevCartItems[itemKey] || 0) + quantity}
        })
    }

    const setQuantity = (itemKey: string, delta: number) => {
        setCartItems((prevCartItems) => {
            return {...prevCartItems, [itemKey]: Math.max((prevCartItems[itemKey] || 0) + delta, 0)            
            }
        })
    }

    const emptyCart = () => {
        setCartItems({});
    }

    return (
        <CartContext.Provider value={{cartItems, addToCart, setQuantity, emptyCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () : CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
 