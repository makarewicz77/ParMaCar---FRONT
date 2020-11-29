import axios from "axios";
import { CartLine } from "../models/cart";
import { baseCartLineUrl, baseCartUrl } from "./urls";

export const CartApi = {
  getCart: (user: number) => {
    return axios.request({
      url: `${baseCartUrl}?user_id=${user}`,
      method: 'GET',
    });
  },
  addToCart: (line: Partial<CartLine>) =>{
    return axios.request({
      method: 'POST',
      url: `${baseCartLineUrl}`,
      data: line
    })
  }
};
