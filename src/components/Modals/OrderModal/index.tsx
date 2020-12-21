import SuccessAnimation from "actually-accessible-react-success-animation";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Mechanic } from "../../../models/user";

import "./styles.scss";

interface OrderProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mechanic: Mechanic;
}

const OrderModal: React.FC<OrderProps> = ({
  visible,
  setVisible,
  mechanic,
}) => {
  const { user } = mechanic;
  const { first_name, last_name } = user;
  const { t } = useTranslation("common");
  return (
    <>
      <Modal
        title={<h3>{t("order.title")}</h3>}
        footer={null}
        keyboard
        visible={visible}
        onCancel={() => setVisible(false)}
        className="order-modal"
      >
        <SuccessAnimation
          color="#00ff00"
          style={{ display: "flex" }}
          text={t("order.thanks")}
        />
        <p>
          {t("order.mechanic")}{" "}
          <strong>
            {first_name} {last_name}
          </strong>{" "}
          {t("order.mechanicReceived")}{" "}
          <Link to={`/profile/${mechanic.id}/`}>
            {t("order.mechanicReceivedRef")}{" "}
          </Link>{" "}
          {t("order.mechanicReceived2")}
        </p>
        <div>
          <Link to="/">
            <Button>{t("order.backToShopping")}</Button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
