import { usersModel } from "@/db/models/UsersModel";
import { SignInAPIBody, SignupAPIBody } from "@/lib/apiValidationSchema";
import { axiosInstance } from "@/lib/axios";
import { InferSelectModel } from "drizzle-orm";

const SIGN_IN_PATH: string = "/api/sign-in";
const SIGN_UP_PATH: string = "/api/sign-up";

export const signInAPI = async (
  data: SignInAPIBody
): Promise<Omit<InferSelectModel<typeof usersModel>, "password">> => {
  return await axiosInstance.post(SIGN_IN_PATH, data);
};

export const signUpAPI = async (
  data: SignupAPIBody
): Promise<Omit<InferSelectModel<typeof usersModel>, "password">> => {
  return await axiosInstance.post(SIGN_UP_PATH, data);
};
