import React, { useEffect } from 'react';
import { useState } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { ProductApi } from '../../../api/productApi';
import { Product } from '../../../models/product';
import Categories from '../../categories';
import ProductList from '../ProductList/ProductList';

import './styles.css';

type locationState = {
  id:number;
  category: string;
}

type props = RouteComponentProps<{}, {},  locationState >;

const ProductListView: React.FC<props> = ({location,history}) => {
  const [products, setProducts] = useState([] as Product[]);
  useEffect(() =>{
    ProductApi.getAllProducts(setProducts,{category:location.state.id})
  },[location.state.id])
  return (
    <div className="home_page">
    <div>Welcome! This is homepage</div>
    <div className="cat_list_div">
      <Categories />
    </div>
    <div className="prod_list_div">
      <ProductList products={products} />
    </div>
  </div>
  );
};

export default ProductListView;
