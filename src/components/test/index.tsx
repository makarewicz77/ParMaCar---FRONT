import React, { useState } from "react";
import "./styles.less";
import "./index.css";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import { Button } from "antd";
import { User } from "../../models/user";
import { useCookies } from "react-cookie";
import { useMutation } from "../../hooks";
import { LoginApi } from "../../api/loginApi";
import { useHistory } from "react-router-dom";
type props = {
  test?: string;
  test2?: number;
};

const Test: React.FC<props> = ({ test, test2 }) => {
  const [logedUser, setLogedUser] = useState<User>();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const history = useHistory();
  const logout = () => {
    removeCookie("token")
    LoginApi.logoutUser(cookies.token, setLogedUser)
    //history.push('/home')
  }
  React.useEffect(() => {
    if (cookies.token === undefined) setLogedUser(undefined);
    else LoginApi.getUser(cookies.token, setLogedUser);
  }, []);
  return (
    <Router>
      <div className="home_div">
        {logedUser === undefined && (
          <Button className="login_btn" type="primary">
            <Link to="/login">Zaloguj sie</Link>
          </Button>
        )}
        {logedUser !== undefined && (
          <div className="home_logged_in">
            <h5 className="welcome">Witaj {logedUser?.username}</h5>
            <Button className="logout_btn" type="primary" onClick={() => logout()}>
              <Link to="/home">Wyloguj się</Link>
            </Button>
          </div>
        )}

        <div className="home_page">
          <Switch>
            <Route path="/login">
              <LoginForm setLogedUser={setLogedUser} />
            </Route>
            <Route path="/home">Welcome! This is homepage</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Test;
