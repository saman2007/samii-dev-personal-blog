import Link, { LinkProps } from "@/components/Link/Link";
import React from "react";
import {
  ARTICLES_ROUTE,
  CONTACT_ME_ROUTE,
  MONEY_SUPPORT_EN_ROUTE,
} from "@/data/staticRoutes";
import { cn } from "@/lib/utils";
import { Params } from "@/types/types";
import { getTranslations } from "@/lib/translation";
import { getDateParts } from "@/lib/time";

interface FooterLink extends Omit<LinkProps, "children"> {
  text: string;
}

export interface FooterProps {
  params: Params;
}

const Footer = ({ params }: FooterProps) => {
  const { t } = getTranslations(["common"], params);

  const footerLinks: FooterLink[] = [
    { href: ARTICLES_ROUTE, text: t("common.articles") },
    {
      href: MONEY_SUPPORT_EN_ROUTE,
      text: t("common.money_support"),
      rel: "noopener noreferrer",
      target: "_blank",
    },
    { href: CONTACT_ME_ROUTE, text: t("common.contact_me") },
  ];

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {footerLinks.map(({ href, text, ...other }) => (
              <Link
                href={href}
                {...other}
                key={text}
                className={cn(
                  "hover:text-green transition-colors",
                  other.className
                )}
              >
                {text}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-text-secondary text-center">
            {t("common.created_by_love")}
          </p>
          <p className="text-xs text-text-secondary">
            © {getDateParts(new Date(), params.locale).year}{" "}
            {t("common.all_rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
