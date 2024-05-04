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
    <header className="group sticky top-0 z-[100] flex h-headerMobile w-full flex-row items-center justify-start border-b-4 border-beige bg-headerTransparent pl-[15%] text-beige backdrop-blur-sm xxs:justify-center sm:pl-0">
      <Suspense fallback={<SearchFallback />}>
        <LanguageSelection language={language} />
      </Suspense>
      <div className="flex h-full flex-row items-end gap-x-4 pb-2 group-data-[scrolling=true]:scale-y-[0.925] group-data-[scrolling=true]:pb-1 xxs:gap-x-8 sm:gap-x-16 ">
        <HeaderLogo />
        <p className="w-[150px] overflow-hidden text-[0.575rem] leading-4 tracking-widest md:mb-2 md:w-[200px] md:text-[0.7rem] md:leading-5">
          {slogan}
        </p>
      </div>
    </header>
  );
}

// TODO: Update fallback component
function SearchFallback() {
  return <div>Loading...</div>;
}
