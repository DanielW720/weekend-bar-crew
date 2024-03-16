import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useSearchBox } from "react-instantsearch";

/**
 * Refines search when query search param changes. Useful for updating the search and the UI when user is backing.
 * @returns current query
 */
function useCurrentQuery(setValue: UseFormSetValue<any>) {
  const { query, refine } = useSearchBox();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query");

  useEffect(() => {
    if (currentQuery != query) {
      setValue("query", currentQuery ? currentQuery : "");
      refine(currentQuery ? currentQuery : "");
    }
  }, [searchParams]);

  return currentQuery ? currentQuery : "";
}

export default useCurrentQuery;
