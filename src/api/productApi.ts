import axios from "axios";
import { baseProductsUrl } from "./urls";

export const ProductApi = {
  getAllProducts: (setProducts: Function, params?:{ordering?:string,price_to?:number, price_from?:number,category?:number }) => {
    axios
      .request({
        url: baseProductsUrl,
        params: {...params},
        //TODO
        //headers: { Authorization: "Token " + token }, w przyszlosci token do bezpieczenstwa calej naszej aplikacji sie przyda
      })
      .then((res) => setProducts(res.data));
  },
};
