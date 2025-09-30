import { locales } from "@/data/locales";

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [key: string]: Translation;
}

export interface Params {
  locale: (typeof locales)[number];
  [key: string]: string | undefined;
}

export type LocalesTranslations = {
  [key in (typeof locales)[number]]: Translations;
};
