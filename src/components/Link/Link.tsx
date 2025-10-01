"use client";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export interface LinkProps
  extends Omit<React.ComponentProps<"a">, "href">,
    NextLinkProps {
  children: React.ReactNode;
}

const Link = ({ href, children, ...other }: LinkProps) => {
  const { locale } = useParams();

  const newHref = `${locale}${href}`;

  return (
    <NextLink href={newHref} {...other}>
      {children}
    </NextLink>
  );
};

export default Link;
