"use client";

import { client, indexName } from "@/app/constants";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import { Search as SearchType } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { Configure, InstantSearch } from "react-instantsearch";
import FacetsAccordion from "./facets/facetsAccordion";
import ResultGrid from "./results/resultGrid";
import { Searchbar } from "./searchbar";

export const Search = ({ search, drinkCard }: { search: SearchType; drinkCard: { nonAlcoholic: string } }) => {
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
            "difficulty_level.label": getFacetParamValues(
              "difficulty_level.label"
            ),
            flavor_profiles: getFacetParamValues("flavor_profiles"),
            glassware: getFacetParamValues("glassware"),
            mocktail_available: getFacetParamValues("mocktail_available"),
            preparation_time_min: getFacetParamValues("preparation_time_min"),
            type: getFacetParamValues("type"),
          },
        },
      }}
    >
      <Configure hitsPerPage={12} filters={`language:${lang}`} />
      <div className={`mt-6 flex w-full flex-col items-center md:mt-12`}>
        <Searchbar placeholder={search.placeholder} />
        <FacetsAccordion
          facets={search.facets}
          options={search.options}
          clearFilterDict={{
            single: search.clearFacet,
            multiple: search.clearFacets,
          }}
        />
        <ResultGrid drinkCard={drinkCard} />
      </div>
    </InstantSearch>
  );
};
