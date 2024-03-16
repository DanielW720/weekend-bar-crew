import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSearchBox } from "react-instantsearch";

/**
 * Refines search when query search param changes.
 * @returns current query
 */
function useCurrentQuery() {
  const { query, refine } = useSearchBox();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query");

  useEffect(() => {
    if (currentQuery != query) refine(currentQuery ? currentQuery : "");
  }, [searchParams]);

  return currentQuery ? currentQuery : "";
}

export default useCurrentQuery;
