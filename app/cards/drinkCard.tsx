"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { roboto } from "../lib/globals/fonts";
import { Drink } from "../types";

export const DrinkCard = ({ drinkItem }: { drinkItem: Drink }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    router.push(`/${drinkItem.name}?${updatedParams}`);
  };

  return (
    <motion.div
      className={`${roboto.className} group relative h-[13rem] w-[17rem] cursor-pointer select-none overflow-hidden rounded-3xl border-[1px] border-b-[2px] border-beige bg-black/50 tracking-wider md:h-[10rem] md:w-[13rem] lg:h-[13rem] lg:w-[17rem]`}
      onTouchStart={handleBackdropStart}
      onHoverStart={handleBackdropStart}
      onTouchEnd={handleBackdropEnd}
      onHoverEnd={handleBackdropEnd}
      onClick={pushDrinkRoute}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      <AnimatePresence>
        {isTouching && (
          <CardBackdrop shortDescription={drinkItem.description_short} />
        )}
      </AnimatePresence>
      <div className="relative top-0 h-[10.5rem] w-[17rem] overflow-hidden md:h-[7.5rem] md:w-[13rem] lg:h-[10.5rem] lg:w-[17rem]">
        <Image
          src={drinkItem.image.url}
          alt={drinkItem.image.alt}
          fill
          sizes="(min-width: 1024px) 272px, (min-width: 768px) 208px, 272px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="flex h-[2.4rem] items-center justify-center rounded-b-3xl px-2 py-1 text-white backdrop-blur-sm">
        <h2 className="text-center text-[1.1rem] md:text-sm">
          {drinkItem.name}
        </h2>
      </div>
    </motion.div>
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
      <p className="text-center text-xs text-beige">{shortDescription}</p>
    </motion.div>
  );
};
