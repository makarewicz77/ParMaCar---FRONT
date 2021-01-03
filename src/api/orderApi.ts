import Axios from "axios";
import { Order } from "../models/order";
import { baseOrderUrl } from "./urls";

export const OrderApi = {
  sendOrder: (data: Partial<Order>) => {
    return Axios.request({
      method: "POST",
      data: {...data,cart:data.cart && data.cart.id},
      url: baseOrderUrl,
    });
  },
  getUserOrders: (id: number) => {
    return Axios.request({
      method: "GET",
      params: {
        user_id: id,
      },
      url: `${baseOrderUrl}`,
    });
  },
  cancelOrder: (id: number) => {
    return Axios.request({
      method: "DELETE",
      url: `${baseOrderUrl}${id}/`,
    });
  },
  getOrder: (id: number) => {
    return Axios.request({
      method: "GET",
      url: `${baseOrderUrl}${id}/`,
    });
  },
  getMechanicOrders: (id: number) => {
    return Axios.request({
      method: "GET",
      url: `${baseOrderUrl}`,
      params: {
        mechanic_id: id,
      },
    });
  },
  changeOrderStatus: (order: Order, status:string) => {
    return Axios.request({
      method: "PUT",
      url: `${baseOrderUrl}${order.id}/`,
      data: {...order, status},
    });
  },
};
