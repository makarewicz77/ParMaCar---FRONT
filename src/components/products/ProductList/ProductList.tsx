import React from "react";
import { Product } from "../../../models/product";
import Loader from "react-loader-spinner";
import "./styles.scss";
import { Card, Col, Popover, Row } from "antd";
import { cutDescription, getImageUrl } from "../../../utils/utils";
import { useTranslation } from "react-i18next";
import noAvailable from "../../../static/images/noavailable.jpg";
import { RouteComponentProps, withRouter } from "react-router-dom";
import slugify from "react-slugify";
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

export const fullPriceDetails = (vat: number, net: number) => {
  return (
    <div className="products_list-item_detail-price">
      <p>
        <strong>Cena netto:</strong> {net}
      </p>
      <p>
        <strong>VAT:</strong> {vat} %
      </p>
    </div>
  );
};

const ProductList: React.FC<productsListProps & RouteComponentProps> = ({
  products,
  history,
}) => {
  const { t } = useTranslation("common");
  const goToProduct = (product: Product) => {
    history.push(`/product/${slugify(product.name)}/${product.id}/`, {
      id: product.id,
    });
  };
  return (
    <>
      {products.length > 0 ? (
        <div className="products_list-container">
          <Row className="products-list" gutter={16}>
            {products.map((product: Product) => {
              return (
                <div className="products_list-item" key={product.id}>
                  <Col className="products_list-item-col" span={8}>
                    <Card
                      style={{
                        width: "170px",
                        border: "1px solid rgba(128,128,128,0.8)",
                      }}
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
                      onClick={() => goToProduct(product)}
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
                      <Popover
                        content={fullPriceDetails(product.vat, product.net)}
                        title={t("product.priceDetails")}
                      >
                        <h5 className="products_list-item-price">
                          {product.gross} {t("product.value")}
                        </h5>
                      </Popover>
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

export default withRouter(ProductList);
