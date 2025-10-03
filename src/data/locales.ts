export type LocalesType = ["en", "fa"];
export type LocalesInfo = {
  [K in LocalesType[number]]: { label: string; font: string; dir: string };
};
export const localesInfo = {
  en: {
    label: "English",
    font: "font-inter",
    dir: "ltr",
  },
  fa: { label: "فارسی", font: "font-vazir", dir: "rtl" },
};
export const locales = Object.keys(localesInfo) as LocalesType;
