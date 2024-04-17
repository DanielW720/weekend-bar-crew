import React, { ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";
import { Drink } from "@/app/types";

export function RecepieTab({ recepie }: { recepie: Drink["recepie"] }) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Recepie} forceMount asChild>
      <div className="w-full items-start justify-evenly xl:flex">
        <div>
          <h3 className="text-xl tracking-wider sm:mb-10 sm:text-2xl">
            Ingredients
          </h3>
          <ul className="ml-2 mt-4 text-sm tracking-wide sm:text-lg">
            {recepie.ingredients.map((ingredient, idx) => (
              <li key={ingredient.name} className="my-0.5 w-[80%] xl:w-full">
                <div className="flex justify-between">
                  <p>{`${ingredient.name}: `}</p>
                  <p className="ml-8">{`${ingredient.metricQuantity}`}</p>
                </div>
                {idx < recepie.ingredients.length - 1 && (
                  <div className="my-2 h-[2px] bg-gradient-to-r from-transparent via-gray to-transparent" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 xl:mt-0 xl:max-w-lg">
          <h3 className="text-xl tracking-wider sm:mb-10 sm:text-2xl">
            Instructions
          </h3>
          <ol className="ml-2 mt-4 text-sm tracking-wide sm:text-lg">
            {recepie.instructions.map((instruction, idx) => (
              <li key={instruction} className="my-4">
                <span>{idx + 1}. </span>
                {instruction.replace(/^"|"$/g, "")}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </RadixTabs.Content>
  );
}
