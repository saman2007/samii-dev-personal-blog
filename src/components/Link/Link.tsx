"use client";

import { localesType } from "@/data/locales";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export interface LinkProps
  extends Omit<React.ComponentProps<"a">, "href">,
    NextLinkProps {
  replaceLang?: localesType[number] | "none";
  children: React.ReactNode;
}

const Link = ({ href, children, replaceLang, ...other }: LinkProps) => {
  const { locale } = useParams();

  const newHref = `${
    replaceLang === "none" ? "" : replaceLang || locale
  }${href}`;

  return (
    <NextLink href={newHref} {...other}>
      {children}
    </NextLink>
  );
};

export default Link;
