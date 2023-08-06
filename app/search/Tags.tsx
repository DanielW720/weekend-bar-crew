"use client";

import { useState } from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Toggle from "@radix-ui/react-toggle";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { roboto } from "../lib/globals/fonts";
import { AnimatePresence, motion } from "framer-motion";

export function Tags() {
  return (
    <div className={`mt-6 flex items-center justify-between`}>
      <AlcoholicToggle />
      <DropdownSelectionMenu
        options={["Gin", "Whisky", "Rum", "Vodka"]}
        title="Base Sprit"
      />
      <DropdownSelectionMenu
        options={["Highball", "Fizz", "Martini"]}
        title="Family"
      />
    </div>
  );
}

function AlcoholicToggle() {
  const [checked, setChecked] = useState(true);

  return (
    <motion.div whileTap={{ scale: 0.93 }}>
      <Toggle.Root
        aria-label="Toggle italic"
        data-checked={checked}
        className={`group flex w-fit items-center rounded-full bg-beigeLightTransparent px-2 py-1 outline-none backdrop-blur-[2px] transition-colors duration-200 data-[checked=true]:bg-cyan`}
        onClick={() => setChecked((prevState) => !prevState)}
      >
        <p
          className={`text-sm tracking-wider text-black transition-colors duration-200 group-data-[checked=false]:text-white`}
        >
          Alcohol
        </p>
      </Toggle.Root>
    </motion.div>
  );
}

function DropdownSelectionMenu({
  options,
  title,
}: {
  options: string[];
  title: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  function onSelectClick(option: string) {
    if (selected.includes(option)) {
      const list = selected.filter((e) => e !== option);
      setSelected(list);
    } else {
      const list = [...selected, option];
      setSelected(list);
    }
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
          className={`group relative flex w-fit items-center rounded-full bg-beigeLightTransparent px-2 py-1 outline-none backdrop-blur-[2px] transition-colors duration-200 data-[has-selected=true]:bg-cyan`}
          data-has-selected={selected.length > 0}
        >
          <p className="text-sm tracking-wider text-white transition-colors duration-200 group-data-[has-selected=true]:text-black">
            {title}
          </p>
          <motion.div
            transition={{ type: "keyframes", duration: 0.15 }}
            animate={{ rotate: open ? 180 : 0 }}
          >
            <ChevronDownIcon className="ml-[2px] text-white group-data-[has-selected=true]:text-black" />
          </motion.div>
          <ul
            className={`pointer-events-none absolute top-8 rounded-md bg-black/50 px-2 py-1 tracking-wide backdrop-blur-sm group-data-[has-selected=false]:hidden`}
          >
            {selected.map((e) => (
              <li key={e} className="text-xs text-cyan">
                {e}
              </li>
            ))}
          </ul>
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
              className={`${roboto.className} z-10 w-24 rounded-md bg-beige/90 text-sm tracking-wider text-black`}
            >
              <motion.ul initial="hidden" animate="visible" variants={list}>
                {options.map((option, idx) => (
                  <li key={option}>
                    <RadixDropdownMenu.CheckboxItem
                      className={`px-2 py-1 text-sm data-[state=checked]:bg-cyan data-[state=checked]:shadow-md ${
                        idx === 0 && "rounded-t-md"
                      } ${idx === options.length - 1 && "rounded-b-md"}`}
                      checked={selected.includes(option)}
                      onCheckedChange={() => onSelectClick(option)}
                    >
                      <motion.div
                        variants={item}
                        className="flex flex-row items-center justify-between"
                      >
                        <p>{option}</p>
                        <RadixDropdownMenu.ItemIndicator>
                          <CheckIcon />
                        </RadixDropdownMenu.ItemIndicator>
                      </motion.div>
                    </RadixDropdownMenu.CheckboxItem>
                  </li>
                ))}
              </motion.ul>
              <RadixDropdownMenu.Arrow className="fill-beige" />
            </RadixDropdownMenu.Content>
          </motion.div>
        )}
      </AnimatePresence>
    </RadixDropdownMenu.Root>
  );
}
