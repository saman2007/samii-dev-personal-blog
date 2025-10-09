"use client";

import { Params } from "@/types/types";
import AuthContainer from "../AuthContainer/AuthContainer";
import bgImg from "@/assets/images/sign-up-img.png";
import { getTranslations } from "@/lib/translation";
import { FormProvider, useForm } from "react-hook-form";
import { FieldLabel } from "@/components/UI/FormComponents/FieldLabel/FieldLabel";
import { InputRHF } from "@/components/UI/FormComponents/Input/Input";
import Link from "@/components/Link/Link";
import { Button } from "@/components/UI/Button/Button";
import { SIGN_IN_ROUTE } from "@/data/staticRoutes";
import { SignupData, signupSchema } from "@/lib/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

export interface SignUpContainerProps {
  params: Params;
}

const SignUpContainer = ({ params }: SignUpContainerProps) => {
  const methods = useForm({ resolver: yupResolver(signupSchema) });

  const { t } = getTranslations(["common", "auth"], params);

  const onSubmit = (data: SignupData) => {
    console.log(data);
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
              <FieldLabel className="mb-2">{t("common.username")}</FieldLabel>
              <InputRHF name="username" type="text" placeholder="username" />
            </div>
            <div className="mb-2">
              <FieldLabel className="mb-2">{t("common.password")}</FieldLabel>
              <InputRHF
                name="password"
                type="password"
                placeholder="●●●●●●●●"
              />
            </div>
            <div className="mb-5">
              <FieldLabel className="mb-2">
                {t("common.repeat_password")}
              </FieldLabel>
              <InputRHF
                name="repeatPassword"
                type="password"
                placeholder="●●●●●●●●"
              />
            </div>
            <Button
              variant="default"
              size="lg"
              className="text-base w-full mb-6"
            >
              {t("common.sign_up")}
            </Button>
          </form>
        </FormProvider>
        <p className="text-center text-sm">
          {t("auth.have_account")}{" "}
          <Link href={SIGN_IN_ROUTE} className="text-center text-green">
            {t("common.sign_in")}
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default SignUpContainer;
