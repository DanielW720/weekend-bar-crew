import React from "react";
import { roboto } from "../lib/fonts";
import Background from "./background";
import BackAndSearchStickyButtons from "./backAndSearchButtons/backAndSearchStickyButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`px-6 ${roboto.className}`}>
      <Background />
      <BackAndSearchStickyButtons />
      {children}
    </div>
  );
}
