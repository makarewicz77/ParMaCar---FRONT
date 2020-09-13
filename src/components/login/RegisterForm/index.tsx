import { Button, Input } from "antd";
import Form from "antd/lib/form";
import { FormInstance } from "antd/lib/form/Form";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormWithRef } from "../../../utils/utils";

import "./styles.css";

const RegisterForm: React.FC = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const ref = useRef<FormInstance>(null);
  const { t } = useTranslation("common");
  const [form] = useFormWithRef(ref);
  const tailLayout = {
    wrapperCol: { span: 26 },
  };
  return (
    <div className="register_form">
      <h1>Rejestracja</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="Login"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("registerForm.email")}
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("registerForm.firstName")}
          name="first_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("registerForm.lastName")}
          name="last_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("loginForm.password")}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("registerForm.repeatPassword")}
          name="repeatPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() =>
            ref.current
              ?.validateFields()
              //.then(onSave)
              .catch(() => {})
          }
          {...tailLayout}
        >
          <h3>{t("registerForm.signUp")}</h3>
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
