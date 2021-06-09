import React from "react";
import { Product } from "../../../models/product";
import "./styles.scss";
import { Link } from "react-router-dom";
import slugify from "react-slugify";
import { Table } from "antd";
type productsListProps = {
  products: Product[];
};

const ProductList: React.FC<productsListProps> = ({ products }) => {
  const columns = [
    {
      title: "Id produktu",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nazwa produktu",
      dataIndex: "name",
      key: "name",
      render: (ind: string, prod: Product) => (
        <Link to={`/product/${slugify(prod.name)}/${prod.id}/`}>
          {prod.name}
        </Link>
      ),
    },
    {
      title: "Cena",
      dataIndex: "net",
      key: "net",
    },
  ];
  return <Table dataSource={products} columns={columns} />;
};

export default ProductList;
