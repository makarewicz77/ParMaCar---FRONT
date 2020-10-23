import React from "react";
import "./styles.css";
import SearchTree from "../../views/SearchTree";
import { Routes } from "../test/routes";

const Categories: React.FC = () => {
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
