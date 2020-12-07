/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("common");
  const { Option } = Select;
  const [products, setProducts] = useState([] as Product[]);
  const [category, setCategory] = useState({} as Category);
  const [productsRed, dispatchPr] = useReducer(
    productsReducer,
    initialProductsState
  );
  const [sort, setSort] = useState<string>("");
  const [categoryRed, dispatchCat] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );
  const sortChange = (value: string) => {
    if (value === "name_up") setSort("name");
    else if (value === "name_down") setSort("-name");
    else if (value === "price_up") setSort("gross");
    else setSort("-gross");
  };
  useEffect(() => {
    setCategory({} as Category);
    setProducts([]);
    if(location.state)
    {
    fetchProducts({ category: location.state.id, ordering: "name" })(
      dispatchPr
    );
    fetchCategory(location.state.id)(dispatchCat);
    }
    else{
      fetchProducts({ordering:"name"})(dispatchPr)
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
  useEffect(() => {
    if (sort !== "")
      fetchProducts({ category: location.state.id, ordering: sort })(
        dispatchPr
      );
  }, [sort]);

  return (
    <div>
      <div className="category-baner">
        <div className="category-baner__name">
          {!categoryRed.loading && Object.keys(category).length > 0 ?  (
            <p className="category-baner__name-content">{category.name}</p>
          ) :  (
            <p className="category-baner__name-content">{t('allProducts')}</p>
          )}
        </div>
      </div>

      <div className="category-list">
        <Categories />
      </div>
      <div className="products-counter">
        <p>
          {t("product.amount")}:{" "}
          <strong>{products.length ? products.length : ""}</strong>
        </p>
      </div>
      <div className="products-sort">
        <p>{t("product.sortBy")}:</p>
        <div className="products-sort__select">
          <Select
            defaultValue="name_up"
            style={{ width: 150 }}
            onChange={sortChange}
          >
            <Option value="name_up">
              <ArrowUpOutlined /> Nazwa rosnąco
            </Option>
            <Option value="name_down">
              <ArrowDownOutlined /> Nazwa malejąco
            </Option>
            <Option value="price_up">
              <ArrowUpOutlined /> Cena rosnąco
            </Option>
            <Option value="price_down">
              <ArrowDownOutlined /> Cena malejąco
            </Option>
          </Select>
        </div>
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
