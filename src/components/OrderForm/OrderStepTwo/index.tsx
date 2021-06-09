import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useContext, useState } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { CartLine } from "../../../models/cart";
import { Mechanic } from "../../../models/user";
import "./styles.scss";
import OrderModal from "../../Modals/OrderModal";
import { OrderApi } from "../../../api/orderApi";
import { UserContext } from "../../../contexts/UserContext";
import { environment } from "../../../environment";
import axios from "axios";

interface StepTwoProps {
  mechanic: Mechanic;
  note: string;
  setPercent: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const OrderStepTwo: React.FC<StepTwoProps> = ({
  mechanic: mechanicUser,
  note,
}) => {
  const { lines, getPriceNet } = useContext(CartContext);
  const { id, user: mechanic, hourly_rate } = mechanicUser;
  const [visible, setVisible] = useState<boolean>(false);
  const user = useContext(UserContext).user;
  const userCtx = useContext(UserContext);
  const { getCart: cart, getCartResponse } = useContext(CartContext);

  return (
    <>
      {mechanicUser ? (
        <>
          <div>
            <h2>Podsumowanie zamówienia</h2>
            <div>
              <div className="summary-container">
                <h3>Wybrany mechanik</h3>
                <div className="summary-container__mechanic">
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
                      Stawka godzinowa:{" "}
                      {hourly_rate !== ""
                        ? `${hourly_rate} zł/h`
                        : "Brak informacji o stawce godzinowej"}
                    </p>
                    <p className="summary-container__mechanic-messageLabel">
                      {"Wiadomosc do mechanika"}
                    </p>
                    <TextArea
                      defaultValue={note}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                    <div style={{ display: "grid" }}>
                      <Button
                        className="summary-container__confirmButton"
                        onClick={() => {
                          const arr: any = [];
                          lines.forEach((line) => {
                            arr.push(
                              axios.patch(
                                `${environment.apiUrl}api/products/${line.product}/`,
                                {
                                  quantity:
                                    line.available_quantity - line.quantity,
                                }
                              )
                            );
                          });
                          axios.all(arr).then((res) => {
                            OrderApi.sendOrder(
                              {
                                note,
                                mechanic: id,
                                user: user?.id,
                                cart: cart,
                              },
                              userCtx.token
                            ).then(() => {
                              setVisible(true);
                              getCartResponse();
                            });
                          });
                        }}
                      >
                        Potwierdz zamowienie
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="summary-cart__list">
                <h3>Twoje produkty</h3>
                {lines.map((line: CartLine) => {
                  const { id, product_name, product_net } = line;
                  return (
                    <div className="cart-list__line" key={id}>
                      <div className="cart-list__line-detail">
                        <p className="cart-list__line-detail__name">
                          {product_name}
                        </p>
                        <p className="cart-list__line-detail__price">
                          {product_net} zł.
                        </p>
                      </div>
                    </div>
                  );
                })}
                <h4 className="summary-cart__list-net">
                  Do zaplaty: {getPriceNet()} PLN
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
