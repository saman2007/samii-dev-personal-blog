import SignUpContainer from "@/containers/Auth/SignUpContainer/SignUpContainer";
import { Params } from "@/types/types";
import React from "react";

const SignUpPage = async ({ params }: { params: Promise<Params> }) => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-background">
      <SignUpContainer params={await params} />
    </main>
  );
};

export default SignUpPage;
