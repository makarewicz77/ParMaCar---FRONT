import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { CartLine } from "../../../models/cart";
import { Order } from "../../../models/order";
import { Mechanic } from "../../../models/user";
import { getLinkToProduct } from "../../../utils/utils";
import "./styles.scss";
import { OrderApi } from "../../../api/orderApi";
import Loader from "react-loader-spinner";
import { LoginApi } from "../../../api/loginApi";

const OrderDetails: React.FC<RouteComponentProps> = ({ history }) => {
  const { t } = useTranslation("common");
  const [mechanic, setMechanic] = useState<Mechanic | undefined>(undefined);
  const [order, setOrder] = useState<Order>({} as Order);
  const [loading, setLoading] = useState<boolean>(true);
  const id = history.location.pathname.split("/")[2];
  useEffect(() => {
    OrderApi.getOrder(Number(id)).then((res) => {
      const data = res.data;
      LoginApi.getMechanic(data.mechanic).then((mech) => {
        setOrder(data);
        setMechanic(mech.data);
        setLoading(false);
      });
    });
  }, [id]);
  return (
    <div className="orderDetails-content">
      <h1>{t("orderList.orderDetails")}</h1>
      {!loading ? (
        <div>
          <Link to="/my-orders">
            <h5 className="summary-container__goBack">Wróć</h5>
          </Link>
          <h3 className="orderDetails-status">
            {t("orderList.orderStatus")}:{" "}
            <div
              className={`orderList-status__${order.status.replace(" ", "_")}`}
              style={{ display: "contents" }}
            >
              {t(`orderList.status.${order.status.replace(" ", "_")}`)}
            </div>
          </h3>
          <h2>
            {t("orderList.orderId")}-{id}
          </h2>
          <div>
            <div className="summary-container">
              <h3>Wybrany mechanik</h3>
              <div className="summary-container__mechanic">
                <div className="summary-container__mechanic-description">
                  <p className="summary-container__mechanic-description__names">
                    {order.mechanic_full_name}
                  </p>
                  <p className="summary-container__mechanic-description__address">
                    {`${mechanic?.street} ${mechanic?.postal_code}, ${mechanic?.city}`}
                  </p>
                  <p className="summary-container__mechanic-description__perHour">
                    Stawka godzinowa:{" "}
                    {mechanic && mechanic.hourly_rate !== ""
                      ? `${mechanic.hourly_rate} zł/h`
                      : "Brak informacji o stawce godzinowej"}
                  </p>
                  <p className="summary-container__mechanic-messageLabel">
                    Wiadomość do mechanika
                  </p>
                  <TextArea
                    defaultValue={order.note}
                    disabled={true}
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </div>
              </div>
            </div>
            <div className="summary-cart__list">
              <h3>Twoje produkty</h3>
              {order.cart &&
                order.cart.line.map((line: CartLine) => {
                  const { id, product, product_name, product_net } = line;
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
                    </div>
                  );
                })}
              <h4 className="summary-cart__list-net">
                Koszt: {order.cart.sum_net} zł.
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withRouter(OrderDetails);
