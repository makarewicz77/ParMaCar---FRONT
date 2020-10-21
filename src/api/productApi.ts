import axios from "axios";
import { baseProductsUrl } from "./urls";

export const ProductApi = {
  getAllProducts: (setProducts: Function) => {
    axios
      .request({
        url: baseProductsUrl,
        //TODO
        //headers: { Authorization: "Token " + token }, w przyszlosci token do bezpieczenstwa calej naszej aplikacji sie przyda
      })
      .then((res) => setProducts(res.data));
  },
};
