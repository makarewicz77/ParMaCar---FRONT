import SuccessAnimation from "actually-accessible-react-success-animation";
import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
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
  return (
    <>
      <Modal
        title={<h3>Zamówienie</h3>}
        footer={null}
        keyboard
        visible={visible}
        onCancel={() => setVisible(false)}
        className="order-modal"
      >
        <SuccessAnimation
          color="#00ff00"
          style={{ display: "flex" }}
          text={"Dziękujemy za złożone zamówienie"}
        />
        <p>
          Mechanik{" "}
          <strong>
            {first_name} {last_name}
          </strong>{" "}
          {
            "otrzymał Twoje zamówienie, skontaktuje się z Tobą poprzez adres email. Jeśli chcesz zrobić to pierwszy/a to kliknij w profil mechanika"
          }{" "}
          <Link to={`/profile/${mechanic.id}/`}>{"profil mechanika"} </Link>{" "}
          {"by dowiedzieć się więcej."}
        </p>
        <div>
          <Link to="/">
            <Button>Wróć do zakupów</Button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default OrderModal;
