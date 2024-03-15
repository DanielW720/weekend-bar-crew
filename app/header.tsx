"use client";

import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="group sticky top-0 z-[100] flex h-headerMobile w-full flex-row items-center justify-start border-b-4 border-beige bg-headerTransparent text-beige backdrop-blur-sm xxs:justify-center">
      <div className="ml-8 flex h-full flex-row items-end gap-x-4 pb-2 group-data-[scrolling=true]:scale-y-[0.925] group-data-[scrolling=true]:pb-1 xxs:gap-x-8 sm:gap-x-16 ">
        <Link
          href="/"
          target="_parent"
          className="w-fit text-center text-[0.85rem] font-extrabold leading-6 tracking-[0.3rem]"
        >
          <h1>
            Weekend
            <br />
            Bar
            <br />
            Crew
          </h1>
        </Link>

        <p className="w-[150px] overflow-hidden text-[0.575rem] leading-4 tracking-widest md:mb-2 md:w-[200px] md:text-[0.7rem] md:leading-5">
          Discover hundreds of tasty and beautiful cocktails
        </p>
      </div>
    </header>
  );
};
