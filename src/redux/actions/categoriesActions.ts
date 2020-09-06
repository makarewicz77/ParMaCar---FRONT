import { VCategory } from "../../views/Category/category";


export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategoryBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategorySuccess = (category: VCategory[]) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { category }
});

export const fetchCategoryFailure = (error: any) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
});