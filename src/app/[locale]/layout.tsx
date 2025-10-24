import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Params, Themes } from "@/types/types";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { Toaster } from "@/components/UI/Sonner/Sonner";
import StoreProvider from "@/contexts/storeContext";
import AxiosInterceptor from "@/providers/AxiosInterceptor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700", "900"],
  fallback: ["Roboto"],
});

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  weight: ["400", "500", "700", "900"],
  fallback: ["Roboto"],
});

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Params>;
}>) => {
  const extractedParams = await params;
  const { locale } = extractedParams;
  const c = await cookies();
  const selectedThemeCookie = c.get("theme");
  const selectedTheme: Themes[number] | null = selectedThemeCookie?.value
    ? selectedThemeCookie?.value === "dark"
      ? "dark"
      : "light"
    : null;
  const hasAuthCred = c.has("refresh__token") && c.has("access_token");

  return (
    <html
      dir={locale === "en" ? "ltr" : "rtl"}
      lang={locale}
      className={cn(
        vazir.variable,
        inter.variable,
        selectedTheme === "dark" && "dark",
        locale === "fa" ? vazir.className : inter.className
      )}
    >
      <body>
        <AxiosInterceptor>
          <StoreProvider
            defaultStoreData={{
              theme: selectedTheme,
              auth: {
                user: null,
                isLoggedIn: hasAuthCred,
                isLoading: hasAuthCred,
              },
            }}
          >
            <NavigationBar
              params={extractedParams}
              defaultTheme={selectedTheme}
            />
            {children}
            <Toaster />
            <Footer params={extractedParams} />
          </StoreProvider>
        </AxiosInterceptor>
      </body>
    </html>
  );
};

export default RootLayout;
