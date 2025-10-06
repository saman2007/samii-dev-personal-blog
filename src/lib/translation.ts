import { locales } from "@/translations/locales";
import { Params, Translations } from "@/types/types";

export const getTranslations = (
  localeFiles: (keyof (typeof locales)[keyof typeof locales])[],
  params: Params
) => {
  const { locale } = params;

  const specifiedLocaleFiles: Translations = {};

  localeFiles.forEach((localeFile) => {
    specifiedLocaleFiles[localeFile] = locales[locale][localeFile];
  });

  //`translateKey` must be in this format: `<translation_file>.<key_in_translation_file>`
  const t = (translateKey: string): string => {
    const [file, key] = translateKey.split(".") as [string, string];

    return specifiedLocaleFiles[file][key] || key;
  };

  return { t };
};
