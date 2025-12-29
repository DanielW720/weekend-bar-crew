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
  params: Promise<{ lang: string; drink: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className={`px-6`}>
      <Background />
      <BackAndSearchStickyButtons search={dict.search} />
      {children}
    </div>
  );
}
