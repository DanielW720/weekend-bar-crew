import { AnimatePresence, motion } from "framer-motion";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useCurrentRefinements, useRefinementList } from "react-instantsearch";
import { roboto } from "../lib/globals/fonts";
import { useRouter } from "next/navigation";

export default function SearchFilters() {
  const searchParams = useSearchParams();
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

  return (
    <div className="mt-6 flex max-w-lg flex-wrap items-center justify-center gap-3 px-4 md:gap-5">
      <Facet
        name="Booze Intensity"
        selected={selectedFiltersDict.boozeIntensity}
        attribute="tags.booze_intensity"
        searchParams={searchParams}
      />
      <Facet
        name="Type"
        selected={selectedFiltersDict.type}
        attribute="tags.type"
        searchParams={searchParams}
      />
      <Facet
        name="Base Spirit"
        selected={selectedFiltersDict.baseSpirit}
        attribute="tags.base_spirit"
        searchParams={searchParams}
      />
    </div>
  );
}

function Facet({
  name,
  selected,
  attribute,
  searchParams,
}: {
  name: string;
  selected: string[];
  attribute: string;
  searchParams: ReadonlyURLSearchParams;
}) {
  const { items, refine } = useRefinementList({
    attribute: attribute,
    sortBy: ["name:asc"],
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // If there's no filters available, skip this facet
  if (items.length === 0) return;

  const onFilterClick = (filter: string) => {
    // if already selected, un-select it
    // If not already selected, select it
    selected.includes(filter)
      ? selected.splice(selected.indexOf(filter), 1)
      : selected.push(filter);

    // Get updated search params string
    const updatedSearchParams = updateSearchParams(
      name,
      selected,
      searchParams
    );

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
  const item = {
    hidden: { opacity: 0, filter: "blur(10px)", x: 100 },
    visible: { opacity: 1, filter: "blur(0px)", x: 0 },
  };

  return (
    <RadixDropdownMenu.Root modal={false} open={open} onOpenChange={setOpen}>
      <motion.div whileTap={{ scale: 0.93 }}>
        <RadixDropdownMenu.Trigger
          className={`group relative col-span-3 col-start-2 col-end-4 flex w-max flex-1 items-center rounded-full bg-beige/20 px-2 py-1 outline-none backdrop-blur-[2px] transition-colors duration-200 data-[has-selected=true]:bg-cyan`}
          data-has-selected={selected.length > 0}
        >
          <div className="text-[0.8rem] tracking-wider text-white transition-colors duration-200 group-data-[has-selected=true]:text-black md:text-[0.95rem]">
            {name}
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
                {items.map((filter, idx) => (
                  <li key={filter.label}>
                    <RadixDropdownMenu.CheckboxItem
                      className={`px-2 py-1 text-[0.8rem] transition-all duration-200 hover:bg-white data-[state=checked]:bg-cyan data-[state=checked]:shadow-md data-[state=checked]:hover:bg-white/70 ${
                        idx === 0 && "rounded-t-md"
                      } ${idx === items.length - 1 && "rounded-b-md"}`}
                      checked={selected.includes(filter.value)}
                      onClick={() => {
                        onFilterClick(filter.value);
                      }}
                    >
                      <motion.div
                        variants={item}
                        className="flex cursor-default flex-row items-center justify-between"
                      >
                        <p>{filter.value}</p>
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
 * Updates the given search parameter, keeping all other parameters untouched.
 * @param name Name of the parameter
 * @param values List of parameter values
 */
function updateSearchParams(
  name: string,
  values: string[],
  searchParams: ReadonlyURLSearchParams
) {
  let completeParamString: string;

  // If name already exists in search params, its value should be updated
  if (searchParams.has(name)) {
    const params = [];

    for (const [key, value] of searchParams.entries()) {
      // No values selected, so we remove the param
      if (key === name && values.length === 0) continue;

      params.push(`${key}=${key === name ? values.join(";") : value}`);
    }

    completeParamString = params.join("&");
  } else if (searchParams.toString().length === 0) {
    completeParamString = `${name}=${values}`;
  } else {
    console.log("searchParam before new filter:", searchParams.toString());

    // Option not previously selected, should be added together with the recently selected value
    completeParamString = `${searchParams.toString()}&${name}=${values.join(
      ";"
    )}`;
  }

  return completeParamString;
}
