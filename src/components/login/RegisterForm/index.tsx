import { Button, Input, message } from "antd";
import Form from "antd/lib/form";
import { FormInstance } from "antd/lib/form/Form";
import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { User } from "../../../models/user";
import { useFormWithRef } from "../../../utils/utils";

import "./styles.css";

const RegisterForm: React.FC<RouteComponentProps> = ({ history }) => {
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
  const user = useContext(UserContext);
  const onSave = (partialUser: Partial<User>) => {
    user
      .registerUser({ ...partialUser }, "Client")
      .then((res: any) => {
        user.loginFromRegister(res.data).then((res) => {
          message.success(
            "Zarejestrowano pomyślnie. System automatycznie zalogował Cię do systemu.",
            3
          );
          history.push("/");
        });
      })
      .catch((e) => {
        const data = e.response.data;
        if (data.username) {
          message.error(t("error.username"));
        } else if (data.email) {
          //@@email poprawić
          message.error("email error");
        }
      });
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
          rules={[
            {
              required: true,
              message: t("error.loginForm"),
              type: "string",
              min: 4,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("registerForm.email")}
          name="email"
          rules={[
            {
              required: true,
              message: t("error.emailForm"),
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("registerForm.firstName")}
          name="first_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input autoComplete="newpassword" />
        </Form.Item>
        <Form.Item
          label={t("registerForm.lastName")}
          name="last_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input autoComplete="newpassword" />
        </Form.Item>

        <Form.Item
          label={t("loginForm.password")}
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            {
              type: "string",
              min: 5,
              message: t("error.passwordForm"),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("registerForm.repeatPassword")}
          name="repeatPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() =>
            ref.current
              ?.validateFields()
              .then(onSave)
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

export default withRouter(RegisterForm);
