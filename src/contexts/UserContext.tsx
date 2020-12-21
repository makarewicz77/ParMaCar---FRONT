import { AxiosResponse } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LoginApi } from "../api/loginApi";
import { User } from "../models/user";

export interface UserContextInterface {
  setCart: (obj: any) => void;
  registerUser: (user: Partial<User>) => Promise<unknown>;
  loginFromRegister: (user: any) => Promise<unknown>;
  loginUser: (user: Partial<User>) => Promise<AxiosResponse<User>>;
  logout: () => void;
  user: User | undefined;
  isLogged: boolean;
}
export const UserContext = createContext<UserContextInterface>({
  setCart: () => {},
  registerUser: () => ({} as Promise<unknown>),
  loginFromRegister: (user: any) => ({} as Promise<unknown>),
  loginUser: () => ({} as Promise<AxiosResponse<User>>),
  logout: () => {},
  user: undefined,
  isLogged: false,
});

export const UserProvider: React.FC = ({ children }) => {
  const [, setCart] = useState({});
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [, setToken] = useState<string>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const registerUser = (user: Partial<User>) => {
    const promise = new Promise((resolve, reject) => {
      resolve(LoginApi.registerUser(user));
    });
    return promise;
  };
  const loginUser = (user: Partial<User>) => {
    const response = LoginApi.loginUser(user);
    response.then((res) => {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogged(true);
    });
    return response;
  };
  const logout = () => {
    removeCookie("token");
    LoginApi.logoutUser(cookies.token).then(() => setUser(undefined));
  };
  const loginFromRegister = (user: any) => {
    console.log(user);
    return new Promise((resolve, reject) => {
      setToken(user.token);
      setUser(user.user);
      setToken(user.token);
      setIsLogged(true);
      resolve(() => {});
    });
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
        loginFromRegister,
        loginUser,
        logout,
        user,
        isLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
