import { yup } from "./yup";

export const signinSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type SigninData = yup.InferType<typeof signinSchema>;

export const signupSchema = yup.object({
  email: yup.string().email().required(),
  username: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]/, { message: { key: "username_first_char_error" } })
    .matches(/^[a-zA-Z0-9._]+$/, { message: { key: "username_invalid_chars" } })
    .matches(/^.{6,20}$/, { message: { key: "username_length_error" } }),
  password: yup
    .string()
    .required()
    .matches(/(.*[a-z].*)/, {
      message: { key: "lowercase_char_in_pass" },
    })
    .matches(/^(?=.*[0-9])/, {
      message: { key: "number_in_pass" },
    }),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], { key: "repeat_pass" })
    .required(),
});

export type SignupData = yup.InferType<typeof signupSchema>;
