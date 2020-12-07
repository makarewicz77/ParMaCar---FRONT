/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { CartApi } from "../api/cartApi";
import { Cart, CartLine } from "../models/cart";
import { UserContext } from "./UserContext";

export interface CartContextInterface {
  setCart: (obj: any) => void;
  addToCart: (quantity: number, product: number) => void;
  clearCart: () => void;
  deleteFromCart: (line_id: number) => void;
  getProductQuantity: (product_id: number) => number;
  getPriceGross: () => number;
  updateLine: (line_id: number, quantity: number) => void;
  count: number;
  lines: CartLine[];
}
export const CartContext = createContext<CartContextInterface>({
  setCart: () => {},
  addToCart: () => {},
  clearCart: () => {},
  deleteFromCart: () => {},
  getProductQuantity: () => 0,
  getPriceGross: () => 0,
  updateLine: () => {},
  count: 0,
  lines: [] as CartLine[],
});

type CartProviderProps = {};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({} as Cart);
  const { user, isLogged } = useContext(UserContext);
  const [lines, setLines] = useState<CartLine[]>([] as CartLine[]);
  const [count, setCount] = useState<number>(0);
  const [gross, setGross] = useState<number>(0);
  const addToCart = (quantity: number, product: number) => {
    const line: Partial<CartLine> = { quantity, product, cart: cart.id };
    CartApi.addToCart(line).then((res) => {
      setLinesAndCount(res.data.line);
      setGross(res.data.sum_gross);
    });
  };
  const clearCart = () => {
    CartApi.clearCart(cart.user).then((res) => {
      if (user)
        CartApi.getCart(user.id).then((res) => {
          setCart(res.data[0]);
          setLinesAndCount(res.data[0].line);
          setGross(res.data[0].sum_gross);
        });
    });
  };
  const setLinesAndCount = (data: any) => {
    setLines(data);
    setCount(data.length);
  };
  const deleteFromCart = (line_id: number) => {
    CartApi.removeFromCart(line_id).then((res) => {
      setLinesAndCount(res.data.line);
      setGross(res.data.sum_gross);
    });
  };
  const getProductQuantity = (product_id: number) => {
    const line = lines.find((line) => line.product === product_id);
    if (line) return line.quantity;
    else return 0;
  };
  const getPriceGross = () => {
    return gross;
  };
  const updateLine = (line_id: number, quantity: number) => {
    const lineToUpdate = lines.find((line) => line.id === line_id);
    if (lineToUpdate) {
      lineToUpdate.quantity = quantity;
      CartApi.updateCartLine(lineToUpdate).then((res) => {
        const tmpLines = [...lines];
        const ind = tmpLines.findIndex((tmp) => tmp.id === line_id);
        tmpLines[ind] = lineToUpdate;
        setLines(tmpLines);
        setGross(res.data.sum_gross);
      });
    }
  };
  useEffect(() => {
    if (isLogged && user)
      CartApi.getCart(user.id).then((res) => {
        setCart(res.data[0]);
        setLinesAndCount(res.data[0].line);
        setGross(res.data[0].sum_gross);
      });
    else if (!isLogged && !user) {
      //User not logged but has got cart in localStorage!!!!
    }
  }, [isLogged]);

  return (
    <CartContext.Provider
      value={{
        setCart,
        addToCart,
        clearCart,
        deleteFromCart,
        getProductQuantity,
        getPriceGross,
        updateLine,
        lines,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
