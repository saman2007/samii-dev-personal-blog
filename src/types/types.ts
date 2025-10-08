import { LocalesType } from "@/data/locales";

export type Translation = Record<string, string>;

export type Translations = Record<string, Translation>;

export interface Params {
  locale: LocalesType[number];
  [key: string]: string | undefined;
}

export type LocalesTranslations = Record<LocalesType[number], Translations>;

export type Themes = ["light", "dark"];

export type DateArg = Date | string | number;

export interface YupErrorMessage {
  key: string;
  data: Record<string, number | string>;
}
