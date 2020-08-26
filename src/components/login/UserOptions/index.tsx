import React from "react";

import "./styles.less";
import { Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { User } from "../../../models/user";

type userProps = {
  user: User;
  logout: Function;
};

const UserOptions: React.FC<userProps> = ({ user, logout }) => {
  const handleMenuClick = (e: any) => {
    if (e.key === "1") message.error("Nie ma jeszcze tej funkcjonalności xD");
    if (e.key === "2") {
      logout();
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
    <div style={{ marginTop: "10px" }}>
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

export default UserOptions;
