"use client";

import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { langKeys, locales, localesType } from "@/data/locales";
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
        {Object.keys(langKeys).map((langKey) => {
          const typedLangKey = langKey as localesType[number];

          return (
            <DropdownMenuItem
              asChild
              className="cursor-pointer"
              key={typedLangKey}
            >
              <Link
                href={
                  path.replace(new RegExp(`(${locales.join("|")})`), "") +
                  searchParams.toString()
                }
                replaceLang={typedLangKey}
                className={cn(
                  locale === typedLangKey ? "bg-green text-semi-white" : "",
                  "w-full"
                )}
              >
                {langKeys[typedLangKey]}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchLang;
