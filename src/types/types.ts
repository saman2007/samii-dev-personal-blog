import { LocalesType } from "@/data/locales";

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [key: string]: Translation;
}

export interface Params {
  locale: LocalesType[number];
  [key: string]: string | undefined;
}

export type LocalesTranslations = {
  [key in LocalesType[number]]: Translations;
};

export type Themes = ["light", "dark"];
