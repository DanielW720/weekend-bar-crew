"use client";

import React from "react";
import { useScroll } from "./lib/hooks/useScroll";

export const Header = () => {
  const scrollYposition = useScroll();
  const isScrolling = scrollYposition > 0;

  const transition = "transition-all duration-200 ease-out";

  return (
    <header
      data-scrolling={isScrolling}
      className={`group sticky top-0 z-[100] flex flex-row items-center justify-start border-b-4 border-beige bg-headerTransparent text-beige ${
        isScrolling
          ? "h-headerMobileScrolling"
          : "h-headerMobile backdrop-blur-sm"
      } ${transition}`}
    >
      <div
        className={`ml-8 flex h-full flex-row items-end pb-2 group-data-[scrolling=true]:scale-y-[0.925] group-data-[scrolling=true]:pb-1 ${transition}`}
      >
        <span
          className={`text-center text-[0.85rem] font-extrabold leading-6 tracking-[0.3rem]`}
        >
          <p>
            Weekend
            <br />
            Bar
            <br />
            Crew
          </p>
        </span>

        <p className="w-[150px] overflow-hidden text-[0.575rem] leading-4 tracking-widest xxs:ml-10">
          Discover hundreds of tasty and beautiful cocktails
        </p>
      </div>
    </header>
  );
};
