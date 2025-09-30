import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, vazir.variable)}>
      <body>{children}</body>
    </html>
  );
}
