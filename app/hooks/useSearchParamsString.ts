import { useSearchParams } from "next/navigation";

/**
 * @returns Search param string, including leading "?". Empty string if there are no search params.
 */
export default function useSearchParamsString() {
  const searchParams = useSearchParams();
  return searchParams.toString().length != 0
    ? `?${searchParams.toString()}`
    : "";
}
