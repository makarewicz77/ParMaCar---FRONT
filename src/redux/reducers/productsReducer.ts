import {
  fetchProductFailure,
  fetchProductsBegin,
  fetchProductSuccess,
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
} from "../actions/productsActions";
import axios from "axios";
import { Product } from "../../models/product";
import { baseProductsUrl } from "../../api/urls";

export const initialProductsState = {
  error: null,
  product: [],
  loading: false,
};

export function fetchProducts() {
  return (dispatch: any) => {
    dispatch(fetchProductsBegin());
    axios
      .get<Product[]>(baseProductsUrl)
      .then((res) => res.data)
      .then((res) => dispatch(fetchProductSuccess(res)))
      .catch((error) => dispatch(fetchProductFailure(error)));
  };
}

export default function productsReducer(
  state = initialProductsState,
  action: any
) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
