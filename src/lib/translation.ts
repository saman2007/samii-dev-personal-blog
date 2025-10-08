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
  const t = (
    translateKey: string,
    translateData: Record<string, number | string> | undefined
  ): string => {
    const [file, key] = translateKey.split(".") as [string, string];

    let translatedLocaleKey = specifiedLocaleFiles[file][key] || key;

    if (translateData && Object.keys(translateData).length !== 0) {
      translatedLocaleKey = translatedLocaleKey.replaceAll(
        /\{(\w+)\}/,
        (_, dataKey) => translateData[dataKey].toString()
      );
    }

    return translatedLocaleKey;
  };

  return { t };
};
