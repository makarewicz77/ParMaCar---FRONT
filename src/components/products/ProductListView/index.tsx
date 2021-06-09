/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import Loader from "react-loader-spinner";
import { RouteComponentProps } from "react-router-dom";
import { Category } from "../../../models/category";
import { Product } from "../../../models/product";
import categoriesReducer, {
  fetchCategory,
  initialCategoriesState,
} from "../../../redux/reducers/categoriesReducer";
import productsReducer, {
  fetchProducts,
  initialProductsState,
} from "../../../redux/reducers/productsReducer";
import Categories from "../../categories";
import ProductList from "../ProductList/ProductList";
import "./styles.scss";

type locationState = {
  id: number;
  category: string;
};

type props = RouteComponentProps<{}, {}, locationState>;

const ProductListView: React.FC<props> = ({ location }) => {
  const [products, setProducts] = useState([] as Product[]);
  const [category, setCategory] = useState({} as Category);
  const [productsRed, dispatchPr] = useReducer(
    productsReducer,
    initialProductsState
  );
  const [categoryRed, dispatchCat] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );
  useEffect(() => {
    setCategory({} as Category);
    setProducts([]);
    if (location.state) {
      fetchProducts({ category: location.state.id, ordering: "name" })(
        dispatchPr
      );
      fetchCategory(location.state.id)(dispatchCat);
    } else {
      fetchProducts({ ordering: "name" })(dispatchPr);
    }
  }, [location.state]);
  useEffect(() => {
    if (!productsRed.loading) {
      setProducts(productsRed.product);
    }
  }, [productsRed.loading]);
  useEffect(() => {
    setCategory(categoryRed.category);
  }, [categoryRed.loading]);

  return (
    <div>
      <div className="category-baner">
        <div className="category-baner__name">
          {!categoryRed.loading && Object.keys(category).length > 0 ? (
            <p className="category-baner__name-content">{category.name}</p>
          ) : (
            <p className="category-baner__name-content">Wszystkie produkty</p>
          )}
        </div>
      </div>

      <div className="category-list">
        <Categories />
      </div>
      <div className="products-counter">
        <p>
          Ilość produktów:{" "}
          <strong>{products.length ? products.length : ""}</strong>
        </p>
      </div>
      {!!products ? (
        <div className="prod_list_div">
          <ProductList products={products} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductListView;
