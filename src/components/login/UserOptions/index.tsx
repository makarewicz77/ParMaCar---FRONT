import React, { useContext } from "react";

import "./styles.less";
import { Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { User } from "../../../models/user";
import { UserContext } from "../../../contexts/UserContext";
import { RouteComponentProps, withRouter } from "react-router-dom";

type userProps = {
  user: User;
} & RouteComponentProps;

const UserOptions: React.FC<userProps> = ({ user, history }) => {
  const userContext = useContext(UserContext);
  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      history.push("/user-config");
    }
    if (e.key === "2") {
      userContext.logout();
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Ustawienia konta
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}>
        Wyloguj się
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown.Button
        overlay={menu}
        placement="bottomCenter"
        icon={<SettingOutlined />}
      >
        {user.username}
      </Dropdown.Button>
    </div>
  );
};

export default withRouter(UserOptions);
