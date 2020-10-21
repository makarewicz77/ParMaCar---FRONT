import { Product } from "../../models/product";

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductSuccess = (product: Product[]) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { product },
});

export const fetchProductFailure = (error: any) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});
