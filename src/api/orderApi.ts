import Axios from "axios";
import { Order } from "../models/order";
import { getCookie } from "../utils/utils";
import { baseOrderUrl } from "./urls";

export const OrderApi = {
  sendOrder: (data: Partial<Order>, token: string) => {
    return Axios.request({
      method: "POST",
      data: { ...data, cart: data.cart && data.cart.id },
      url: baseOrderUrl,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },
  getUserOrders: (id: number) => {
    return Axios.request({
      method: "GET",
      params: {
        user_id: id,
      },
      url: `${baseOrderUrl}`,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  cancelOrder: (id: number) => {
    return Axios.request({
      method: "DELETE",
      url: `${baseOrderUrl}${id}/`,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  getOrder: (id: number) => {
    return Axios.request({
      method: "GET",
      url: `${baseOrderUrl}${id}/`,
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  getMechanicOrders: (id: number) => {
    return Axios.request({
      method: "GET",
      url: `${baseOrderUrl}`,
      params: {
        mechanic_id: id,
      },
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
  changeOrderStatus: (order: Order, status: string) => {
    return Axios.request({
      method: "PUT",
      url: `${baseOrderUrl}${order.id}/`,
      data: { ...order, status },
      headers: {
        Authorization: `Token ${getCookie("token")}`,
      },
    });
  },
};
