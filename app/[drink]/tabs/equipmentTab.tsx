import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";

export function EquipmentTab({ equipment }: { equipment: string[] }) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Equipment} forceMount>
      <ul className="list-disc text-white/80">
        {equipment.map((item) => (
          <li key={item} className="my-1">
            {item}
          </li>
        ))}
      </ul>
    </RadixTabs.Content>
  );
}
