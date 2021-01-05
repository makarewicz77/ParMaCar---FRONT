import { AxiosResponse } from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LoginApi } from "../api/loginApi";
import { User } from "../models/user";

export interface UserContextInterface {
  registerUser: (user: Partial<User>, group: string) => Promise<unknown>;
  loginFromRegister: (user: any) => Promise<unknown>;
  loginUser: (user: Partial<User>) => Promise<AxiosResponse<User>>;
  logout: () => void;
  user: User | undefined;
  isLogged: boolean;
  mechanicId: number | undefined;
}
export const UserContext = createContext<UserContextInterface>({
  registerUser: () => ({} as Promise<unknown>),
  loginFromRegister: () => ({} as Promise<unknown>),
  loginUser: () => ({} as Promise<AxiosResponse<User>>),
  logout: () => {},
  user: undefined,
  isLogged: false,
  mechanicId: undefined,
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [, setToken] = useState<string>("");
  const [mechanicId, setMechanicId] = useState<number | undefined>(undefined);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const registerUser = (user: Partial<User>, group: string) => {
    const promise = new Promise((resolve) => {
      resolve(LoginApi.registerUser(user, group));
    });
    return promise;
  };
  const loginUser = (user: Partial<User>) => {
    const response = LoginApi.loginUser(user);
    response.then((res) => {
      setToken(res.data.token);
      setUser(res.data.user);
      setIsLogged(true);
      if (res.data.user.groups[0].name === "Mechanic") {
        LoginApi.getMechanics(res.data.user.id).then((mechanic) => {
          setMechanicId(mechanic.data[0].id);
        });
      }
    });
    return response;
  };
  const logout = () => {
    removeCookie("token");
    LoginApi.logoutUser(cookies.token).then(() => {
      setUser(undefined);
      setIsLogged(false);
    });
  };
  const loginFromRegister = (user: any) => {
    return new Promise((resolve) => {
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
        if (res.data.groups[0].name === "Mechanic") {
          LoginApi.getMechanics(res.data.id).then((mechanic) => {
            setMechanicId(mechanic.data[0].id);
          });
        }
      });
  }, [cookies.token]);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginFromRegister,
        loginUser,
        logout,
        user,
        isLogged,
        mechanicId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
