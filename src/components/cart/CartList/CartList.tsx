import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, InputNumber } from "antd";
import React, { useContext } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { UserContext } from "../../../contexts/UserContext";
import { CartLine } from "../../../models/cart";
import { getLinkToProduct } from "../../../utils/utils";
import "./styles.scss";

const CartList: React.FC<RouteComponentProps> = ({ history }) => {
  const { lines, count, deleteFromCart, getPriceNet, updateLine } =
    useContext(CartContext);
  const { isLogged } = useContext(UserContext);
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
              product_name,
              quantity,
              product_net,
              available_quantity,
            } = line;
            const linkToProduct = getLinkToProduct(product, product_name);
            return (
              <div className="cart-list__line" key={id}>
                <div className="cart-list__line-detail">
                  <p className="cart-list__line-detail__name">
                    <Link to={linkToProduct}>{product_name}</Link>
                  </p>
                  <p className="cart-list__line-detail__price">
                    {product_net} zł.
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
          <h2 className="cart-order__toPay">Do zapłaty: </h2>
          <h2 className="cart-order__gross">{getPriceNet()} zł.</h2>
          <div className="cart-order__actions">
            <Button
              className="cart-order__actions-order"
              disabled={!count}
              onClick={() => goToOrder()}
            >
              Złóż zamówienie
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(CartList);
