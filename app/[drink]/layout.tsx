import React, { Suspense } from "react";
import { roboto } from "../lib/globals/fonts";
import Background from "./background";
import SearchButton from "./searchModal/searchButton";
import BackButton from "./backButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`px-6 ${roboto.className}`}>
      <Background />
      <div
        className="fixed left-0 z-10 mt-4 flex w-full justify-between px-6"
        id="back-and-search"
      >
        <Suspense fallback={<BackButtonFallback />}>
          <BackButton />
        </Suspense>
        <SearchButton />
      </div>
      <div className="py-12">{children}</div>
    </div>
  );
}

function BackButtonFallback() {
  return <div>Placeholder for BackButton</div>;
}
