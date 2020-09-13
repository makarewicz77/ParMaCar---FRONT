import React from "react";
import "./styles.css";
import SearchTree from "../SearchTree";

type catProps = {
  id?: number;
  name?: string;
};

const Categories: React.FC<catProps> = () => {
  return (
    <>
      <h1>Categories</h1>
      <hr />
      <SearchTree />
      <hr />
    </>
  );
};

export default Categories;
