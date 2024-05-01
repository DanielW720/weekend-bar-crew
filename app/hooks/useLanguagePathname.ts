import { usePathname } from "next/navigation";

/**
 * Extracts language part of current pathname. Starts with forward slash. Returns empty string if no language pathname was found.
 * @returns Language part of the current pathname.
 */
export default function useLanguagePathname(
  skipLeadingForwardSlash?: boolean
): string {
  const pathname = usePathname();
  const firstPartRegex = /^\/[a-zA-Z]{2,5}(-[a-zA-Z]{2,5})?/;
  const match = pathname.match(firstPartRegex);

  if (match && match[0]) {
    return skipLeadingForwardSlash ? match[0].slice(1) : match[0];
  }
  return "";
}
