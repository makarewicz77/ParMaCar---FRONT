import React from "react";
import ProductView from "../../views/ProductView";
import "./styles.css";

const Products: React.FC = () => {
  return (
    <>
      <h1>Products</h1>
      <div className="prod_container">
        <ProductView />
      </div>
    </>
  );
};

export default Products;
