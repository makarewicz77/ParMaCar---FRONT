import React from "react";
import { Product } from "../../../models/product";
import Loader from "react-loader-spinner";
import "./styles.scss";
import { Card, Col, Popover, Row } from "antd";
import { cutDescription, getImageUrl } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import noAvailable from "../../../static/noavailable.jpg";

type productsListProps = {
  products: Product[];
};

const fullDescription = (description: string) => {
  return (
    <div>
      <p>{description}</p>
    </div>
  );
};

const ProductList: React.FC<productsListProps> = ({ products }) => {
  const { t } = useTranslation("common");
  return (
    <>
      {products.length > 0 ? (
        <div>
          <Row className="products_list" gutter={16}>
            {products.map((product: Product) => {
              return (
                <div className="products_list-item" key={product.id}>
                  <Col className="products_list-item-col" span={8}>
                    <Card
                      style={{ width: 160 }}
                      cover={
                        <>
                          {product.image === null ? (
                            <img
                              alt="example"
                              src={noAvailable}
                              className="products_list-item-image"
                            />
                          ) : (
                            <img
                              alt="example"
                              src={getImageUrl(product.image)}
                              className="products_list-item-image"
                            />
                          )}
                          <h5 className="products_list-item-name">
                            {product.name}
                          </h5>
                        </>
                      }
                    >
                      {product.description.length > 55 ? (
                        <Popover content={fullDescription(product.description)}>
                          <div>
                            <p className="products_list-item-producer">
                              {product.producer}
                            </p>
                            <p className="products_list-item-short_description">
                              {cutDescription(product.description)}
                            </p>
                          </div>
                        </Popover>
                      ) : (
                        <div
                          className={
                            product.description.length > 16
                              ? "product_div_long"
                              : "product_div_short"
                          }
                        >
                          <p className="products_list-item-producer">
                            {product.producer}
                          </p>
                          <p className="products_list-item-short_description">
                            {product.description}
                          </p>
                        </div>
                      )}
                      <h5 className="products_list-item-price">
                        {product.gross} {t("product.value")}
                      </h5>
                    </Card>
                  </Col>
                </div>
              );
            })}
          </Row>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductList;
