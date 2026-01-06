import React, { Suspense } from "react";
import HeaderLogo from "./headerLogo";
import LanguageSelection from "./languageSelection";

export default async function Header({
  slogan,
  language,
}: {
  slogan: string;
  language: string;
}) {
  return (
    <header
      className="group sticky top-0 z-[100] flex h-headerMobile w-full flex-row items-center justify-center border-b-4 border-beige bg-headerTransparent text-beige backdrop-blur-sm shadow-lg shadow-beige/10 transition-shadow duration-300 sm:pl-[15%] sm:justify-start"
      aria-label="Main header"
    >
      <Suspense fallback={<LanguageSelectionFallback />}>
        <LanguageSelection language={language} />
      </Suspense>
      <div className="flex h-full flex-row items-end gap-x-4 pb-2 group-data-[scrolling=true]:scale-y-[0.925] group-data-[scrolling=true]:pb-1 xxs:gap-x-8 sm:gap-x-16 ">
        <HeaderLogo />
        <p
          className="hidden text-[0.65rem] leading-5 tracking-widest text-beige/90 transition-colors duration-300 group-hover:text-beige sm:block sm:w-[200px] sm:text-[0.75rem] sm:leading-6"
          aria-label="Website slogan"
        >
          {slogan}
        </p>
      </div>
    </header>
  );
}

function LanguageSelectionFallback() {
  return (
    <div
      className="h-10 w-16 animate-pulse rounded bg-beige/20"
      aria-hidden="true"
    />
  );
}
