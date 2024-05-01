import React from "react";
import HeaderLogo from "./headerLogo";

export default async function Header({ slogan }: { slogan: string }) {
  return (
    <header className="group sticky top-0 z-[100] flex h-headerMobile w-full flex-row items-center justify-start border-b-4 border-beige bg-headerTransparent text-beige backdrop-blur-sm xxs:justify-center">
      <div className="ml-8 flex h-full flex-row items-end gap-x-4 pb-2 group-data-[scrolling=true]:scale-y-[0.925] group-data-[scrolling=true]:pb-1 xxs:gap-x-8 sm:gap-x-16 ">
        <HeaderLogo />

        <p className="w-[150px] overflow-hidden text-[0.575rem] leading-4 tracking-widest md:mb-2 md:w-[200px] md:text-[0.7rem] md:leading-5">
          {slogan}
        </p>
      </div>
    </header>
  );
}
