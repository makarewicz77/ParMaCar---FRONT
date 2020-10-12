import React, { useEffect, useReducer } from "react";
import { Product } from "../../models/product";
import productsReducer, {
  fetchProducts,
  initialProductsState,
} from "../../redux/reducers/productsReducer";

import "./styles.css";

const ProductView: React.FC = () => {
  const [products, dispatch] = useReducer(
    productsReducer,
    initialProductsState
  );

  useEffect(() => {
    const onLoad = () => {
      fetchProducts()(dispatch);
    };

    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <div className="prod_view_div">
        {products.product.map((item: Product) => {
          return (
            <>
              <h3>{item.name}</h3>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductView;
