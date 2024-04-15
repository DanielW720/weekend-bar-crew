import React, { ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";
import { Drink } from "@/app/types";

export function RecepieTab({ recepie }: { recepie: Drink["recepie"] }) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Recepie} forceMount>
      <div>
        <h3>Ingredients</h3>
        <ul className="ml-2 mt-4">
          {recepie.ingredients.map((ingredient) => (
            <li key={ingredient.name} className="my-0.5">
              {`${ingredient.metricQuantity} of ${ingredient.name}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3>Instructions</h3>
        <ol className="ml-2 mt-4 ">
          {recepie.instructions.map((instruction, idx) => (
            <li key={instruction} className="my-4">
              <span>{idx + 1}. </span>
              {instruction.replace(/^"|"$/g, "")}
            </li>
          ))}
        </ol>
      </div>
    </RadixTabs.Content>
  );
}
