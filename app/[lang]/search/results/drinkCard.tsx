import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Drink } from "../../../types";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import useSearchParamsString from "@/app/hooks/useSearchParamsString";
import { unsetBodyOverflow } from "@/app/lib/unsetBodyOverflow";

export const DrinkCard = ({ drink }: { drink: Drink }) => {
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
      className={`group relative h-[13rem] w-[17rem] cursor-pointer select-none overflow-hidden rounded-3xl border-2 border-beige bg-black/50 tracking-wider transition-all hover:scale-105 hover:border-white md:h-[10rem] md:w-[13rem] lg:h-[13rem] lg:w-[17rem]`}
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
          <CardBackdrop shortDescription={drink.description_short} />
        )}
      </AnimatePresence>
      <div className="relative top-0 h-[10.5rem] w-[17rem] overflow-hidden md:h-[7.5rem] md:w-[13rem] lg:h-[10.5rem] lg:w-[17rem]">
        <Image
          src={drink.image.url}
          alt={drink.image.alt}
          fill
          sizes="(min-width: 1024px) 272px, (min-width: 768px) 208px, 272px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="flex h-[2.4rem] items-center justify-center rounded-b-3xl px-2 py-1 text-white backdrop-blur-sm">
        <h2 className="text-center text-[1rem] md:text-sm">{drink.name}</h2>
      </div>
    </motion.li>
  );
};

const CardBackdrop = ({ shortDescription }: { shortDescription: string }) => {
  return (
    <motion.div
      key="card-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`absolute z-10 h-[calc(100%-2rem)] w-full rounded-t-3xl bg-gradient-to-b from-cardBackdrop to-transparent px-2 pt-4 backdrop-blur-sm`}
    >
      <p className="text-center text-xs tracking-normal text-beige">
        {shortDescription}
      </p>
    </motion.div>
  );
};
