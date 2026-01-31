import * as yup from "yup";
import { ObjectSchema } from "yup";
import { ProfileEditFormType } from "./types";

export const profileEditSchema: ObjectSchema<ProfileEditFormType> = yup.object({
  password: yup
    .string()
    .optional()
    .min(8)
    .max(20)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])/),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")])
    .optional(),

  name: yup.string().required(),
  phone: yup.object({
    prefix: yup.string().required(),
    middle: yup.string().required(),
    last: yup.string().required(),
  }),
  email: yup.string().email().required(),
  address: yup.object({
    address: yup.string().required(),
    zipCode: yup.string().required(),
    address2: yup.string().required(),
  }),
  birthDate: yup.string().required(),
});
