/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { CartApi } from "../api/cartApi";
import { Cart, CartLine } from "../models/cart";
import { UserContext } from "./UserContext";

export interface CartContextInterface {
  setCart: (obj: any) => void;
  getCart: Cart;
  addToCart: (quantity: number, product: number) => void;
  clearCart: (logout: boolean) => void;
  deleteFromCart: (line_id: number) => void;
  getProductQuantity: (product_id: number) => number;
  getCartResponse: () => void;
  getPriceGross: () => number;
  getPriceNet: () => number;
  updateLine: (line_id: number, quantity: number) => void;
  count: number;
  lines: CartLine[];
}
export const CartContext = createContext<CartContextInterface>({
  setCart: () => {},
  getCart: {} as Cart,
  addToCart: () => {},
  clearCart: () => {},
  deleteFromCart: () => {},
  getProductQuantity: () => 0,
  getCartResponse: () => {},
  getPriceGross: () => 0,
  getPriceNet: () => 0,
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
  const [net, setNet] = useState<number>(0);
  const addToCart = (quantity: number, product: number) => {
    const line: Partial<CartLine> = { quantity, product, cart: cart.id };
    CartApi.addToCart(line).then((res) => {
      setLinesAndCount(res.data.line);
      setGross(res.data.sum_gross);
      setNet(res.data.sum_net);
    });
  };
  const clearCart = (logout: boolean) => {
    if (!logout) {
      CartApi.clearCart(cart.user).then((res) => {
        if (user)
          CartApi.getCart(user.id).then((res) => {
            setCart(res.data[0]);
            setLinesAndCount(res.data[0].line);
            setGross(res.data[0].sum_gross);
            setNet(res.data[0].sum_net);
          });
      });
    }
    if (logout) {
      setCart({} as Cart);
      setLinesAndCount([]);
      setGross(0);
      setNet(0);
    }
  };
  const setLinesAndCount = (data: any) => {
    setLines(data);
    setCount(data.length);
  };
  const deleteFromCart = (line_id: number) => {
    CartApi.removeFromCart(line_id).then((res) => {
      setLinesAndCount(res.data.line);
      setGross(res.data.sum_gross);
      setNet(res.data.sum_net);
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
  const getPriceNet = () => {
    return net;
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
        setNet(res.data.sum_net);
      });
    }
  };
  const getCartResponse = () => {
    if (isLogged && user)
      CartApi.getCart(user.id).then((res) => {
        setCart(res.data[0]);
        setLinesAndCount(res.data[0].line);
        setGross(res.data[0].sum_gross);
        setNet(res.data[0].sum_net);
      });
  };
  useEffect(() => {
    getCartResponse();
  }, [isLogged]);

  return (
    <CartContext.Provider
      value={{
        setCart,
        getCart: cart,
        getCartResponse,
        addToCart,
        clearCart,
        deleteFromCart,
        getProductQuantity,
        getPriceGross,
        getPriceNet,
        updateLine,
        lines,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
