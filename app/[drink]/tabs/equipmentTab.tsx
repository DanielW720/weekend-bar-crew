import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";
import { GoDotFill } from "react-icons/go";

export function EquipmentTab({ equipment }: { equipment: string[] }) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Equipment} forceMount>
      <ul className="list-none">
        {equipment.map((item) => (
          <li key={item} className="my-1">
            <span className="inline-flex items-center">
              <GoDotFill className="mr-2" /> {item}
            </span>
          </li>
        ))}
      </ul>
    </RadixTabs.Content>
  );
}
