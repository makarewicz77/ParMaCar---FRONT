import React, { useEffect, useReducer } from "react";
import "./styles.css";
import { Category } from "../../models/category";
import categoriesReducer, {
  fetchCategories,
  initialCategoriesState,
} from "../../redux/reducers/categoriesReducer";

type catProps = {
  id?: number;
  name?: string;
};

const Categories: React.FC<catProps> = () => {
  const [categories, dispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );

  useEffect(() => {
    const onLoad = () => {
      fetchCategories()(dispatch);
    };

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const createCatList = (catList: Category[]) =>
    catList.map((c: any) => {
      if (c.parent_id == null) {
        return (
          <>
            <h4 id={c.id}>{c.name}</h4>
          </>
        );
      } else {
        return (
          <>
            <h4 id={c.id}>{c.name}</h4>
          </>
        );
      }
    });

  return (
    <>
      <h1>Categories</h1>
      <hr />
      {createCatList(categories.category)}
      <hr />
    </>
  );
};

export default Categories;
