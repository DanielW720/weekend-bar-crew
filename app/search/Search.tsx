"use client";

import React from "react";
import { Searchbar } from "./searchbar";
import { Tags } from "./tags";
import { roboto } from "../lib/globals/fonts";
import { useSearchParams } from "next/navigation";

export const Search = () => {
  const searchParams = useSearchParams();

  return (
    <div className={`${roboto.className} mb-10 mt-6 w-full max-w-xs px-4`}>
      <Searchbar query={searchParams.get("query")} />
      <Tags />
    </div>
  );
};
