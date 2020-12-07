/* eslint-disable react-hooks/exhaustive-deps */
import {
  Breadcrumb,
  Button,
  Card,
  InputNumber,
  message,
  Modal,
  Popover,
  Table,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { ProductApi } from "../../../api/productApi";
import { environment } from "../../../environment";
import { Product } from "../../../models/product";
import Categories from "../../categories";
import noAvailable from "../../../static/images/noavailable.jpg";
import "./styles.scss";
import {
  getImageUrl,
  getLinkToCategory,
  getLinkToProduct,
  getWarranty,
} from "../../../utils/utils";
import Loader from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { fullPriceDetails } from "../ProductList/ProductList";
import { CartContext } from "../../../contexts/CartContext";

type locationState = {
  id: number;
};

type productProps = RouteComponentProps<{}, {}, locationState>;

const ProductView: React.FC<productProps> = ({ location, history }) => {
  const id = location.state
    ? location.state.id
    : Number(history.location.pathname.split("/")[3]);
  const imgSrc = (src: string) => {
    return `${environment.apiToImages}${src}`;
  };
  const { t } = useTranslation("common");
  const columns = [
    {
      title: "Specyfikacja",
      dataIndex: "key",
      render: (key: string) => <strong>{key}</strong>,
    },
    {
      title: "Wartość",
      dataIndex: "value",
    },
  ];
  const [product, setProduct] = useState({} as Product);
  const productDisplay = Object.keys(product).length > 0;
  const [quantity, setQuantity] = useState<number>(0);
  const setQuantityToCart = (e: string | number | undefined) => {
    setQuantity(Number(e));
  };
  const { addToCart, getProductQuantity, lines, updateLine } = useContext(
    CartContext
  );
  const addToCartClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    if (quantity > 0) {
      if (quantityInCart === 0) {
        addToCart(quantity, product.id);
        setCartModal(true);
      } else {
        const line = lines.find((line) => (line.product = product.id));
        if (line) {
          updateLine(line.id, quantity + line.quantity);
          setCartModal(true);
        }
      }
    } else message.info("Nie możesz dodać ilości produktu: 0");
  };
  const [cartModal, setCartModal] = useState(false);
  const handleCancel = () => {
    setCartModal(false);
  };
  const [quantityInCart, setQuantityInCart] = useState<number>(0);
  useEffect(() => {
    ProductApi.getProduct(id, setProduct);
    setQuantity(getProductQuantity(id));
    setQuantityInCart(getProductQuantity(id));
  }, [id]);
  useEffect(() => {
    if (lines && id) {
      setQuantityInCart(getProductQuantity(id));
    }
  }, [lines.length]);
  const footer = (
    <div className="footer-content">
      <Button onClick={() => history.push(`/cart`)}>
        {t("product.goToCart")}
      </Button>
      <Button onClick={() => setCartModal(false)}>
        {t("product.backToShopping")}
      </Button>
    </div>
  );
  return (
    <div className="container">
      <div className="container-categories">
        <Categories />
      </div>
      {productDisplay ? (
        <div className="product-description">
          <div>
            <Breadcrumb>
              <Link to="/">
                <Breadcrumb.Item>
                  {" "}
                  <p className="text">
                    <HomeOutlined /> {t("homePage")}
                  </p>
                </Breadcrumb.Item>
              </Link>

              <Breadcrumb.Item>
                <a
                  href={getLinkToCategory(
                    product.category_id,
                    product.category_name
                  )}
                >
                  <p className="text">{product.category_name}</p>
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href={getLinkToProduct(product.id, product.name)}>
                  <p className="text">{product.name}</p>
                </a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="product-description__column">
            <img
              src={product.image ? imgSrc(product.image) : noAvailable}
              alt={product.name}
              className="product-description__image"
            />
          </div>
          <div className="product-description__column-2">
            <h1>{product.name}</h1>
            <h2 className="product-description__column-2__producer">
              {product.producer}
            </h2>
            <h3>
              {t("product.priceGross")}: {product.gross} {t("product.value")}
            </h3>
            <h3 className="product-description__column-2__net">
              {t("product.priceNet")}: {product.net} {t("product.value")}
            </h3>
            <h4>{product.description}</h4>
            <h4>
              {t("product.warranty")}:{" "}
              <strong>{getWarranty(t, product.warranty)}</strong>{" "}
            </h4>
            <div style={{ alignItems: "baseline", display: "flex" }}>
              <InputNumber
                min={0}
                max={product.quantity - quantityInCart}
                onChange={setQuantityToCart}
                defaultValue={0}
              />
              <p> z {product.quantity} sztuk</p>
              <Button onClick={addToCartClick}>
                <ShoppingCartOutlined /> Dodaj do koszyka
              </Button>
            </div>
          </div>
          <div className="product-description__specification">
            <Table
              columns={columns}
              dataSource={product.specifications}
              size="small"
              locale={{ emptyText: t("product.noSpecification") }}
            />
          </div>

          <Modal
            visible={cartModal}
            title={
              <h3 className="product-modal__title">
                {t("product.successfullyAdded")}
              </h3>
            }
            okText={t("product.goToCart")}
            cancelText={t("product.backToShopping")}
            onCancel={handleCancel}
            closable={false}
            footer={footer}
          >
            <div className="modal-container">
              <Card
                style={{ width: 160, margin: "auto" }}
                cover={
                  <>
                    {product.image === null ? (
                      <img
                        alt="example"
                        src={noAvailable}
                        className="product-modal__image"
                      />
                    ) : (
                      <img
                        alt="example"
                        src={getImageUrl(product.image)}
                        className="product-modal__image"
                      />
                    )}
                    <h5 className="product-modal__name">{product.name}</h5>
                  </>
                }
              >
                <Popover
                  content={fullPriceDetails(product.vat, product.net)}
                  title="Szczegóły ceny"
                >
                  <h5 className="product-modal__price">
                    {product.gross} {t("product.value")}
                  </h5>
                </Popover>
              </Card>
            </div>
          </Modal>
        </div>
      ) : (
        <Loader color="#2000F0" width={1000} />
      )}
    </div>
  );
};

export default withRouter(ProductView);
