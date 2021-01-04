import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginForm from "../../login/LoginForm/LoginForm";

import "./styles.css";

type LoginModalProps = {
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  setModalVisible,
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Modal
        title={t("loginForm.logIn")}
        footer={null}
        keyboard
        visible={visible}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
      >
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginModal;
