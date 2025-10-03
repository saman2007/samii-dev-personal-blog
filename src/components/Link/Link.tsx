"use client";

import { LocalesType } from "@/data/locales";
import { isValidUrl } from "@/lib/utils";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export interface LinkProps
  extends Omit<React.ComponentProps<"a">, "href">,
    NextLinkProps {
  replaceLang?: LocalesType[number];
  children: React.ReactNode;
}

const Link = ({ href, children, replaceLang, ...other }: LinkProps) => {
  const { locale } = useParams();

  let localizedHref: typeof href;

  if (typeof href === "string") {
    if (isValidUrl(href)) {
      // external link → don’t touch
      localizedHref = href;
    } else {
      // internal path → add locale
      localizedHref = `/${replaceLang || locale}${
        href.startsWith("/") ? href : `/${href}`
      }`;
    }
  } else {
    // Object form
    const path = href.pathname ?? "";
    localizedHref = {
      ...href,
      pathname: path.startsWith("/")
        ? `/${replaceLang || locale}${path}`
        : `/${replaceLang || locale}/${path}`,
    };
  }

  return (
    <NextLink href={localizedHref} {...other}>
      {children}
    </NextLink>
  );
};

export default Link;
