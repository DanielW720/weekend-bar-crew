import { supported_locales } from "@/middleware";

export default function getAlternateLanguages(lang: string, drink?: string) {
  let languages = new Map<string, string>();
  supported_locales.map((locale) => {
    if (locale != lang) {
      languages.set(locale, `/${locale}${drink ? `/${drink}` : ""}`);
    }
  });

  return Object.fromEntries(languages);
}
