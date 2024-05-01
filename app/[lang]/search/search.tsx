"use client";

import React from "react";
import { Searchbar } from "./searchbar";
import { Configure, InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch";
import { useSearchParams } from "next/navigation";
import ResultGrid from "./results/resultGrid";
import FacetsAccordion from "./facets/facetsAccordion";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import { Search as SearchType } from "@/app/types";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

const indexName = "drinks";

export const Search = ({ search }: { search: SearchType }) => {
  const searchParams = useSearchParams();
  const language = useLanguagePathname(true);

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
      <Configure filters={`language:${language}`} />
      <div className={`mt-6 flex w-full flex-col items-center md:mt-12`}>
        <Searchbar placeholder={search.placeholder} />
        <FacetsAccordion facets={search.facets} options={search.options} />
        <ResultGrid />
      </div>
    </InstantSearch>
  );
};
