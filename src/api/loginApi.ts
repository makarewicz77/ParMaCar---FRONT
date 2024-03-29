import axios from "axios";
import { User } from "../models/user";
import {
  baseLoginUrl,
  baseUserUrl,
  baseLogoutUrl,
  baseRegisterUrl,
  baseMechanicsUrl,
} from "./urls";

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
  registerUser: (user: Partial<User>,group:string) => {
    return axios
      .request({
        url: baseRegisterUrl,
        method: "POST",
        data: {...user, group},
      })
  },
  getMechanics: (id?:number) => {
    return axios.request({
      url: `${baseMechanicsUrl}`,
      method: "GET",
      params:{
        user_id: id
      }
    });
  },
  getMechanic: (id: number) => {
    return axios.request({
      url: `${baseMechanicsUrl}${id}/`,
      method: "GET",
    });
  },
};
