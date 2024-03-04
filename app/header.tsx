"use client";

import React from "react";
import { useScroll } from "./lib/hooks/useScroll";
import Link from "next/link";

export const Header = () => {
  const scrollYposition = useScroll();
  const isScrolling = scrollYposition > 0;

  const transition = "transition-all duration-300";

  return (
    <header
      data-scrolling={isScrolling}
      className={`group sticky top-0 z-[100] flex w-full flex-row items-center justify-start border-b-4 border-beige bg-headerTransparent text-beige backdrop-blur-sm xxs:justify-center ${
        isScrolling ? "h-headerMobileScrolling" : "h-headerMobile"
      } ${transition}`}
    >
      <div
        className={`ml-8 flex h-full flex-row items-end pb-2 group-data-[scrolling=true]:scale-y-[0.925] group-data-[scrolling=true]:pb-1 ${transition}`}
      >
        <Link
          href="/"
          target="_parent"
          className={`w-fit text-center text-[0.85rem] font-extrabold leading-6 tracking-[0.3rem]`}
        >
          <h1>
            Weekend
            <br />
            Bar
            <br />
            Crew
          </h1>
        </Link>

        <p className="w-[150px] overflow-hidden text-[0.575rem] leading-4 tracking-widest xxs:ml-10">
          Discover hundreds of tasty and beautiful cocktails
        </p>
      </div>
    </header>
  );
};
