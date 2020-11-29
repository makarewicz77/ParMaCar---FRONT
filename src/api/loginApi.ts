import axios from "axios";
import { User } from "../models/user";
import {
  baseLoginUrl,
  baseUserUrl,
  baseLogoutUrl,
  baseRegisterUrl,
} from "./urls";

type UserParams = {};

export const LoginApi = {
  loginUser: (partialUser: Partial<User>) => {
    return axios.request({
      url: baseLoginUrl,
      data: partialUser,
      method: "POST",
    });
  },
  getUser: (token: string) => {
    return axios.request({
      url: baseUserUrl,
      headers: { Authorization: "Token " + token },
    });
  },
  logoutUser: (token: string) => {
    return axios.request({
      url: baseLogoutUrl,
      headers: { Authorization: "Token " + token },
      method: "POST",
    });
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
