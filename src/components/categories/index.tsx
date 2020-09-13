import React, { useState, useEffect } from 'react';
import './styles.css';
import { Router } from 'react-router-dom';
import { type } from 'os';
import Item from 'antd/lib/list/Item';
import { strict } from 'assert';
import axios from 'axios';
import { VCategory } from '../../views/Category/category';
import categoriesReducer, { fetchCategories, initialCategoriesState } from '../../redux/reducers/categoriesReducer';

type catProps = {
  id?: number,
  name?: string
}

const Categories: React.FC<catProps> = () => {

  const [categories, dispatch] = React.useReducer(
    categoriesReducer,
    initialCategoriesState
  );

  useEffect(() => {
    const onLoad = () => {
      fetchCategories()(dispatch);
    };

    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
    }

  }, []);

  const createCatList = (catList: VCategory[]) =>
    catList
      .map((c: any) => {
        if (c.parent_id == null) {
          return (
            <>
              <h4 id={c.id}>
                {c.name}
              </h4>
            </>
          )
        } else {
          return (
            <>
              <h4 id={c.id}>
                {c.name}
              </h4>
            </>
          )
        }
      })

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
