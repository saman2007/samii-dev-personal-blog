import { yup } from "./yup";
import t from "@/translations/en/yupErrors.json";

export const signupAPIBodySchema = yup.object({
  email: yup.string().email().required("'email' is required."),
  username: yup
    .string()
    .required("Username is required.")
    .matches(/^[a-zA-Z]/, t["username_first_char_error"])
    .matches(/^[a-zA-Z0-9._]+$/, t["username_invalid_chars"])
    .matches(/^.{6,20}$/, t["username_length_error"]),
  password: yup
    .string()
    .required("Password is required")
    .matches(/(.*[a-z].*)/, t["lowercase_char_in_pass"])
    .matches(/^(?=.*[0-9])/, t["number_in_pass"]),
});

export type SignupAPIBody = yup.InferType<typeof signupAPIBodySchema>;
