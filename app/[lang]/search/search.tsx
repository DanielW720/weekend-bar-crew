"use client";

import React from "react";
import { Configure, InstantSearch } from "react-instantsearch";
import { Search as SearchType } from "@/app/types";
import { client, indexName } from "@/app/constants";
import ResultGrid from "./results/resultGrid";
import { Searchbar } from "./searchbar";
import FacetsAccordion from "./facets/facetsAccordion";
import { useSearchParams } from "next/navigation";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";

export const Search = ({ search }: { search: SearchType }) => {
  const searchParams = useSearchParams();
  const lang = useLanguagePathname(true);

  /**
   * Get the values of a facet from the URL search params
   */
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
            base_spirits: getFacetParamValues("base_spirits"),
            difficulty_level: getFacetParamValues("difficulty_level.level"),
            flavor_profiles: getFacetParamValues("flavor_profiles"),
            glassware: getFacetParamValues("glassware"),
            mocktail_available: getFacetParamValues("mocktail_available"),
            preparation_time_min: getFacetParamValues("preparation_time_min"),
            type: getFacetParamValues("type"),
          },
        },
      }}
    >
      <Configure hitsPerPage={6} filters={`language:${lang}`} />
      <div className={`mt-6 flex w-full flex-col items-center md:mt-12`}>
        <Searchbar placeholder={search.placeholder} />
        <FacetsAccordion facets={search.facets} options={search.options} />
        <ResultGrid />
      </div>
    </InstantSearch>
  );
};
