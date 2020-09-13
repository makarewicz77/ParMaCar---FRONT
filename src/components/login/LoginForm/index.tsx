/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import "./styles.less";
import "./index.css";
import { useFormWithRef, addHours } from "../../../utils/utils";
import { FormInstance } from "antd/lib/form";
import { useMutation } from "../../../hooks";
import { LoginApi } from "../../../api/loginApi";
import { User } from "../../../models/user";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";

type loginProps = {
  setLogedUser: Function;
};

const LoginForm: React.FC<loginProps> = ({ setLogedUser }) => {
  const history = useHistory();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { span: 26 },
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const ref = useRef<FormInstance>(null);
  const { t, i18n } = useTranslation("common");
  const [form] = useFormWithRef(ref);
  const [loading, setLoading] = useState(false);
  const [login] = useMutation(LoginApi.create);
  const [cookies, setCookie] = useCookies(["token"]);
  const onSave = (partialUser: Partial<User>) => {
    setLoading(true);
    login(partialUser).then((res: any) => {
      if (!res.error) {
        setLogedUser(res.data.user);
        message.success("Udało się zalogować");
        setCookie("token", res.data.token, { expires: addHours(8) });
        setLoading(false);
        history.push("/home");
      } else {
        message.error("Wprowadzono niepoprawne dane. Wprowadź prawidłowe dane");
        setTimeout(() => message.destroy(), 2000);
        setLoading(false);
      }
    });
  };
  return (
    <div className="login_form_div">
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
          label={t("loginForm.password")}
          name="password"
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
              .then(onSave)
              .catch(() => {})
          }
          {...tailLayout}
        >
          {loading && <LoadingOutlined />} {t("loginForm.logIn")}
        </Button>
        <h4 className="register_info">
          Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
        </h4>
      </Form>
    </div>
  );
};

export default LoginForm;
