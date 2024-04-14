"use client";

import React from "react";
import { Searchbar } from "./searchbar";
import { roboto } from "../lib/fonts";
import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { useSearchParams } from "next/navigation";
import ResultGrid from "./results/resultGrid";
import FacetsAccordion from "./facets/facetsAccordion";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

const indexName = "drinks";

export const Search = () => {
  const searchParams = useSearchParams();

  const getFacetParamValues = (facet: string) => {
    const filters = searchParams.get(facet)?.split(",");
    return filters ? filters : [];
  };

  const query = searchParams.get("query");

  return (
    <InstantSearch
      searchClient={client}
      indexName={indexName}
      future={{ preserveSharedStateOnUnmount: true }}
      initialUiState={{
        drinks: {
          query: query ? query : "",
          refinementList: {
            base_spirit: getFacetParamValues("base_spirit"),
            difficulty_level: getFacetParamValues("difficulty_level"),
            flavor_profile: getFacetParamValues("flavor_profile"),
            glassware: getFacetParamValues("glassware"),
            mocktail_available: getFacetParamValues("mocktail_available"),
            preparation_time_min: getFacetParamValues("preparation_time_min"),
            type: getFacetParamValues("type"),
          },
        },
      }}
    >
      <div
        className={`${roboto.className} mt-6 flex w-full flex-col items-center md:mt-12`}
      >
        <Searchbar />
        <FacetsAccordion />
        <ResultGrid />
      </div>
    </InstantSearch>
  );
};
