import { useState } from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Toggle from "@radix-ui/react-toggle";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { roboto } from "../lib/globals/fonts";
import { AnimatePresence, motion } from "framer-motion";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

export type ParamTags = {
  alcohol: boolean;
  baseSpirit: string[];
  type: string[];
};

export function Tags() {
  const searchParams = useSearchParams();

  return (
    <div className={`mt-6 grid grid-cols-3 items-center gap-3 px-4`}>
      <AlcoholicToggle searchParams={searchParams} />
      <DropdownSelectionMenu
        title={{ displayName: "Type", key: "type" }}
        options={[
          { displayName: "Highball", key: "highball" },
          { displayName: "Sour", key: "sour" },
          { displayName: "Fizz", key: "fizz" },
          { displayName: "Martini", key: "martini" },
          { displayName: "Strong", key: "strong" },
          { displayName: "Classic", key: "classic" },
          { displayName: "Modern", key: "modern" },
          { displayName: "Bitter", key: "bitter" },
          { displayName: "Mule", key: "mule" },
          { displayName: "Punch", key: "punch" },
          { displayName: "Bubbles", key: "bubbles" },
        ]}
      />
      <DropdownSelectionMenu
        title={{ displayName: "Base Spirit", key: "baseSpirit" }}
        options={[
          {
            displayName: "Vodka",
            key: "vodka",
          },
          {
            displayName: "Rom",
            key: "rom",
          },
          {
            displayName: "Tequila",
            key: "tequila",
          },
          {
            displayName: "Gin",
            key: "gin",
          },
          {
            displayName: "Whiskey",
            key: "whiskey",
          },
          {
            displayName: "Cachaça",
            key: "cachaça",
          },
          {
            displayName: "Aperol",
            key: "aperol",
          },
          {
            displayName: "Sweet Vermouth",
            key: "sweetVermouth",
          },
          {
            displayName: "Dry Vermouth",
            key: "dryVermouth",
          },
          {
            displayName: "Vermouth",
            key: "vermouth",
          },
          {
            displayName: "Campari",
            key: "campari",
          },
        ]}
      />
    </div>
  );
}

function AlcoholicToggle({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const router = useRouter();
  const isAlcohol = searchParams.get("alcohol") !== "false";

  const handleUpdateSearchParams = () => {
    let paramsString: string;
    if (searchParams.has("alcohol")) {
      // "alcohol" param should be inverted
      const params = [];
      for (const [key, value] of searchParams.entries()) {
        params.push(`${key}=${key === "alcohol" ? !isAlcohol : value}`);
      }
      paramsString = params.join("&");
    } else {
      // "alcohol" param does not exist in current search params, hence set it to false (defaults to true)
      paramsString = searchParams.toString() + "&alcohol=false";
    }
    router.push(`/?${paramsString}`);
  };

  return (
    <motion.div whileTap={{ scale: 0.93 }}>
      <Toggle.Root
        aria-label="Toggle italic"
        data-checked={isAlcohol}
        className={`group flex w-fit items-center rounded-full bg-beige/20 px-2 py-1 outline-none backdrop-blur-[2px] transition-colors duration-200 data-[checked=true]:bg-cyan`}
        onClick={handleUpdateSearchParams}
      >
        <p
          className={`text-[0.8rem] tracking-wider text-black transition-colors duration-200 group-data-[checked=false]:text-white`}
        >
          Alcohol
        </p>
      </Toggle.Root>
    </motion.div>
  );
}

function DropdownSelectionMenu({
  title,
  options,
}: {
  title: { displayName: string; key: string };
  options: { displayName: string; key: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const selected: string[] = [];
  searchParams
    .get(title.key)
    ?.split(";")
    .forEach((value) => (value !== "" ? selected.push(value) : null));

  function onSelectClick(option: { displayName: string; key: string }) {
    let valuesStringUpdated: string;
    if (selected.includes(option.key)) {
      // Option was already included, hence we un-include it
      valuesStringUpdated = selected.filter((e) => e !== option.key).join(";");
    } else {
      // Option was not selected previously, hence we select it
      valuesStringUpdated = [...selected, option.key].join(";");
    }
    // Update search params
    let paramString: string;
    if (searchParams.has(title.key)) {
      // Option exists and its values should be updated
      const params = [];
      for (const [key, value] of searchParams.entries()) {
        params.push(
          `${key}=${key === title.key ? valuesStringUpdated : value}`
        );
      }
      paramString = params.join("&");
    } else {
      // Option not previously selected, should be added together with the recently selected value
      paramString = `${searchParams.toString()}&${title.key}=${option.key}`;
    }
    router.push(`/?${paramString}`);
  }

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
          className={`group relative col-span-3 col-start-2 col-end-4 flex w-max items-center rounded-full bg-beige/20 px-2 py-1 outline-none backdrop-blur-[2px] transition-colors duration-200 data-[has-selected=true]:bg-cyan`}
          data-has-selected={selected.length > 0}
        >
          <p className="text-[0.8rem] tracking-wider text-white transition-colors duration-200 group-data-[has-selected=true]:text-black">
            {title.displayName}
          </p>
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
            className="absolute z-10"
          >
            <RadixDropdownMenu.Content
              forceMount
              sideOffset={6}
              className={`${roboto.className} z-10 w-[100px] rounded-md bg-beige text-sm tracking-wider text-darkGray backdrop-blur-sm`}
            >
              <motion.ul initial="hidden" animate="visible" variants={list}>
                {options.map((option, idx) => (
                  <li key={option.key}>
                    <RadixDropdownMenu.CheckboxItem
                      className={`px-2 py-1 text-[0.8rem] data-[state=checked]:bg-cyan data-[state=checked]:shadow-md ${
                        idx === 0 && "rounded-t-md"
                      } ${idx === options.length - 1 && "rounded-b-md"}`}
                      checked={selected.includes(option.key)}
                      onClick={() => {
                        onSelectClick(option);
                      }}
                    >
                      <motion.div
                        variants={item}
                        className="flex flex-row items-center justify-between"
                      >
                        <p>{option.displayName}</p>
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
