import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Col, Row } from "antd";
import React, { useContext } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { User } from "../../models/user";
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
  return (
    <>
      <Row>
        <div className="navbar">
          <Link to="/products" style={{ width: "100px" }}>
            <p className="navbar-item">Produkty</p>
          </Link>
          <Link to="/profile-list" style={{ width: "100px" }}>
            {" "}
            <p className="navbar-item">Mechanicy</p>
          </Link>
          {user && (
            <Link to="/my-orders" style={{ width: "120px" }}>
              {" "}
              <p className="navbar-item">Moje zamówienia</p>
            </Link>
          )}
        </div>
        <Col
          xs={7}
          sm={4}
          md={3}
          lg={user ? 1 : 2}
          offset={12}
          className="cart-col"
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
              <Link to="/login">Zaloguj się</Link>
            </Button>
            <Button type="primary" className="register_button">
              <Link to="/register">Zarejestruj się</Link>
            </Button>
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
