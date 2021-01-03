import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { CartLine } from "../../../models/cart";
import { Mechanic } from "../../../models/user";
import { getImageUrl, getLinkToProduct } from "../../../utils/utils";
import noAvailable from "../../../static/images/noavailable.jpg";
import "./styles.scss";
import OrderModal from "../../Modals/OrderModal";
import { OrderApi } from "../../../api/orderApi";
import { UserContext } from "../../../contexts/UserContext";

interface StepTwoProps {
  mechanic: Mechanic;
  note: string;
  setPercent: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const OrderStepTwo: React.FC<StepTwoProps> = ({
  mechanic: mechanicUser,
  note,
  setPercent,
  setStep,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const { lines, getPriceGross, getPriceNet } = useContext(CartContext);
  const { t } = useTranslation("common");
  const { id, avatar, user: mechanic, hourly_rate } = mechanicUser;
  const [visible, setVisible] = useState<boolean>(false);
  const user = useContext(UserContext).user;
  const { getCart: cart, getCartResponse } = useContext(CartContext);
  const backToStepOne = () => {
    setStep(1);
    setPercent(50);
  };

  return (
    <>
      {mechanicUser ? (
        <>
          <div>
            <Link to="/order/1/" onClick={() => backToStepOne()}>
              <h5 className="summary-container__goBack">{t("order.back")}</h5>
            </Link>
            <h2>{t("order.summaryOrder")}</h2>
            <div>
              <div className="summary-container">
                <h3>{t("order.choosedMechanicSummary")}</h3>
                <div className="summary-container__mechanic">
                  <div className="summary-container__mechanic-avatar">
                    {" "}
                    {avatar ? (
                      <img
                        src={getImageUrl(avatar)}
                        alt="mechanic avatar"
                        className="summary-container__mechanic-avatar__src"
                      />
                    ) : (
                      <Avatar size={50} icon={<UserOutlined />} />
                    )}
                  </div>
                  <div className="summary-container__mechanic-description">
                    <p className="summary-container__mechanic-description__names">
                      {mechanic && (
                        <>
                          {mechanic.first_name} {mechanic.last_name}{" "}
                        </>
                      )}
                    </p>
                    <p className="summary-container__mechanic-description__address">
                      ul. Kościelna 80 16-315 Lipsk
                    </p>
                    <p className="summary-container__mechanic-description__perHour">
                      {t("mechanics.hourlyRate")}:{" "}
                      {hourly_rate !== ""
                        ? `${hourly_rate} zł/h`
                        : "Brak informacji o stawce godzinowej"}
                    </p>
                    <p className="summary-container__mechanic-messageLabel">
                      {t("order.messageToMechanic")}
                    </p>
                    <TextArea
                      defaultValue={note}
                      disabled={disabled}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                    <Button
                      className={`summary-container__mechanic-messageButton__${disabled}`}
                      onClick={() => setDisabled(false)}
                    >
                      {t("order.editMessage")}
                    </Button>
                    <div style={{ display: "grid" }}>
                      <Button
                        className="summary-container__confirmButton"
                        onClick={() => {
                          OrderApi.sendOrder({
                            note,
                            mechanic: id,
                            user: user?.id,
                            cart: cart,
                          }).then(() => {
                            setVisible(true);
                            getCartResponse();
                          });
                        }}
                      >
                        {t("order.confirmOrder")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="summary-cart__list">
                <h3>{t("order.yourProducts")}</h3>
                {lines.map((line: CartLine) => {
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
                  {t("product.priceGross")}: {getPriceGross()}{" "}
                  {t("product.value")}
                </h4>
                <h4 className="summary-cart__list-net">
                  {t("product.priceNet")}: {getPriceNet()}
                  {t("product.value")}
                </h4>
              </div>
            </div>
          </div>
          <OrderModal
            setVisible={setVisible}
            visible={visible}
            mechanic={mechanicUser}
          />
        </>
      ) : (
        <p>BŁĄD</p>
      )}
    </>
  );
};

export default OrderStepTwo;
