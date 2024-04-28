import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { unsetBodyOverflow } from "@/app/lib/unsetBodyOverflow";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSearchParams,
  ReadonlyURLSearchParams,
  usePathname,
} from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRefinementList } from "react-instantsearch";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";

export default function Facet({
  attribute,
  displayName,
}: {
  attribute: string;
  displayName: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const languagePathname = useLanguagePathname();
  const { items, refine } = useRefinementList({
    attribute: attribute,
    sortBy: ["name:asc"],
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const hasSelectedItems = items.find((item) => item.isRefined) != undefined;

  /**
   * Get the selected filters of the facet.
   * @param filter The filter that was clicked on; if it was already chosen, it won't be included. If it was not already clicked on, it will be included in the selected filters list.
   */
  const getSelectedFilters = (filter: string, isRefined: boolean) => {
    let selectedFilters: string[] = [];

    // Add any pre-chosen filters
    items.forEach((item) => {
      if (item.isRefined && item.value != filter) {
        selectedFilters.push(item.value);
      }
    });

    // If it was not already selected, add it to selected
    if (!isRefined) selectedFilters.push(filter);

    return selectedFilters;
  };

  const onFilterClick = (filter: string, isRefined: boolean) => {
    const selectedFilters = getSelectedFilters(filter, isRefined);

    const updatedSearchParams = getUpdatedSearchParams(
      attribute,
      selectedFilters,
      searchParams
    );

    // Enable body scrolling (may have been disabled by modal)
    unsetBodyOverflow();

    // Update search params
    router.push(`${pathname}?${updatedSearchParams}`);

    // Refine search state
    refine(filter);
  };

  // Framer Motion animation variants
  const list = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const element = {
    hidden: { opacity: 0, filter: "blur(10px)", x: 100 },
    visible: { opacity: 1, filter: "blur(0px)", x: 0 },
  };

  // If there's no filters available, skip this facet
  if (items.length === 0) return null;

  return (
    <RadixDropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
      <motion.div whileTap={{ scale: 0.93 }}>
        <RadixDropdownMenu.Trigger
          className={`group relative col-span-3 col-start-2 col-end-4 flex flex-1 items-center rounded-[0.6rem] border-[1px] border-beige/0 bg-beige/10 px-2 py-1 text-xxs text-white outline-none backdrop-blur-[2px] transition-colors duration-200 hover:border-beige data-[has-selected=true]:border-beige data-[has-selected=true]:bg-extraDarkGray data-[has-selected=true]:text-beige sm:px-3 sm:py-2 sm:text-xs`}
          data-has-selected={hasSelectedItems}
        >
          <div className="font-[300] tracking-wider">{displayName}</div>
          <motion.div
            transition={{ type: "keyframes", duration: 0.15 }}
            animate={{ rotate: open ? 180 : 0 }}
          >
            <ChevronDownIcon className="ml-[2px]" />
          </motion.div>
        </RadixDropdownMenu.Trigger>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown-content"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20"
          >
            <RadixDropdownMenu.Content
              forceMount
              sideOffset={4}
              className={`w-[140%] rounded-md bg-extraDarkGray py-1 text-xxs tracking-wider text-white transition-all duration-200 sm:py-2 sm:text-xs`}
            >
              <RadixDropdownMenu.Arrow className="fill-extraDarkGray" />
              <motion.ul initial="hidden" animate="visible" variants={list}>
                {items.map((item, idx) => (
                  <li key={item.label}>
                    <RadixDropdownMenu.CheckboxItem
                      className={`px-2 py-1 font-thin transition-all duration-300 hover:bg-beige hover:text-darkGray data-[state=checked]:text-beige data-[state=checked]:hover:text-darkGray sm:px-3 sm:py-3 ${
                        idx === 0 && "rounded-t-md"
                      } ${idx === items.length - 1 && "rounded-b-md"}`}
                      checked={item.isRefined}
                      onClick={() => onFilterClick(item.value, item.isRefined)}
                    >
                      <motion.div
                        variants={element}
                        className="flex cursor-default flex-row items-center justify-between"
                      >
                        <p>{item.value}</p>
                        <RadixDropdownMenu.ItemIndicator>
                          <CheckIcon />
                        </RadixDropdownMenu.ItemIndicator>
                      </motion.div>
                    </RadixDropdownMenu.CheckboxItem>
                  </li>
                ))}
              </motion.ul>
            </RadixDropdownMenu.Content>
          </motion.div>
        )}
      </AnimatePresence>
    </RadixDropdownMenu.Root>
  );
}

/**
 * Collects the updated full search parameter string, keeping all other parameters untouched.
 * @param name Name of the parameter
 * @param values List of parameter values
 */
function getUpdatedSearchParams(
  key: string,
  values: string[],
  searchParams: ReadonlyURLSearchParams
) {
  let completeParamString: string;

  // If param exists, update its value
  if (searchParams.has(key)) {
    const params = [];

    for (const [currentKey, value] of searchParams.entries()) {
      // No values selected, so we remove the param
      if (currentKey === key && values.length === 0) continue;

      params.push(
        `${currentKey}=${currentKey === key ? values.join() : value}`
      );
    }

    completeParamString = params.join("&");
  } else if (searchParams.toString().length === 0) {
    completeParamString = `${key}=${values}`;
  } else {
    // Option not previously selected, should be added together with the recently selected value
    completeParamString = `${searchParams.toString()}&${key}=${values.join()}`;
  }

  return completeParamString;
}
