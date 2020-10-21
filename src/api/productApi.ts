import axios from "axios";
import { baseProdutsUrl } from "./urls";

export const ProductApi = {
  getAllProducts: (setProducts: Function) => {
    axios
      .request({
        url: baseProdutsUrl,
        //TODO
        //headers: { Authorization: "Token " + token }, w przyszlosci token do bezpieczenstwa calej naszej aplikacji sie przyda
      })
      .then((res) => setProducts(res.data));
  },
};
