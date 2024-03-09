"use client";

import React, { Suspense } from "react";
import { Searchbar } from "./searchbar";
import { Tags } from "./tags";
import { roboto } from "../lib/globals/fonts";
import ResultGrid from "./resultGrid";
import useSearchDrinks from "../hooks/useSearchDrinks";

export const Search = () => {
  // Get list of drinks according to query and tags in search params
  const [items, loading] = useSearchDrinks();

  return (
    <div
      className={`${roboto.className} mt-6 flex w-full flex-col items-center md:mt-12`}
    >
      <Suspense fallback={<SearchFallback />}>
        <div className="max-w-xs px-4">
          <Searchbar />
          <Tags />
        </div>
        <ResultGrid items={items} loading={loading} />
      </Suspense>
    </div>
  );
};

// TODO: Update fallback component
function SearchFallback() {
  return <div>Placeholder for Searchbar and Tags</div>;
}
