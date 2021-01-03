import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, InputNumber } from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { UserContext } from "../../../contexts/UserContext";
import { CartLine } from "../../../models/cart";
import noAvailable from "../../../static/images/noavailable.jpg";
import { getImageUrl, getLinkToProduct } from "../../../utils/utils";
import "./styles.scss";

const CartList: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    lines,
    count,
    deleteFromCart,
    getPriceGross,
    updateLine,
    clearCart,
  } = useContext(CartContext);
  const { isLogged } = useContext(UserContext);
  const { t } = useTranslation("common");
  const deleteLine = (line_id: number) => {
    deleteFromCart(line_id);
  };
  const setQuantityToCart = (
    id: number,
    value: string | number | undefined
  ) => {
    if (value === 0) deleteFromCart(id);
    else updateLine(id, Number(value));
  };
  const goToOrder = () => {
    history.push("/order/1/");
  };
  return (
    <div>
      <h1 className="cart-title">Twój koszyk</h1>
      <Divider />
      <div className="cart-list">
        {lines.length > 0 ? (
          lines.map((line: CartLine) => {
            const {
              id,
              product,
              product_image,
              product_name,
              product_gross,
              quantity,
              available_quantity,
            } = line;
            const linkToProduct = getLinkToProduct(product, product_name);
            return (
              <div className="cart-list__line" key={id}>
                {!product_image ? (
                  <Link
                    to={{ pathname: linkToProduct, state: { id: product } }}
                  >
                    <img
                      alt="example"
                      src={noAvailable}
                      className="cart-list__line-image"
                    />
                  </Link>
                ) : (
                  <Link to={linkToProduct}>
                    {" "}
                    <img
                      alt="example"
                      src={getImageUrl(product_image)}
                      className="cart-list__line-image"
                    />
                  </Link>
                )}
                <div className="cart-list__line-detail">
                  <p className="cart-list__line-detail__name">
                    <Link to={linkToProduct}>{product_name}</Link>
                  </p>
                  <p className="cart-list__line-detail__price">
                    {product_gross} {t("product.value")}
                  </p>
                </div>
                <div className="cart-list__line-input">
                  <InputNumber
                    min={0}
                    defaultValue={quantity}
                    max={available_quantity}
                    onChange={(ev) => setQuantityToCart(id, ev)}
                  />
                </div>
                <div className="cart-list__line-delete">
                  <DeleteOutlined
                    className="cart-list__line-delete__icon"
                    onClick={() => deleteLine(line.id)}
                  />
                </div>
              </div>
            );
          })
        ) : isLogged ? (
          <h2>Twój koszyk jest pusty</h2>
        ) : (
          <h2>
            Ta funkcjonalność jest przeznaczona tylko dla zalogowanych
            użytkowników
          </h2>
        )}
      </div>
      {isLogged && (
        <div className="cart-order">
          <h2 className="cart-order__toPay">{t("cart.toPay")}: </h2>
          <h2 className="cart-order__gross">
            {getPriceGross()} {t("product.value")}
          </h2>
          <div className="cart-order__actions">
            <Button
              className="cart-order__actions-order"
              disabled={!count}
              onClick={() => goToOrder()}
            >
              {t("cart.submitOrder")}
            </Button>
            <Button
              className="cart-order__actions-goBack"
              onClick={() => history.goBack()}
            >
              {t("cart.continueShopping")}
            </Button>
            <Button
              className="cart-order__actions-clearCart"
              disabled={!count}
              onClick={() => clearCart(false)}
            >
              {t("cart.clearCart")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(CartList);
