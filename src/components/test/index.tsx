import React, { useState } from "react";
import "./styles.less";
import "./index.css";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import { Button, Row, Col, Modal } from "antd";
import { User } from "../../models/user";
import { useCookies } from "react-cookie";
import { LoginApi } from "../../api/loginApi";
import "antd/dist/antd.css";
import UserOptions from "../login/UserOptions";
import Categories from "../Categories";
import RegisterForm from "../login/RegisterForm";

type props = {
  test?: string;
  test2?: number;
};

const Test: React.FC<props> = () => {
  const [logedUser, setLogedUser] = useState<User>();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const logout = () => {
    removeCookie("token");
    LoginApi.logoutUser(cookies.token, setLogedUser);
    //history.push('/home')
  };
  const [modalVisible, setModalVisible] = useState(false);
  React.useEffect(() => {
    if (cookies.token === undefined) setLogedUser(undefined);
    else LoginApi.getUser(cookies.token, setLogedUser);
  }, [cookies.token]);
  return (
    <Router>
      <div>
        <Row>
          <Col xs={12} sm={3} md={2} lg={1}>
            test
          </Col>
          <Col xs={6} sm={6} md={8} lg={10}>
            test
          </Col>
          <Col xs={6} sm={3} md={2} lg={1}>
            test
          </Col>
          <Col xs={6} sm={6} md={8} lg={10}>
            {" "}
            {logedUser === undefined && (
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
            {logedUser !== undefined && (
              <div>
                <UserOptions user={logedUser} logout={logout} />
              </div>
            )}
          </Col>
        </Row>
        {/*
        
  <h2>Witaj {logedUser?.username}</h2>
            <Button type="primary" onClick={() => logout()}>
              <Link to="/home">Wyloguj się</Link>
        </Button>*/}

        <div className="home_page">
          <Switch>
            <Route path="/login">
              <Modal
                title="Logowanie"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
                keyboard
              >
                <LoginForm setLogedUser={setLogedUser} />
              </Modal>
            </Route>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/home">
              <div>
                <div>Welcome! This is homepage</div>
                <div className="cat_list_div">
                  <Categories />
                </div>
                <div></div>
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Test;
