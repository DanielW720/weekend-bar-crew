import { Drink, RecipeDisplayNames } from "@/app/types";
import * as RadixTabs from "@radix-ui/react-tabs";

export function RecipeTab({
  recipe,
  value,
  displayNames,
  equipments,
  glassware,
}: {
  recipe: Drink["recipe"];
  value: string;
  displayNames: RecipeDisplayNames;
  equipments: string[];
  glassware: string;
}) {
  return (
    <RadixTabs.Content value={value} forceMount asChild>
      <div className="w-full">
        {/* Equipment & Glassware Card - Full Width, Top Position */}
        <div className="mb-8 w-full border border-beige rounded-lg p-3 sm:p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Equipment Section */}
            <div>
              <h3 className="text-lg tracking-wider sm:text-xl">
                {displayNames.equipment}
              </h3>
              <ul className="ml-2 mt-3 text-sm tracking-wide sm:text-base">
                {equipments.map((item, idx) => (
                  <li key={item} className="my-0.5">
                    <div
                      className={`my-0.5 flex items-center py-1 ${idx % 2 === 0 &&
                        "bg-gradient-to-r from-transparent via-darkGray to-transparent"
                        }`}
                    >
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Glassware Section */}
            <p className="text-sm tracking-wide sm:text-base">
              {displayNames.recommendedGlass} <span className="font-semibold">{glassware}</span>
            </p>
          </div>
        </div>

        {/* Ingredients & Instructions - Original Layout */}
        <div className="w-full items-start justify-evenly lg:max-w-xl xl:flex xl:max-w-none">
          <div>
            <h3 className="text-xl tracking-wider sm:mb-10 sm:text-2xl">
              {displayNames.ingredients}
            </h3>
            <ul className="ml-2 mt-4 text-sm tracking-wide sm:text-lg">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={ingredient.name} className="my-0.5 w-[80%] xl:w-full">
                  <div
                    className={`my-1 flex justify-between py-2 ${idx % 2 === 0 &&
                      "bg-gradient-to-r from-transparent via-darkGray to-transparent"
                      }`}
                  >
                    <p>{`${ingredient.name}: `}</p>
                    <p className="ml-8">{`${ingredient.quantity}`}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 xl:mt-0 xl:max-w-lg">
            <h3 className="text-xl tracking-wider sm:mb-10 sm:text-2xl">
              {displayNames.instructions}
            </h3>
            <ol className="ml-2 mt-4 text-sm tracking-wide sm:text-lg">
              {recipe.instructions.map((instruction, idx) => (
                <li
                  key={instruction}
                  className={`py-2 my-1 ${idx % 2 === 0 &&
                    "bg-gradient-to-r from-transparent via-darkGray to-transparent"
                    }`}
                >
                  <span>{idx + 1}. </span>
                  {instruction.replace(/^"|"$/g, "")}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </RadixTabs.Content>
  );
}
