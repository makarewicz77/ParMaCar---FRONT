import Form, { FormInstance } from "antd/lib/form";
import { TFunction } from "i18next";
import { useImperativeHandle, Ref } from "react";
import { environment } from "../environment";
import logo from "../static/images/ParMaCar2.png";

export const useFormWithRef = (ref?: Ref<FormInstance>) => {
  const form = Form.useForm();
  useImperativeHandle(ref, () => form[0]);
  return form;
};

export const addHours = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
};

export const getImageUrl = (image: string) => {
  return environment.apiToImages + image;
};

export const cutDescription = (description: string) => {
  return description.slice(0, 56) + `...`;
};

export const LogoIcon = logo;

export const getWarranty = (t: TFunction, warranty: string) => {
  const warrs = warranty.split("+");
  const years = t(
    `warrantyYear_${Number(warrs[0]) === 1 ? 0 : Number(warrs[0]) < 5 ? 1 : 2}`,
    { count: Number(warrs[0]) }
  );
  const months = t(
    `warrantyMonth_${
      Number(warrs[1]) === 1 ? 0 : Number(warrs[1]) < 5 ? 1 : 2
    }`,
    { count: Number(warrs[1]) }
  );
  return `${warrs[0] && warrs[0] !== "0" ? years : ""} ${
    warrs[1] && warrs[1] !== "0" ? months : ""
  }`;
};

export const getLinkToProduct = (id: number, name: string) => {
  return `/product/${name}/${id}/`;
};

export const getLinkToCategory = (id: number, name: string) => {
  return `/category/${name}/${id}/`;
};

export const getCookie = (cname: any) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
