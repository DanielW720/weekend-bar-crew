import { Inknut_Antiqua, Roboto } from "next/font/google";

export const inknut_antiqua = Inknut_Antiqua({
  weight: ["800", "700", "300"],
  subsets: ["devanagari"],
});

export const roboto = Roboto({
  weight: ["400"],
  subsets: ["cyrillic"],
});
