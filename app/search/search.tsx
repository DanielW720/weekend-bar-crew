"use client";

import React, { Suspense } from "react";
import { Searchbar } from "./searchbar";
import { roboto } from "../lib/fonts";
import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import SearchFilters from "./searchFilters";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import ResultGrid from "./results/resultGrid";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

const indexName = "drinks";

export const Search = () => {
  const searchParams = useSearchParams();

  // Find any pre-existing URL query params and add them to initial state
  const paramDictionary = getExistingQueryParameter(searchParams);

  return (
    <InstantSearch
      searchClient={client}
      indexName={indexName}
      initialUiState={{
        drinks: {
          query: paramDictionary.query,
          refinementList: {
            "tags.booze_intensity": paramDictionary.boozeIntensity,
            "tags.type": paramDictionary.type,
            "tags.base_spirit": paramDictionary.baseSpirit,
          },
        },
      }}
    >
      <div
        className={`${roboto.className} mt-6 flex w-full flex-col items-center md:mt-12`}
      >
        <Searchbar />
        <SearchFilters />
        <ResultGrid />
      </div>
    </InstantSearch>
  );
};

function getExistingQueryParameter(searchParams: ReadonlyURLSearchParams) {
  const paramDictionary = {
    query: "",
    boozeIntensity: [] as string[],
    type: [] as string[],
    baseSpirit: [] as string[],
  };

  const query = searchParams.get("query");
  if (query) paramDictionary.query = query;

  searchParams
    .get("Booze Intensity")
    ?.split(";")
    .forEach((filter) => paramDictionary.boozeIntensity.push(filter));
  searchParams
    .get("Type")
    ?.split(";")
    .forEach((filter) => paramDictionary.type.push(filter));
  searchParams
    .get("Base Spirit")
    ?.split(";")
    .forEach((filter) => paramDictionary.baseSpirit.push(filter));

  return paramDictionary;
}
