import axios from "axios";
import { CartLine } from "../models/cart";
import { baseCartLineUrl, baseCartUrl } from "./urls";

export const CartApi = {
  getCart: (user: number) => {
    return axios.request({
      url: `${baseCartUrl}?user_id=${user}`,
      method: "GET",
    });
  },
  addToCart: (line: Partial<CartLine>) => {
    return axios.request({
      method: "POST",
      url: `${baseCartLineUrl}`,
      data: line,
    });
  },
  removeFromCart: (line_id: number) => {
    return axios.request({
      method: "DELETE",
      url: `${baseCartLineUrl}${line_id}/`,
    });
  },
  updateCartLine:(line:CartLine) =>{
    return axios.request({
      method: 'PUT',
      url: `${baseCartLineUrl}${line.id}/`,
      data: line
    })
  },
  clearCart:(user_id:number)=>{
    return axios.request({
      method:'DELETE',
      url: `${baseCartUrl}?user_id=${user_id}`,
    })
  }
};
