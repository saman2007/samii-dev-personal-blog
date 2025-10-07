import Image, { StaticImageData } from "next/image";

export interface AuthContainerProps {
  children: React.ReactNode;
  bgImg: StaticImageData | string;
}

const AuthContainer = ({ children, bgImg }: AuthContainerProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative grid grid-cols-1 overflow-hidden border rounded-lg shadow-xl md:grid-cols-2 bg-block border-border min-h-72">
        <div className="relative hidden h-full md:block">
          <Image
            className="object-cover w-full h-full"
            src={bgImg}
            fill
            alt="Sign in background image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
