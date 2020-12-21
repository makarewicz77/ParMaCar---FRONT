import Axios from "axios";
import { Order } from "../models/order";
import { baseOrderUrl } from "./urls";

export const OrderApi = {
  sendOrder: (data: Partial<Order>) => {
    return Axios.request({
      method: 'POST',
      data: data,
      url: baseOrderUrl
    });
  },
};
