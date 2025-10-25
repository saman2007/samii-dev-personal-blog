import { SignInAPIBody, SignupAPIBody } from "@/lib/apiValidationSchema";
import { axiosInstance } from "@/lib/axios";
import { APIResponse, UserPrivateInfo } from "@/types/types";

const SIGN_IN_PATH: string = "/api/sign-in";
const SIGN_UP_PATH: string = "/api/sign-up";
const USER_PRIVATE_INFO_PATH: string = "/api/user-private-info";

export const signInAPI = async (
  data: SignInAPIBody
): Promise<APIResponse<UserPrivateInfo>> => {
  return await axiosInstance.post(SIGN_IN_PATH, data);
};

export const signUpAPI = async (
  data: SignupAPIBody
): Promise<APIResponse<UserPrivateInfo>> => {
  return await axiosInstance.post(SIGN_UP_PATH, data);
};

export const userPrivateInfoAPI = async (): Promise<
  APIResponse<UserPrivateInfo>
> => {
  return await axiosInstance.get(USER_PRIVATE_INFO_PATH);
};
