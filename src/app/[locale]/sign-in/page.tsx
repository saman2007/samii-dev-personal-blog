import SignInContainer from "@/containers/Auth/SignInContainer/SignInContainer";
import { Params } from "@/types/types";
import React from "react";

const SignInPage = async ({ params }: { params: Promise<Params> }) => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-background">
      <SignInContainer params={await params} />
    </main>
  );
};

export default SignInPage;
