"use client";

import { Params } from "@/types/types";
import AuthContainer from "../AuthContainer/AuthContainer";
import bgImg from "@/assets/images/sign-in-img.avif";
import { getTranslations } from "@/lib/translation";
import { FormProvider, useForm } from "react-hook-form";
import { InputRHF } from "@/components/UI/FormComponents/Input/Input";
import { FieldLabel } from "@/components/UI/FormComponents/FieldLabel/FieldLabel";
import Link from "@/components/Link/Link";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "@/data/staticRoutes";
import { Button } from "@/components/UI/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninData, signinSchema } from "@/lib/validationSchemas";
import { useRequest } from "@/hooks/useRequest";
import { signInAPI } from "@/api/auth";
import { toast } from "sonner";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { useParams, useRouter } from "next/navigation";
import { useSetStore } from "@/contexts/storeContext";

export interface SignInContainerProps {
  params: Params;
}

const SignInContainer = ({ params }: SignInContainerProps) => {
  const methods = useForm({ resolver: yupResolver(signinSchema) });
  const { execute: signIn, isLoading } = useRequest(signInAPI);
  const { replace } = useRouter();
  const { locale } = useParams<Params>();
  const setStore = useSetStore();

  const { t } = getTranslations(["common", "auth"], params);

  const onSubmit = async (data: SigninData) => {
    const signInRes = await signIn(data);

    toast.success(t("auth.signed_in_success"));

    setStore({
      auth: { isLoggedIn: true, user: signInRes.data.data, isLoading: false },
    });

    replace(`/${locale}/`);
  };

  return (
    <AuthContainer bgImg={bgImg}>
      <div className="w-full h-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-text-primary">
            {t("auth.sign_in_title")}
          </h1>
          <p className="mt-2 text-text-secondary">{t("auth.sign_in_desc")}</p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mb-2">
              <FieldLabel className="mb-2">{t("common.email")}</FieldLabel>
              <InputRHF
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-2">
              <FieldLabel className="mb-2">{t("common.password")}</FieldLabel>
              <InputRHF
                name="password"
                type="password"
                placeholder="●●●●●●●●"
              />
            </div>
            <div className="flex justify-end mb-5">
              <Link href={FORGOT_PASSWORD_ROUTE} className="text-green text-sm">
                {t("auth.forgot_pass")}
              </Link>
            </div>
            <Button
              variant="default"
              size="lg"
              className="text-base w-full mb-6"
              disabled={isLoading}
            >
              {isLoading ? <Spinner className="size-6" /> : t("common.sign_in")}
            </Button>
          </form>
        </FormProvider>
        <p className="text-center text-sm">
          {t("auth.dont_have_account")}{" "}
          <Link href={SIGN_UP_ROUTE} className="text-center text-green">
            {t("common.sign_up")}
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default SignInContainer;
