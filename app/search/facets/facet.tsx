import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { roboto } from "@/app/lib/fonts";
import removeSearchModalParam from "@/app/lib/removeSearchModalParam";
import { unsetBodyOverflow } from "@/app/lib/unsetBodyOverflow";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRefinementList } from "react-instantsearch";

export default function Facet({
  attribute,
  displayName,
}: {
  attribute: string;
  displayName: string;
}) {
  const searchParams = useSearchParams();
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
    router.push(`/?${updatedSearchParams}`);

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
          className={`group relative col-span-3 col-start-2 col-end-4 flex w-max flex-1 items-center rounded-full bg-beige/20 px-2 py-1 outline-none backdrop-blur-[2px] transition-colors duration-200 data-[has-selected=true]:bg-cyan`}
          data-has-selected={hasSelectedItems}
        >
          <div className="text-[0.8rem] tracking-wider text-white transition-colors duration-200 group-data-[has-selected=true]:text-black md:text-[0.95rem]">
            {displayName}
          </div>
          <motion.div
            transition={{ type: "keyframes", duration: 0.15 }}
            animate={{ rotate: open ? 180 : 0 }}
          >
            <ChevronDownIcon className="ml-[2px] text-white group-data-[has-selected=true]:text-black" />
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
              sideOffset={6}
              className={`${roboto.className} w-[100px] rounded-md bg-beige text-sm tracking-wider text-darkGray backdrop-blur-sm`}
            >
              <motion.ul initial="hidden" animate="visible" variants={list}>
                {items.map((item, idx) => (
                  <li key={item.label}>
                    <RadixDropdownMenu.CheckboxItem
                      className={`px-2 py-1 text-[0.8rem] transition-all duration-200 hover:bg-white data-[state=checked]:bg-cyan data-[state=checked]:shadow-md data-[state=checked]:hover:bg-white/70 ${
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
              <RadixDropdownMenu.Arrow className="fill-beige/80" />
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

  // Remove search-modal param. May or may not exist
  completeParamString = removeSearchModalParam(completeParamString);

  return completeParamString;
}
