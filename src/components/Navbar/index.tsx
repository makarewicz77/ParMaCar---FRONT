import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Row } from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { User } from "../../models/user";
import { LogoIcon } from "../../utils/utils";
import UserOptions from "../login/UserOptions";

import "./styles.scss";

type NavbarProps = {
  user: User | undefined;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps & RouteComponentProps> = ({
  user,
  setModalVisible,
  history,
}) => {
  const count = useContext(CartContext).count;
  const { t } = useTranslation("common");
  return (
    <>
      <Row>
        <Col xs={12} sm={5} md={4} lg={3}>
          <Link to="/">
            <img src={LogoIcon} alt="logo" className="navbar_logo" />
          </Link>
        </Col>
        <div className="navbar">
          <Link to="/products">
            <p className="navbar-item">{t("navbar.products")}</p>
          </Link>
          <Link to="/profile-list">
            {" "}
            <p className="navbar-item">{t("navbar.mechanics")}</p>
          </Link>
          {user && (
            <Link to="/my-orders">
              {" "}
              <p className="navbar-item">{t("menu.myOrders")}</p>
            </Link>
          )}
        </div>
        <Col
          xs={6}
          sm={3}
          md={2}
          lg={user ? 1 : 2}
          offset={
            user ? (localStorage.getItem("language") === "pl" ? 6 : 6) : 9
          }
        >
          <Badge count={count} size="small" className="navbar-cart__badge">
            <ShoppingCartOutlined
              className="navbar-cart"
              onClick={() => history.push(`/cart`)}
            />
          </Badge>
        </Col>{" "}
        {user === undefined && (
          <Col xs={6} sm={3} md={2} lg={5} offset={0}>
            <Button
              type="primary"
              className="login_button"
              onClick={() => setModalVisible(true)}
            >
              <Link to="/login">{t("loginForm.logIn")}</Link>
            </Button>
            <Button type="primary" className="register_button">
              <Link to="/register">{t("loginForm.registerIn")}</Link>
            </Button>
          </Col>
        )}
        {user && user.groups[0].name === "Mechanic" && (
          <Col
            xs={6}
            sm={6}
            md={8}
            lg={localStorage.getItem("language") === "en" ? 4 : 3}
            offset={0}
          >
            {t("navbar.accountType")}:{" "}
            <strong>{t(`navbar.typeMechanic`)}</strong>
          </Col>
        )}
        {user && user.groups[0].name === "Client" && (
          <Col
            xs={6}
            sm={6}
            md={8}
            lg={localStorage.getItem("language") === "en" ? 4 : 3}
            offset={0}
          >
            {t("navbar.accountType")}: <strong>{t(`navbar.typeClient`)}</strong>
          </Col>
        )}
        {user !== undefined && (
          <Col xs={6} sm={6} md={8} lg={2} offset={1}>
            <UserOptions user={user} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default withRouter(Navbar);
