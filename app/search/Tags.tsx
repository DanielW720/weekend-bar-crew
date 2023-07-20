"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Toggle from "@radix-ui/react-toggle";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { roboto } from "../lib/globals/fonts";

export const Tags = () => {
  return (
    <div className={`mt-4 flex items-center justify-between`}>
      <AlcoholicToggle />
      <BaseSpiritTag />
      <BaseSpiritTag />
    </div>
  );
};

const baseTagStyle =
  "flex w-fit items-center rounded-full bg-beigeLightTransparent px-2 py-1 outline-none backdrop-blur-[2px]";

const AlcoholicToggle = () => {
  const [checked, setChecked] = useState(true);

  return (
    <Toggle.Root
      aria-label="Toggle italic"
      className={`${baseTagStyle} ${checked && "bg-cyan"}`}
      onClick={() => setChecked((prevState) => !prevState)}
    >
      <p
        className={`text-sm tracking-wider ${
          checked ? "text-black" : "text-white"
        }`}
      >
        Alcohol
      </p>
    </Toggle.Root>
  );
};

type Spirit = "Gin" | "Whisky" | "Rum" | null;
const spirits = ["Gin", "Whisky", "Rum", "Vodka"];

const BaseSpiritTag = () => {
  const [spirit, setSpirit] = useState<Spirit>(null);

  // Todo: change to Radix Select component
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={`${baseTagStyle}`}>
        <p className="text-sm tracking-wider text-white">Base spirit</p>
        <ChevronDownIcon className="ml-[2px]" color="white" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          className={`${roboto.className} w-28 rounded-md bg-beige text-sm tracking-wider text-black`}
        >
          {spirits.map((base, idx) => (
            <DropdownMenu.CheckboxItem
              key={base}
              className={`flex flex-row items-center px-2 py-1 text-sm data-[state=checked]:bg-cyan data-[state=checked]:shadow-md ${
                idx === 0 && "rounded-t-md"
              } ${idx === spirits.length - 1 && "rounded-b-md"}`}
              checked={base === spirit}
              onCheckedChange={() => {
                if (base === spirit) setSpirit(null);
                else setSpirit(base as Spirit);
              }}
            >
              <DropdownMenu.ItemIndicator>
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              <p className={`ml-auto w-fit`}>{base}</p>
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Arrow className="fill-beige" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
