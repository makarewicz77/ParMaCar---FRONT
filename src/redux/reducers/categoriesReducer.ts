import {
  fetchCategoryBegin,
  fetchCategorySuccess,
  fetchCategoryFailure,
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/categoriesActions";
import axios from "axios";
import { Category } from "../../models/category";
import { baseCategoriesUrl } from "../../api/urls";

export const initialCategoriesState = {
  error: null,
  category: [],
  loading: false,
};

export function fetchCategories() {
  return (dispatch: any) => {
    dispatch(fetchCategoryBegin());
    axios
      .get<Category[]>(baseCategoriesUrl)
      .then((res) => res.data)
      .then((res) => dispatch(fetchCategorySuccess(res)))
      .catch((error) => dispatch(fetchCategoryFailure(error)));
  };
}

export function fetchCategory(id:number) {
  return (dispatch: any) => {
    dispatch(fetchCategoryBegin());
    axios
      .get<Category[]>(`${baseCategoriesUrl}${id}/`)
      .then((res) => res.data)
      .then((res) => dispatch(fetchCategorySuccess(res)))
      .catch((error) => dispatch(fetchCategoryFailure(error)));
  };
}
export default function categoriesReducer(
  state = initialCategoriesState,
  action: any
) {
  switch (action.type) {
    case FETCH_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload.category,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
