import axios from "axios";

import { crud } from "../hooks";
import { User } from "../models/user";
import { register } from "../serviceWorker";
import {
  baseLoginUrl,
  baseUserUrl,
  baseLogoutUrl,
  baseRegisterUrl,
} from "./urls";

type UserParams = {};

export const LoginApi = {
  ...crud<User, UserParams>(baseLoginUrl),
  getUser: (token: string, setLogedUser: Function) => {
    axios
      .request({
        url: baseUserUrl,
        headers: { Authorization: "Token " + token },
      })
      .then((res) => setLogedUser(res.data));
  },
  logoutUser: (token: string, setLogedUser: Function) => {
    axios
      .request({
        url: baseLogoutUrl,
        headers: { Authorization: "Token " + token },
        method: "POST",
      })
      .then((res) => setLogedUser(undefined));
  },
  registerUser: (user: Partial<User>) => {
    axios
      .request({
        url: baseRegisterUrl,
        method: "POST",
        data: user,
      })
      .then((res) => console.log(res));
  },
};
