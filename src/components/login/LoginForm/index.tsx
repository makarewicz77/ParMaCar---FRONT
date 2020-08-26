/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./styles.less";
import { useFormWithRef, addHours } from "../../../utils/utils";
import { FormInstance } from "antd/lib/form";
import { useMutation } from "../../../hooks";
import { LoginApi } from "../../../api/loginApi";
import { User } from "../../../models/user";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

type loginProps ={
  setLogedUser: Function,
}

const LoginForm: React.FC<loginProps> = ({setLogedUser}) => {
  const history = useHistory();
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 4 },
  };
  const tailLayout = {
    wrapperCol: { span: 26 },
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const ref = useRef<FormInstance>(null);
  const [form] = useFormWithRef(ref);
  const [login] = useMutation(LoginApi.create);
  const [cookies, setCookie] = useCookies(['token']);
  const onSave = (partialUser: Partial<User>) => {
    login(partialUser).then((res: any) => {
      setLogedUser(res.data.user);
      console.log(res);
      if (res.data === undefined)
        message.error("Wprowadzono niepoprawne dane. Wprowadź prawidłowe dane",2000);
      else {
        message.success("Udało się zalogować");
        setCookie("token", res.data.token, {expires:addHours(8)})
        history.push("/home");
      }
    });
  };

  return (
    <div>
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
          label="Password"
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
