import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";
import { Drink } from "@/app/types";

export function OverviewTab({
  description,
}: {
  description: Drink["description"];
}) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Overview} forceMount>
      {description.map((paragraph, idx) => (
        <p key={paragraph} className="text-sm tracking-normal sm:text-lg">
          {paragraph}
          {idx < description.length - 1 && (
            <span>
              <br />
              <br />
            </span>
          )}
        </p>
      ))}
    </RadixTabs.Content>
  );
}
