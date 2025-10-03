import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Params } from "@/types/types";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Params>;
}>) {
  const extractedParams = await params;
  const { locale } = extractedParams;
  const selectedTheme = (await cookies()).get("theme");

  return (
    <html
      dir={locale === "en" ? "ltr" : "rtl"}
      lang={locale}
      className={cn(
        vazir.variable,
        inter.variable,
        selectedTheme?.value === "dark" && "dark",
        locale === "fa" ? vazir.className : inter.className
      )}
    >
      <body>
        <NavigationBar
          params={extractedParams}
          defaultTheme={selectedTheme?.value}
        />
        {children}
        <Footer params={extractedParams} />
      </body>
    </html>
  );
}
