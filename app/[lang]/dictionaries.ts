import "server-only";
import { Locale } from "../types";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  sv: () => import("./dictionaries/sv.json").then((module) => module.default),
  da: () => import("./dictionaries/da.json").then((module) => module.default),
  no: () => import("./dictionaries/no.json").then((module) => module.default),
  fi: () => import("./dictionaries/fi.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
