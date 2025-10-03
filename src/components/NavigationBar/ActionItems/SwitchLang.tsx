"use client";

import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, localesInfo } from "@/data/locales";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Params } from "@/types/types";
import { Button } from "@/components/ui/button";
import Link from "@/components/Link/Link";
import { cn } from "@/lib/utils";

const SwitchLang = () => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams<Params>();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change language">
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((localeKey) => {
          return (
            <DropdownMenuItem
              asChild
              className="cursor-pointer transition-colors"
              key={localeKey}
            >
              <Link
                href={
                  path.replace(new RegExp(`(${locales.join("|")})`), "") +
                  searchParams.toString()
                }
                replaceLang={localeKey}
                className={cn(
                  locale === localeKey ? "bg-green text-semi-white" : "",
                  "w-full",
                  localesInfo[localeKey].font
                )}
                dir={localesInfo[localeKey].dir}
              >
                {localesInfo[localeKey].label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchLang;
