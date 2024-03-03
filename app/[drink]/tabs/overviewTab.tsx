import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";

export function OverviewTab({ overview }: { overview: string }) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Overview} forceMount>
      <p className="text-white/80">{overview}</p>
    </RadixTabs.Content>
  );
}
