import React, { useState } from "react";
import "./styles.less";
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
    LoginApi.logoutUser(cookies.token,setLogedUser)
    //history.push('/home')
  }
  React.useEffect(() => {
    if (cookies.token === undefined) setLogedUser(undefined);
    else LoginApi.getUser(cookies.token, setLogedUser);
  }, []);
  return (
    <Router>
      <div>
        {logedUser === undefined && (
          <Button type="primary">
            <Link to="/login">Zaloguj sie</Link>
          </Button>
        )}
        {logedUser !== undefined && (
          <div>
            <h5>Witaj {logedUser?.username}</h5>
            <Button type="primary" onClick={() => logout()}>
              <Link to="/home">Wyloguj się</Link>
            </Button>
          </div>
        )}

        <Switch>
          <Route path="/login">
            <LoginForm setLogedUser={setLogedUser} />
          </Route>
          <Route path="/home">Welcome! This is homepage</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Test;
