"use client";

import React, { Suspense } from "react";
import { Searchbar } from "./searchbar";
import { Tags } from "./tags";
import { roboto } from "../lib/globals/fonts";

export const Search = () => {
  return (
    <div className={`${roboto.className} mb-10 mt-6 w-full max-w-xs px-4`}>
      <Suspense fallback={<SearchbarTagsFallback />}>
        <Searchbar />
        <Tags />
      </Suspense>
    </div>
  );
};

function SearchbarTagsFallback() {
  return <div>Placeholder for Searchbar and Tags</div>;
}
