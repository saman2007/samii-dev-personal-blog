"use client";

import { Params } from "@/types/types";
import AuthContainer from "../AuthContainer/AuthContainer";
import bgImg from "@/assets/images/sign-in-img.avif";
import { getTranslations } from "@/lib/translation";
import { FormProvider, useForm } from "react-hook-form";
import { InputRHF, InputUI } from "@/components/UI/FormComponents/Input/Input";
import { FieldLabel } from "@/components/UI/FormComponents/FieldLabel/FieldLabel";
import Link from "@/components/Link/Link";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "@/data/staticRoutes";
import { Button } from "@/components/UI/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninData, signinSchema } from "@/lib/validationSchemas";

export interface SignInContainerProps {
  params: Params;
}

const SignInContainer = ({ params }: SignInContainerProps) => {
  const methods = useForm({ resolver: zodResolver(signinSchema) });

  const { t } = getTranslations(["common", "auth"], params);

  const onSubmit = (data: SigninData) => {
    console.log(data);
  };

  return (
    <AuthContainer bgImg={bgImg}>
      <div className="w-full h-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-text-primary">
            Sign in to your account
          </h1>
          <p className="mt-2 text-text-secondary">
            Welcome back! Please enter your details.
          </p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mb-2">
              <FieldLabel className="mb-2">Email</FieldLabel>
              <InputRHF
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-2">
              <FieldLabel className="mb-2">Password</FieldLabel>
              <InputRHF
                name="password"
                type="password"
                placeholder="Your password"
              />
            </div>
            <div className="flex justify-end mb-5">
              <Link href={FORGOT_PASSWORD_ROUTE} className="text-green text-sm">
                Forgot password?
              </Link>
            </div>
            <Button
              variant="default"
              size="lg"
              className="text-base w-full mb-6"
            >
              Sign In
            </Button>
          </form>
        </FormProvider>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href={SIGN_UP_ROUTE} className="text-center text-green">
            Sign up
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default SignInContainer;
