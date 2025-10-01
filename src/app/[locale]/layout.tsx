import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { locales } from "@/data/locales";
import { Params } from "@/types/types";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["400", "500", "700", "900"],
  fallback: ["Roboto"],
});

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-main",
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

  return (
    <html
      dir={locale === "en" ? "ltr" : "rtl"}
      lang={locale}
      className={cn(locale === "fa" ? vazir.variable : inter.variable)}
    >
      <body>
        <NavigationBar params={extractedParams} />
        {children}
      </body>
    </html>
  );
}
