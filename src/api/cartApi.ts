import axios from "axios";
import { CartLine } from "../models/cart";
import { getCookie } from "../utils/utils";
import { baseCartLineUrl, baseCartUrl } from "./urls";

export const CartApi = {
  getCart: (user: number, token: string) => {
    return axios.request({
      url: `${baseCartUrl}?user_id=${user}`,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  addToCart: (line: Partial<CartLine>) => {
    return axios.request({
      method: "POST",
      url: `${baseCartLineUrl}`,
      data: line,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  removeFromCart: (line_id: number) => {
    return axios.request({
      method: "DELETE",
      url: `${baseCartLineUrl}${line_id}/`,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  updateCartLine: (line: CartLine) => {
    return axios.request({
      method: "PUT",
      url: `${baseCartLineUrl}${line.id}/`,
      data: line,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  clearCart: (user_id: number) => {
    return axios.request({
      method: "DELETE",
      url: `${baseCartUrl}?user_id=${user_id}`,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
};
