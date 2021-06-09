import Axios, { AxiosResponse } from "axios";
import axios from "axios";
import React from "react";
import { Detail, SpecificationLinks } from "../models/product";
import { baseProductsUrl } from "./urls";

export const ProductApi = {
  getAllProducts: (
    setProducts: Function,
    params?: {
      ordering?: string;
      price_to?: number;
      price_from?: number;
      category?: number;
    }
  ) => {
    axios
      .request({
        url: baseProductsUrl,
        params: { ...params },
        //TODO
        //headers: { Authorization: "Token " + token }, w przyszlosci token do bezpieczenstwa calej naszej aplikacji sie przyda
      })
      .then((res) => setProducts(res.data));
  },
  getProduct: (id: number, setProduct: Function) => {
    axios
      .request({
        url: `${baseProductsUrl}${id}/`,
        //TODO
        //headers: { Authorization: "Token " + token }, w przyszlosci token do bezpieczenstwa calej naszej aplikacji sie przyda
      })
      .then((res) => setProduct(res.data));
  },
  getSpecifications: (
    links: SpecificationLinks[],
    setSpecificationList: React.Dispatch<
      React.SetStateAction<Detail[] | undefined>
    >
  ) => {
    if (links) {
      const promises: Array<Promise<AxiosResponse<Detail>>> = [];
      links.forEach((link) => {
        promises.push(Axios.get<Detail>(link.link + "/"));
      });
      Axios.all(promises).then((response) => {
        setSpecificationList(response.map(res => res.data))
      });
    } else return undefined;
  },
};
