"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NavigationItem } from "./NavigationBar";
import Link from "@/components/Link/Link";
import { useParams } from "next/navigation";
import { Params } from "@/types/types";
import { getTranslations } from "@/lib/translation";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "@/data/staticRoutes";

export interface MobileNavigationProps {
  items: NavigationItem[];
}

const MobileNavigationBar = ({ items }: MobileNavigationProps) => {
  const params = useParams<Params>();
  const [isOpen, setIsOpen] = useState(false);

  const { t } = getTranslations(["common"], params);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[250px] sm:w-[300px] p-5 flex flex-col items-center"
      >
        <div className="flex flex-col gap-6 mt-10 w-full">
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium text-text-secondary hover:text-green w-fit",
                  "animate-in slide-in-from-right-[100px]"
                )}
                style={{
                  transition: `transform ${200 * (i + 1) + "ms"}, color 200ms`,
                  // @ts-expect-error This is because tailwind uses this kind of pattern and tw-animate-css uses it, and I want to declare it inside `styles`
                  "--tw-duration": 200 * (i + 1) + "ms",
                }}
              >
                {item.text}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-y-2.5">
            <Button
              size="sm"
              asChild
              className="w-full animate-in slide-in-from-right-[100px]"
              style={{
                transition: `transform ${
                  200 * (items.length + 1) + "ms"
                }, background 200ms`,
                // @ts-expect-error This is because tailwind uses this kind of pattern and tw-animate-css uses it, and I want to declare it inside `styles`
                "--tw-duration": 200 * (items.length + 1) + "ms",
              }}
            >
              <Link href={SIGN_UP_ROUTE} onClick={() => setIsOpen(false)}>
                {t("common.sign_up")}
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
              variant="outline"
              className="w-full animate-in slide-in-from-right-[100px]"
              style={{
                transition: `transform ${
                  200 * (items.length + 1) + "ms"
                }, background 200ms`,
                // @ts-expect-error This is because tailwind uses this kind of pattern and tw-animate-css uses it, and I want to declare it inside `styles`
                "--tw-duration": 200 * (items.length + 2) + "ms",
              }}
            >
              <Link href={SIGN_IN_ROUTE} onClick={() => setIsOpen(false)}>
                {t("common.sign_in")}
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationBar;
