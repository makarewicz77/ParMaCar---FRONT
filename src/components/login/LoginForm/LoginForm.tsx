/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import { Form, Input, Button, message, Modal, Checkbox, Divider } from "antd";
import "./styles.less";
import "./index.scss";
import { useFormWithRef, addHours } from "../../../utils/utils";
import { FormInstance } from "antd/lib/form";
import { LoginApi } from "../../../api/loginApi";
import { User } from "../../../models/user";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import { UserContext } from "../../../contexts/UserContext";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

type loginProps = {
};

const LoginForm: React.FC<loginProps> = () => {
  const history = useHistory();
  const layout = {
    labelcol: { span: 8 },
    wrappercol: { span: 12 },
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
  const [cookies, setCookie] = useCookies(["token"]);
  const user = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const onSave = (partialUser: Partial<User>) => {
    setLoading(true);
    user.loginUser(partialUser).then((res: any) => {
      if (!res.error) {
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
  console.log(localStorage.getItem('remember'));
  const rememberMe = () =>{
    const rmbr = localStorage.getItem('remember');
    if(rmbr === null)
      {

      }
    else if(rmbr === 'true')
    {

    }
    else{

    }
  }
  const onChange=(e: CheckboxChangeEvent)=>{
    localStorage.setItem('remember',e.target.checked.toString())
  }
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
                <div className="remember-cointainer">
          <Checkbox className="checkbox" onChange={onChange}>{t('loginForm.rememberMe')}</Checkbox>
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
          {loading && <LoadingOutlined />} {t("loginForm.logIn")}
        </Button>
        <Divider className="ant-divider-horizontale"/>
        <h4 className="register_info">
          Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
        </h4>
      </Form>
    </div>
  );
};

export default LoginForm;
