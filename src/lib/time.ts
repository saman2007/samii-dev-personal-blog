import { LocalesType } from "@/data/locales";
import { DateArg } from "@/types/types";

export const dateAndTimeLocaleFormat: Record<LocalesType[number], string> = {
  en: "en-US",
  fa: "fa-IR-u-ca-persian",
};

export const getFullDate = (
  date: DateArg,
  locale: LocalesType[number] = "en"
): string => {
  return locale === "fa"
    ? new Intl.DateTimeFormat(dateAndTimeLocaleFormat.fa, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date))
    : new Date(date).toLocaleDateString(dateAndTimeLocaleFormat.en, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

export const getDateParts = (
  date: DateArg,
  locale: LocalesType[number] = "en",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): Partial<
  Record<Intl.DateTimeFormatPart["type"], Intl.DateTimeFormatPart["value"]>
> => {
  const dateObj = new Date(date);

  const resolvedLocale = dateAndTimeLocaleFormat[locale] || "en-US";

  const formatter = new Intl.DateTimeFormat(resolvedLocale, options);
  const parts = formatter.formatToParts(dateObj);

  const result: Record<string, string> = {};

  parts.forEach(({ type, value }) => {
    result[type] = value;
  });

  return result as Partial<
    Record<Intl.DateTimeFormatPart["type"], Intl.DateTimeFormatPart["value"]>
  >;
};
