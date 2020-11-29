import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Row } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { User } from "../../models/user";
import { LogoIcon } from "../../utils/utils";
import UserOptions from "../login/UserOptions";

import "./styles.scss";

type NavbarProps = {
  user: User | undefined;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ user, setModalVisible }) => {
  const count = useContext(CartContext).count;
  return (
    <>
      <Row>
        <Col xs={12} sm={5} md={4} lg={3}>
          <Link to="/">
            <img src={LogoIcon} alt="logo" className="navbar_logo" />
          </Link>
        </Col>
        <Col xs={6} sm={6} md={8} lg={10}>
          <Link to="/home">Produkty</Link>
        </Col>
        <Col xs={6} sm={3} md={2} lg={1}>
          <Badge count={count}>
            <ShoppingCartOutlined className="navbar-cart" />
          </Badge>
        </Col>
        <Col xs={6} sm={6} md={8} lg={10}>
          {" "}
          {user === undefined && (
            <>
              <Button
                type="primary"
                className="login_button"
                onClick={() => setModalVisible(true)}
              >
                <Link to="/login">Zaloguj sie</Link>
              </Button>
              <Button type="primary" className="register_button">
                <Link to="/register">Zarejestruj sie</Link>
              </Button>
            </>
          )}
          {user !== undefined && (
            <div>
              <UserOptions user={user} />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Navbar;
