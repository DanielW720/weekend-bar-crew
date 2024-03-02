import { DrinkItem } from "./../types";
import {
  collection,
  query,
  where,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { DrinkItem } from "../types";
import algoliasearch, { SearchIndex } from "algoliasearch";

const DRINKS_COLLECTION = "drinks";

/**
 * Perfoms a search on drinks from Firestore/Algolia by listening to URL search params.
 * @returns List with items and loading state
 */
export default function useSearchDrinks(): [DrinkItem[], boolean] {
  const [items, setItems] = useState<DrinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
  );
  const index = client.initIndex(DRINKS_COLLECTION);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch list of drinks
        const drinks = await searchDrinks(searchParams, index);

        // Update items
        setItems(drinks);
        // Update loading state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
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

  // Create query for Firestore drink items
  const q = query(
    collection(firestore, DRINKS_COLLECTION),
    where("name", "==", paramDict.query)
  );

  try {
    // Fetch documents
    // const querySnapshot = await getDocs(q);
    // Get the array of documents
    // const queryDocs = querySnapshot.docs;

    // return constructDrinkArray(queryDocs);

    // ### SEARCH BEGINS ###

    console.log("SEARCH QUERY:", paramDict.query);

    const searchResponse = await index.search(paramDict.query);
    console.log("SEARCH RESPONSE HITS:", searchResponse.hits);

    return searchResponse.hits.map(
      (rec) =>
        ({
          id: rec.objectID,
          imageUrl: rec["image_url"],
          name: rec["name"],
          shortDescription: rec["description_short"],
          tags: rec["tags"],
        } as DrinkItem)
    );

    // ### SEARCH ENDS ###
  } catch (error) {
    console.error("Error fetching from Firestore");
    return [];
  }
}

function constructDrinkArray(
  drinks: QueryDocumentSnapshot<DocumentData, DocumentData>[]
): DrinkItem[] {
  return drinks.length >= 0
    ? drinks.map((drink) => {
        return {
          id: drink.id,
          name: drink.get("name"),
          imageUrl: drink.get("image_url"),
          shortDescription: drink.get("description_short"),
          tags: {
            alcohol: "true",
            baseSpirit: ["whiskey"],
            type: ["classic"],
          },
        };
      })
    : [];
}

type ParamDict = {
  query: string;
  type: string[];
  baseSpirit: string[];
};
