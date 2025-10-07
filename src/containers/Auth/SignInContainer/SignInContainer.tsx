import { Params } from "@/types/types";
import AuthContainer from "../AuthContainer/AuthContainer";
import bgImg from "@/assets/images/sign-in-img.avif";
import { getTranslations } from "@/lib/translation";

export interface SignInContainerProps {
  params: Params;
}

const SignInContainer = ({ params }: SignInContainerProps) => {
  const { t } = getTranslations(["common", "auth"], params);

  return (
    <AuthContainer bgImg={bgImg}>
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold text-text-primary">
          Sign in to your account
        </h1>
        <p className="mt-2 text-text-secondary">
          Welcome back! Please enter your details.
        </p>
      </div>
    </AuthContainer>
  );
};

export default SignInContainer;
