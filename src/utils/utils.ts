import Form, { FormInstance } from "antd/lib/form";
import { useImperativeHandle, Ref } from "react";
import { environment } from "../environment";

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

export const getImageUrl = (image: string) =>{
  return environment.apiToImages + image;
}

export const cutDescription = (description:string) =>{
  return description.slice(0,56) + `...`
}