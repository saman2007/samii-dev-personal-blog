"use client";

import Link from "@/components/Link/Link";
import { Button } from "@/components/UI/Button/Button";
import TextLogo from "../TextLogo/TextLogo";
import {
  ARTICLES_ROUTE,
  CONTACT_ME_ROUTE,
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "@/data/staticRoutes";
import { getTranslations } from "@/lib/translation";
import { Params } from "@/types/types";
import DesktopNavigationItems from "./DesktopNavigationItems";
import ThemeSwitcher from "./ActionItems/ThemeSwitcher";
import SearchButton from "./ActionItems/SearchButton";
import MobileNavigationBar from "./MobileNavigationBar";
import SwitchLang from "./ActionItems/SwitchLang";
import { useParams } from "next/navigation";
import { useStoreData } from "@/contexts/storeContext";
import AvatarItem from "./AvatarItem/AvatarItem";

export interface NavigationItem {
  href: string;
  text: string;
}

interface NavigationBarProps {
  defaultTheme: string | null;
}

const NavigationBar = ({ defaultTheme }: NavigationBarProps) => {
  const params = useParams<Params>();
  const {
    auth: { isLoggedIn, isLoading, user },
  } = useStoreData();

  const { t } = getTranslations(["common"], params);

  const navItems: NavigationItem[] = [
    { href: HOME_ROUTE, text: t("common.home") },
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
          <ThemeSwitcher defaultTheme={defaultTheme} />
          <SwitchLang />
          <div className="gap-x-1 hidden md:flex">
            {isLoading || isLoggedIn ? (
              <AvatarItem
                isLoading={isLoading}
                avatarImg={user?.profileImg}
                fallbackWord={user?.username?.[0]}
              />
            ) : (
              <>
                <Button
                  size="default"
                  variant="outline"
                  asChild
                  className="ml-2 w-[5.3rem]"
                >
                  <Link href={SIGN_IN_ROUTE}>{t("common.sign_in")}</Link>
                </Button>
                <Button size="default" asChild className="ml-2 w-[5.3rem]">
                  <Link href={SIGN_UP_ROUTE}>{t("common.sign_up")}</Link>
                </Button>
              </>
            )}
          </div>

          <MobileNavigationBar items={navItems} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
