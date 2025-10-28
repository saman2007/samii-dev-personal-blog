import { SignInAPIBody, SignupAPIBody } from "@/lib/apiValidationSchema";
import { axiosInstance } from "@/lib/axios";
import { APIResponse, UserPrivateInfo } from "@/types/types";

const SIGN_IN_PATH: string = "/api/sign-in";
const SIGN_UP_PATH: string = "/api/sign-up";
const USER_PRIVATE_INFO_PATH: string = "/api/user-private-info";

export const signInAPI = async (data: SignInAPIBody) => {
  return await axiosInstance.post<APIResponse<UserPrivateInfo>>(
    SIGN_IN_PATH,
    data
  );
};

export const signUpAPI = async (data: SignupAPIBody) => {
  return await axiosInstance.post<APIResponse<UserPrivateInfo>>(
    SIGN_UP_PATH,
    data
  );
};

export const userPrivateInfoAPI = async () => {
  return await axiosInstance.get<APIResponse<UserPrivateInfo>>(
    USER_PRIVATE_INFO_PATH
  );
};
