import React, { useContext } from "react";

import "./styles.scss";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { User } from "../../../models/user";
import { UserContext } from "../../../contexts/UserContext";
import { CartContext } from "../../../contexts/CartContext";
type userProps = {
  user: User;
};

const UserOptions: React.FC<userProps> = ({ user }) => {
  const { logout } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);
  const handleMenuClick = (e: any) => {
    if (e.key === "4") {
      clearCart(true);
      logout();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="4" icon={<LogoutOutlined />}>
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
