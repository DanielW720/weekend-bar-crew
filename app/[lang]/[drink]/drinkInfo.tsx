import { Drink } from "@/app/types";
import { MdShowChart } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { GiWineGlass } from "react-icons/gi";

type DrinkInfoProps = {
  drink: Drink;
  nonAlcoholicLabel: string;
  drinkInfo: {
    difficulty: string;
    prepTime: string;
    glassware: string;
    baseSpirits: string;
    flavorProfiles: string;
  };
};

export default function DrinkInfo({ drink, nonAlcoholicLabel, drinkInfo }: DrinkInfoProps) {
  return (
    <div className="w-full mt-12 px-4 sm:px-6 max-w-xl">
      {/* Quick Stats Section */}
      <div className="mb-8 pb-8 border-b border-beige/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Difficulty */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-1.5 mb-2">
              <MdShowChart className="w-5 h-5 text-beige" />
              <p className="text-xs text-beige/50 uppercase tracking-widest font-semibold">
                {drinkInfo.difficulty}
              </p>
            </div>
            <p className="text-base font-bold text-beige">
              {drink.difficulty_level.label}
            </p>
          </div>

          {/* Prep Time */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-1.5 mb-2">
              <IoTime className="w-5 h-5 text-beige" />
              <p className="text-xs text-beige/50 uppercase tracking-widest font-semibold">
                {drinkInfo.prepTime}
              </p>
            </div>
            <p className="text-base font-bold text-beige">
              {drink.preparation_time_min} min
            </p>
          </div>

          {/* Glassware */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-1.5 mb-2">
              <GiWineGlass className="w-5 h-5 text-beige" />
              <p className="text-xs text-beige/50 uppercase tracking-widest font-semibold">
                {drinkInfo.glassware}
              </p>
            </div>
            <p className="text-base font-bold text-beige">{drink.glassware}</p>
          </div>
        </div>
      </div>

      {/* Base Spirits Section */}
      {drink.base_spirits.length > 0 && (
        <div className="mb-8 pb-8 border-b border-beige/20">
          <h3 className="text-xs text-beige/50 uppercase tracking-widest mb-4 font-semibold">
            {drinkInfo.baseSpirits}
          </h3>
          <div className="flex flex-wrap gap-2">
            {drink.base_spirits.map((spirit) => (
              <span
                key={spirit}
                className="px-3 py-1.5 rounded-full bg-white/10 text-beige border border-beige/40 text-sm font-medium"
              >
                {spirit}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Flavor Profiles Section */}
      {drink.flavor_profiles.length > 0 && (
        <div>
          <h3 className="text-xs text-beige/50 uppercase tracking-widest mb-4 font-semibold">
            {drinkInfo.flavorProfiles}
          </h3>
          <div className="flex flex-wrap gap-2">
            {drink.flavor_profiles.map((flavor) => (
              <span
                key={flavor}
                className="px-3 py-1.5 rounded-full bg-white/5 text-beige/80 border border-beige/25 text-sm"
              >
                {flavor}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
