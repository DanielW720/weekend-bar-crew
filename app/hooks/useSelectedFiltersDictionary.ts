import { useCurrentRefinements } from "react-instantsearch";

/**
 * @returns Object with the selected filters of each facet
 */
export default function useSelectedFiltersDictionary() {
  const { items } = useCurrentRefinements();

  // Lists of selected filters for each facet is needed for initial state for each facet
  const selectedFiltersDict = {
    boozeIntensity: [] as string[],
    type: [] as string[],
    baseSpirit: [] as string[],
  };

  items.forEach((item) => {
    if (item.attribute === "tags.booze_intensity") {
      item.refinements.forEach((filter) =>
        selectedFiltersDict.boozeIntensity.push(filter.value.toString())
      );
    }
    if (item.attribute === "tags.type") {
      item.refinements.forEach((filter) =>
        selectedFiltersDict.type.push(filter.value.toString())
      );
    }
    if (item.attribute === "tags.base_spirit") {
      item.refinements.forEach((filter) =>
        selectedFiltersDict.baseSpirit.push(filter.value.toString())
      );
    }
  });

  return selectedFiltersDict;
}
