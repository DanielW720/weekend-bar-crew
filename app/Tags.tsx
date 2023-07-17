"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export const Tags = () => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <BaseSpiritTag />
      <BaseSpiritTag />
      <BaseSpiritTag />
      <BaseSpiritTag />
    </div>
  );
};

const BaseSpiritTag = () => {
  const [gin, setGin] = React.useState(true);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex w-fit items-center rounded-md p-1 text-xs text-white outline-none backdrop-blur-sm">
        <p>Base spirit</p>
        <ChevronDownIcon className="ml-1" />
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

          <DropdownMenu.Arrow className="fill-beige" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
