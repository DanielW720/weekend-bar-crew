import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import useSearchParamsString from "@/app/hooks/useSearchParamsString";
import { unsetBodyOverflow } from "@/app/lib/unsetBodyOverflow";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Drink } from "../../../types";

export const DrinkCard = ({ drink, drinkCard }: { drink: Drink; drinkCard: { nonAlcoholic: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParamsString();
  const pathname = useLanguagePathname();
  const [isTouching, setIsTouching] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleBackdropStart = () => {
    // Clear any existing timers
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }

    // After x milliseconds, set isTouching to true
    touchTimerRef.current = setTimeout(() => {
      setIsTouching(true);
      touchTimerRef.current = null; // Reset the timer ref
    }, 300);
  };

  const handleBackdropEnd = () => {
    // Clear the timer if it's still running
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null; // Reset the timer ref
    }

    setIsTouching(false);
  };

  const pushDrinkRoute = () => {
    // Remove search-modal parameter if present
    const searchModalExpression: RegExp = /&?search-modal=[^&\s]*/g;
    const leadingAmpersandExpression: RegExp = /^&/;
    const updatedParams = searchParams
      .toString()
      .replace(searchModalExpression, "")
      .replace(leadingAmpersandExpression, "");
    router.push(`${pathname}/${drink.name}${updatedParams}`);
    // Unset body overflow when navigating to a new route
    unsetBodyOverflow();
  };

  return (
    <motion.li
      className={`group relative h-[16rem] w-[17rem] cursor-pointer select-none overflow-hidden rounded-3xl border-2 border-beige bg-black/50 tracking-wider transition-all hover:scale-105 hover:border-white md:h-[12rem] md:w-[13rem] lg:h-[16rem] lg:w-[17rem]`}
      onTouchStart={handleBackdropStart}
      onHoverStart={handleBackdropStart}
      onTouchEnd={handleBackdropEnd}
      onHoverEnd={handleBackdropEnd}
      onClick={pushDrinkRoute}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence>
        {isTouching && (
          <CardBackdrop
            name={drink.name}
            shortDescription={drink.description_short}
            baseSpirits={drink.base_spirits}
            flavorProfiles={drink.flavor_profiles}
          />
        )}
      </AnimatePresence>
      {/* Image Background */}
      <Image
        src={drink.image.url}
        alt={drink.image.alt}
        fill
        sizes="(min-width: 1024px) 272px, (min-width: 768px) 208px, 272px"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
        className="pointer-events-none object-cover absolute inset-0"
      />

      {/* Non-alcoholic Badge */}
      {!drink.contains_alcohol && (
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-gradient-to-r from-green-700/60 to-green-600/60 rounded-full px-1.5 py-1 backdrop-blur-md border border-green-400/40 shadow-lg">
          <span className="text-xxs font-semibold text-white">
            {drinkCard.nonAlcoholic}
          </span>
        </div>
      )}

      {/* Text Overlay - Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 px-2 py-2 bg-gradient-to-t from-black/95 via-black/60 via-75% to-transparent">
        <h2 className="text-white text-lg font-extrabold">
          {drink.name}
        </h2>
        {drink.base_spirits.length > 0 && (
          <div className="flex flex-wrap gap-0.5">
            {drink.base_spirits.slice(0, 2).map((spirit) => (
              <CardTag key={spirit} text={spirit} />
            ))}
          </div>
        )}
        {drink.flavor_profiles.length > 0 && (
          <div className="flex flex-wrap gap-0.5">
            {drink.flavor_profiles.slice(0, 2).map((flavor) => (
              <CardTag key={flavor} text={flavor} />
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
};

const CardTag = ({ text }: { text: string }) => {
  return (
    <span className="text-xxs px-1.5 py-0.5 rounded-full bg-black/25 text-beige border border-beige/40 line-clamp-1 backdrop-blur-md">
      {text}
    </span>
  );
}

const CardBackdrop = ({
  name,
  shortDescription,
  baseSpirits,
  flavorProfiles,
}: {
  name: string;
  shortDescription: string;
  baseSpirits: string[];
  flavorProfiles: string[];
}) => {
  return (
    <motion.div
      key="card-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-black/40 via-black/50 to-black/60 px-2 backdrop-blur-md rounded-3xl`}
    >
      <h2 className="text-white text-lg font-bold mb-2 md:text-sm lg:text-lg">{name}</h2>
      <p className="text-center text-xs tracking-normal text-beige mb-4">
        {shortDescription}
      </p>
      {baseSpirits.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {baseSpirits.slice(0, 2).map((spirit) => (
            <CardTag key={spirit} text={spirit} />
          ))}
        </div>
      )}
      {flavorProfiles.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center">
          {flavorProfiles.slice(0, 3).map((flavor) => (
            <CardTag key={flavor} text={flavor} />
          ))}
        </div>
      )}
    </motion.div>
  );
};
