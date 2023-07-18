"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Toggle from "@radix-ui/react-toggle";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export const Tags = () => {
  return (
    <div className={` mt-4 flex items-center justify-between`}>
      <AlcoholicToggle />
      <BaseSpiritTag />
      <BaseSpiritTag />
    </div>
  );
};

const baseTagStyle =
  "flex w-fit items-center rounded-md bg-beigeLightTransparent px-[6px] py-1 outline-none backdrop-blur-[2px]";

const AlcoholicToggle = () => {
  const [checked, setChecked] = useState(true);

  return (
    <Toggle.Root
      aria-label="Toggle italic"
      className={`${baseTagStyle} ${checked && "bg-cyan/80"}`}
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

const BaseSpiritTag = () => {
  const [gin, setGin] = useState(true);

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
          className="w-28 rounded-md bg-beigeRed px-2 py-1 text-black"
        >
          <DropdownMenu.CheckboxItem
            className="my-1 flex flex-row items-center text-xs"
            checked={gin}
            onCheckedChange={setGin}
          >
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            <p className="ml-auto w-fit">Gin</p>
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem
            className="flex flex-row items-center text-xs"
            checked={!gin}
            onCheckedChange={setGin}
          >
            <DropdownMenu.ItemIndicator>
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            <p className="ml-auto w-fit">Whisky</p>
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Arrow className="fill-beigeRed" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
