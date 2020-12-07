import { AxiosResponse } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LoginApi } from "../api/loginApi";
import { User } from "../models/user";

export interface UserContextInterface {
  setCart: (obj: any) => void;
  registerUser: (user: Partial<User>) => void;
  loginUser: (user: Partial<User>) => Promise<AxiosResponse<User>>;
  logout: () => void;
  user: User | undefined;
  isLogged: boolean;
}
export const UserContext = createContext<UserContextInterface>({
  setCart: () => {},
  registerUser: () => {},
  loginUser: () => ({} as Promise<AxiosResponse<User>>),
  logout: () => {},
  user: undefined,
  isLogged: false
});

export const UserProvider: React.FC = ({ children }) => {
  const [, setCart] = useState({});
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [, setToken] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const registerUser = (user: Partial<User>) => {
    LoginApi.registerUser(user);
  };
  const loginUser = (user: Partial<User>) => {
    const response = LoginApi.loginUser(user);
    response.then((res) => {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogged(true);
    })
    return response;
  };
  const logout = () => {
    removeCookie("token");
    LoginApi.logoutUser(cookies.token).then(() => setUser(undefined));
  };
  useEffect(() => {
    if (cookies.token === undefined) setUser(undefined);
    else
      LoginApi.getUser(cookies.token).then((res) => {
        setUser(res.data);
        setToken(cookies.token);
        setIsLogged(true);
      });
  }, [cookies.token]);

  return (
    <UserContext.Provider
      value={{
        setCart,
        registerUser,
        loginUser,
        logout,
        user,
        isLogged
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
