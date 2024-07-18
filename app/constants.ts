import algoliasearch from "algoliasearch";

export const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

export const indexName = "drinks";
