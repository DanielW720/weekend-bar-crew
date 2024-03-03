import { DrinkDetails } from "./../types";
import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import algoliasearch, { SearchIndex } from "algoliasearch";

const DRINKS_COLLECTION = "drinks";

/**
 * Perfoms a search on drinks from Firestore/Algolia by listening to URL search params.
 * @returns List with items and loading state
 */
export default function useSearchDrinks(): [DrinkDetails[], boolean] {
  const [items, setItems] = useState<DrinkDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
  );
  const index = client.initIndex(DRINKS_COLLECTION);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch list of drinks
      const drinks = await searchDrinks(searchParams, index);

      // Update items
      setItems(drinks);
      // Update loading state
      setLoading(false);
    };
    fetchData();
  }, [searchParams]);

  return [items, loading];
}

function extractParameters(searchParams: ReadonlyURLSearchParams): ParamDict {
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const baseSpirit = searchParams.get("baseSpirit");

  return {
    query: query ? query.trim() : "",
    type: type ? type.split(";") : [],
    baseSpirit: baseSpirit ? baseSpirit.split(";") : [],
  };
}

async function searchDrinks(
  searchParams: ReadonlyURLSearchParams,
  index: SearchIndex
) {
  const paramDict = extractParameters(searchParams);

  try {
    const searchResponse = await index.search<DrinkDetails>(paramDict.query);

    return searchResponse.hits.map((record) => ({
      ...record,
      id: record.objectID,
    }));
  } catch (error) {
    console.error(
      "Error while searching 'drinks' index in Algolia. Returning empty list."
    );
    return [];
  }
}

type ParamDict = {
  query: string;
  type: string[];
  baseSpirit: string[];
};
