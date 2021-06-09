/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import { Form, Input, Button, message, Modal, Checkbox, Divider } from "antd";
import "./styles.less";
import "./index.scss";
import { useFormWithRef, addHours } from "../../../utils/utils";
import { FormInstance } from "antd/lib/form";
import { LoginApi } from "../../../api/loginApi";
import { User } from "../../../models/user";
import {
  Link,
  RouteComponentProps,
  useHistory,
  withRouter,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import { UserContext } from "../../../contexts/UserContext";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const LoginForm: React.FC<RouteComponentProps> = ({ history }) => {
  const layout = {
    labelcol: { span: 8 },
    wrappercol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { span: 26 },
  };
  const ref = useRef<FormInstance>(null);
  const [form] = useFormWithRef(ref);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const user = useContext(UserContext);
  const onSave = (partialUser: Partial<User>) => {
    setLoading(true);
    user
      .loginUser(partialUser)
      .then((res: any) => {
        if (!res.error) {
          message.success("Zalogowano się pomyślnie!");
          setCookie("token", res.data.token, { expires: addHours(8) });
          setLoading(false);
          history.push("/");
        }
      })
      .catch((e) => {
        message.error(
          "Wprowadzono niepoprawne dane. Wprowadź prawidłowe dane!"
        );
        setTimeout(() => message.destroy(), 2000);
        setLoading(false);
      });
  };
  const rememberMe = () => {
    const rmbr = localStorage.getItem("remember");
    if (rmbr === null) {
      localStorage.removeItem("login");
      localStorage.removeItem("password");
    } else if (rmbr === "true") {
      localStorage.setItem("login", form.getFieldValue("username"));
      localStorage.setItem("password", form.getFieldValue("password"));
    } else {
      if (localStorage.getItem("login")) localStorage.removeItem("login");
      if (localStorage.getItem("password")) localStorage.removeItem("password");
      if (localStorage.getItem("remember")) localStorage.removeItem("remember");
    }
  };
  const onChange = (e: CheckboxChangeEvent) => {
    localStorage.setItem("remember", e.target.checked.toString());
  };
  return (
    <div className="login_form_div">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        form={form}
      >
        <Form.Item
          label="Login"
          name="username"
          rules={[{ required: true, message: "Login nie może być pusty!" }]}
          initialValue={localStorage.getItem("login")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Hasło"}
          name="password"
          rules={[{ required: true, message: "Hasło nie może być puste!" }]}
          initialValue={localStorage.getItem("password")}
        >
          <Input.Password />
        </Form.Item>
        <div className="remember-cointainer">
          <Checkbox
            className="checkbox"
            onChange={onChange}
            defaultChecked={localStorage.getItem("remember") ? true : false}
          >
            {"Zapamiętaj mnie"}
          </Checkbox>
        </div>
        <Button
          className="login-button"
          type="primary"
          htmlType="submit"
          onClick={() =>
            ref.current
              ?.validateFields()
              .then(onSave)
              .then(rememberMe)
              .catch(() => {})
          }
          {...tailLayout}
        >
          {loading && <LoadingOutlined />} Zaloguj się
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(LoginForm);
