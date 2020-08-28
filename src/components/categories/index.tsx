import React from 'react';
import './styles.css';

let cat_list = [];

type catProps = {
  id: number,
  name: string,
  parent_id?: number
};

const categories: React.FC = () => {

  const fetchCategories = async () => {
    await fetch("http://127.0.0.1:8000/api/categories/?format=json")
      .then(res => res.json())
      .then(res => ({
          cat_list: res,
        }),
      )
      .catch(error => console.log(error))
  }

  return (
    <>
      <h1>categories</h1>
    </>
  );
};

export default categories;
