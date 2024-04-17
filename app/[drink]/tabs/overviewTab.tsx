import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";

export function OverviewTab({ overview }: { overview: string }) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Overview} forceMount>
      <p className="tracking-normal">{overview}</p>
    </RadixTabs.Content>
  );
}
