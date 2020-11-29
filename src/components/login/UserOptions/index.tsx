import React, { useContext } from "react";

import "./styles.less";
import { Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { User } from "../../../models/user";
import { useMutation } from "../../../hooks";
import { UserContext } from "../../../contexts/UserContext";

type userProps = {
  user: User;
};

const UserOptions: React.FC<userProps> = ({ user }) => {
  const userContext = useContext(UserContext);
  const handleMenuClick = (e: any) => {
    if (e.key === "1") message.error("Nie ma jeszcze tej funkcjonalności xD");
    if (e.key === "2") {
      userContext.logout()
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

export default UserOptions;
