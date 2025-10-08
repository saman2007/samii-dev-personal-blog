import { yup } from "./yup";

export const signinSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type SigninData = yup.InferType<typeof signinSchema>;
