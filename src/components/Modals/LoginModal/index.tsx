import Modal from "antd/lib/modal/Modal";
import React from "react";
import LoginForm from "../../login/LoginForm/LoginForm";

import "./styles.css";

type LoginModalProps = {
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({visible,setModalVisible}) => {
  return (
    <>
      <Modal title="Logowanie" footer={null} keyboard visible={visible} onCancel={() => setModalVisible(false)}>
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginModal;
