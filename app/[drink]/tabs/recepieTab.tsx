import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { DrinkPageTabs } from "./tabs";

export function RecepieTab({
  recepie,
}: {
  recepie: { ingredients: string[]; instructions: string[] };
}) {
  return (
    <RadixTabs.Content value={DrinkPageTabs.Recepie} forceMount>
      <div>
        <h3 className=" text-white">Ingredienser</h3>
        <ul className="ml-2 mt-4  text-white/80">
          {recepie.ingredients.map((item) => (
            <li key={item} className="my-0.5">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-6 border-beige" />
      <div>
        <h3 className="text-white">Instruktioner</h3>
        <ol className="ml-2 mt-4 leading-5 text-white/80">
          {recepie.instructions.map((e, idx) => (
            <li key={e} className="my-4">
              {`${idx + 1}. ${e}`}
            </li>
          ))}
        </ol>
      </div>
    </RadixTabs.Content>
  );
}
