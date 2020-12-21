import React, { useContext } from "react";

import "./styles.scss";
import { Dropdown, Menu, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { User } from "../../../models/user";
import { UserContext } from "../../../contexts/UserContext";
import { RouteComponentProps, withRouter } from "react-router-dom";
import i18next from "../../../index";
import SubMenu from "antd/lib/menu/SubMenu";
import { useTranslation } from "react-i18next";
import Poland from "../../../static/images/Flag_of_Poland.svg";
import England from "../../../static/images/Flag_of_the_United_Kingdom.svg";
type userProps = {
  user: User;
} & RouteComponentProps;

const UserOptions: React.FC<userProps> = ({ user, history }) => {
  const { logout } = useContext(UserContext);
  const { t } = useTranslation("common");
  const handleMenuClick = (e: any) => {
    if (e.key === "1") history.push("/user-config");
    if (e.key === "2") history.push("/my-orders");
    if (e.key === "4") logout();
    if (e.key === "sub1") {
      i18next.changeLanguage("pl-PL");
      localStorage.setItem("language", "pl");
      message.success(t("language.changed"), 2);
    }
    if (e.key === "sub2") {
      i18next.changeLanguage("en-US");
      localStorage.setItem("language", "en");
      message.success(t("language.changed"), 2);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        {t("menu.settings")}
      </Menu.Item>
      <Menu.Item key="2" icon={<UnorderedListOutlined />}>
        {t("menu.myOrders")}
      </Menu.Item>
      <SubMenu
        key="sub"
        icon={<CommentOutlined />}
        title={t("menu.chooseLanguage")}
      >
        <Menu.ItemGroup title={t("language.label")}>
          <Menu.Item key="sub1">
            <img src={Poland} style={{ width: "20px" }} alt="poland-flag"></img>
            <h5>{t("language.polish")}</h5>
          </Menu.Item>
          <Menu.Item key="sub2">
            {" "}
            <img
              src={England}
              style={{ width: "20px" }}
              alt="poland-flag"
            ></img>
            <h5> {t("language.english")}</h5>
          </Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>

      <Menu.Item key="4" icon={<LogoutOutlined />}>
        {t("menu.logout")}
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
