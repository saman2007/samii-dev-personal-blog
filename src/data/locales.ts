export type localesType = ["en", "fa"];
export type langKeyType = { [K in localesType[number]]: string };
export const locales: localesType = ["en", "fa"];
export const langKeys: langKeyType = { en: "EN", fa: "فارسی" };
