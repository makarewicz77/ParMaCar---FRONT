import Axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CartApi } from "../api/cartApi";
import { baseProductsUrl } from "../api/urls";
import { Cart, CartLine } from "../models/cart";
import { Product } from "../models/product";
import { UserContext } from "./UserContext";

export interface CartContextInterface {
  setCart: (obj: any) => void;
  addToCart: (quantity:number, product:number) => void;
  count: number;
}
export const CartContext = createContext<CartContextInterface>({
  setCart: () => {},
  addToCart: () => {},
  count: 0
});

type CartProviderProps = {

}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({} as Cart);
  const  { user,isLogged } = useContext(UserContext);
  const [lines, setLines] = useState<CartLine[]>([] as CartLine[]);
  const [count, setCount] = useState<number>(0)
  const addToCart = (quantity:number, product: number) =>{
    const line: Partial<CartLine> = {quantity, product,cart:cart.id}
    CartApi.addToCart(line).then(res =>setLines(res.data))
  }
console.log(count);
  console.log(lines);
  useEffect(() => {
    if(isLogged && user)
      CartApi.getCart(user.id)
      .then(res => {
        setCart(res.data[0]);
        setLines(res.data[0].line)
        setCount(res.data[0].line.length)
      });
    else if(!isLogged && !user){
      //User not logged but has got cart in localStorage!!!!
    }
  }, [isLogged]);

  return (
    <CartContext.Provider
      value={{
        setCart,
        addToCart,
        count
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
