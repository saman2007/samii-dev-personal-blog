import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Negotiator from "negotiator";
import { locales } from "@/data/locales";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getPreferredLocale = (
  acceptLanguages: string | undefined
): (typeof locales)[number] => {
  const negotiator = new Negotiator({
    headers: { "accept-language": acceptLanguages },
  });

  return (negotiator.language(locales) as (typeof locales)[number]) || "en";
};

export const isValidUrl = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};
