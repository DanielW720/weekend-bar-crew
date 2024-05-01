import React from "react";
import Background from "./background";
import BackAndSearchStickyButtons from "./backAndSearchButtons/backAndSearchStickyButton";
import { Locale } from "@/app/types";
import { getDictionary } from "../dictionaries";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <div className={`px-6`}>
      <Background />
      <BackAndSearchStickyButtons search={dict.search} />
      {children}
    </div>
  );
}
