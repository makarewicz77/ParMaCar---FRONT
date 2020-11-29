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
  const years = t("warrantyYear", { count: Number(warrs[0]) });
  const months = t("warrantyMonth", { count: Number(warrs[1]) });
  return `${warrs[0] && warrs[0] !== "0" ? years : ""} ${warrs[1] && warrs[1] !== "0" ? months : ""}`;
};
