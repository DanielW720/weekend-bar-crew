import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { Drink } from "@/app/types";

export function OverviewTab({
  description,
  value,
}: {
  description: Drink["description"];
  value: string;
}) {
  return (
    <RadixTabs.Content value={value} forceMount>
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
