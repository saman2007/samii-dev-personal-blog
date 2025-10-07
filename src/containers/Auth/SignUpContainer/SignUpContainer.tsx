import { Params } from "@/types/types";
import AuthContainer from "../AuthContainer/AuthContainer";
import bgImg from "@/assets/images/sign-up-img.png";
import { getTranslations } from "@/lib/translation";

export interface SignUpContainerProps {
  params: Params;
}

const SignUpContainer = ({ params }: SignUpContainerProps) => {
  const { t } = getTranslations(["common", "auth"], params);

  return (
    <AuthContainer bgImg={bgImg}>
      <div className="w-full h-full">
        <h1 className="text-2xl font-bold text-text-primary">
          Create an account
        </h1>
        <p className="mt-2 text-text-secondary">Welcome!</p>
      </div>
    </AuthContainer>
  );
};

export default SignUpContainer;
