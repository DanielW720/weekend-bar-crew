import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { GoDotFill } from "react-icons/go";

export function EquipmentTab({
  equipment,
  value,
}: {
  equipment: string[];
  value: string;
}) {
  return (
    <RadixTabs.Content value={value} forceMount>
      <ul className="list-none">
        {equipment.map((item) => (
          <li key={item} className="my-1">
            <span className="inline-flex items-center text-sm sm:text-lg">
              <GoDotFill className="mr-2" /> {item}
            </span>
          </li>
        ))}
      </ul>
    </RadixTabs.Content>
  );
}
