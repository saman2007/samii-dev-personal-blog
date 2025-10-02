import Link from "@/components/Link/Link";
import { Button } from "@/components/ui/button";
import TextLogo from "../TextLogo/TextLogo";
import {
  ARTICLES_ROUTE,
  CONTACT_ME_ROUTE,
  HOME_ROUTE,
  NEWEST_ARTICLES_ROUTE,
} from "@/data/staticRoutes";
import { getTranslations } from "@/lib/translation";
import { Params } from "@/types/types";
import DesktopNavigationItems from "./DesktopNavigationItems";
import ThemeSwitcher from "./ActionItems/ThemeSwitcher";
import SearchButton from "./ActionItems/SearchButton";
import MobileNavigationBar from "./MobileNavigationBar";
import SwitchLang from "./ActionItems/SwitchLang";

export interface NavigationItem {
  href: string;
  text: string;
}

interface NavigationBarProps {
  params: Params;
}

const NavigationBar = ({ params }: NavigationBarProps) => {
  const { t } = getTranslations(["common"], params);

  const navItems: NavigationItem[] = [
    { href: HOME_ROUTE, text: t("common.home") },
    { href: NEWEST_ARTICLES_ROUTE, text: t("common.newest_articles") },
    { href: ARTICLES_ROUTE, text: t("common.articles") },
    { href: CONTACT_ME_ROUTE, text: t("common.contact_me") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <TextLogo />
        </Link>

        <DesktopNavigationItems items={navItems} />

        <div className="flex items-center gap-2">
          <SearchButton />
          <ThemeSwitcher />
          <SwitchLang />
          <Button size="default" asChild className="ml-2 hidden md:flex">
            <Link href="/signin">{t("common.account")}</Link>
          </Button>

          <MobileNavigationBar items={navItems} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
