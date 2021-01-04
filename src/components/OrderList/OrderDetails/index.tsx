import { UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { CartLine } from "../../../models/cart";
import { Order } from "../../../models/order";
import { Mechanic } from "../../../models/user";
import { getImageUrl, getLinkToProduct } from "../../../utils/utils";
import noAvailable from "../../../static/images/noavailable.jpg";
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
            <h5 className="summary-container__goBack">
              {t("order.backToList")}
            </h5>
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
              <h3>{t("order.choosedMechanicSummary")}</h3>
              <div className="summary-container__mechanic">
                <div className="summary-container__mechanic-avatar">
                  {" "}
                  {mechanic && mechanic.avatar ? (
                    <img
                      src={getImageUrl(mechanic.avatar)}
                      alt="mechanic avatar"
                      className="summary-container__mechanic-avatar__src"
                    />
                  ) : (
                    <Avatar size={50} icon={<UserOutlined />} />
                  )}
                </div>
                <div className="summary-container__mechanic-description">
                  <p className="summary-container__mechanic-description__names">
                    {order.mechanic_full_name}
                  </p>
                  <p className="summary-container__mechanic-description__address">
                    {`${mechanic?.street} ${mechanic?.postal_code}, ${mechanic?.city}`}
                  </p>
                  <p className="summary-container__mechanic-description__perHour">
                    {t("mechanics.hourlyRate")}:{" "}
                    {mechanic && mechanic.hourly_rate !== ""
                      ? `${mechanic.hourly_rate} zł/h`
                      : "Brak informacji o stawce godzinowej"}
                  </p>
                  <p className="summary-container__mechanic-messageLabel">
                    {t("order.messageToMechanic")}
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
              <h3>{t("order.yourProducts")}</h3>
              {order.cart &&
                order.cart.line.map((line: CartLine) => {
                  const {
                    id,
                    product,
                    product_image,
                    product_name,
                    product_gross,
                  } = line;
                  const linkToProduct = getLinkToProduct(product, product_name);
                  return (
                    <div className="cart-list__line" key={id}>
                      {!product_image ? (
                        <Link
                          to={{
                            pathname: linkToProduct,
                            state: { id: product },
                          }}
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
                    </div>
                  );
                })}
              <h4 className="summary-cart__list-gross">
                {t("product.priceGross")}: {order.cart.sum_gross}{" "}
                {t("product.value")}
              </h4>
              <h4 className="summary-cart__list-net">
                {t("product.priceNet")}: {order.cart.sum_net}
                {t("product.value")}
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
