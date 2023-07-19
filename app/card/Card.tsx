"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export const Card = ({
  src,
  title,
  shortDescription,
}: {
  src: string;
  title: string;
  shortDescription: string;
}) => {
  const [isTouching, setIsTouching] = useState(false);
  let touchTimer: NodeJS.Timeout;

  return (
    <div
      className={`group relative my-8 h-[13rem] w-[17rem] select-none overflow-hidden rounded-3xl border-b-2 border-b-beigeRed bg-black/50`}
      onTouchStart={() => {
        touchTimer = setTimeout(() => setIsTouching(true), 500);
      }}
      onTouchEnd={() => {
        clearTimeout(touchTimer);
        setIsTouching(false);
      }}
    >
      <AnimatePresence>
        {isTouching && <CardBackdrop shortDescription={shortDescription} />}
      </AnimatePresence>
      <div className="relative top-0 h-[10.5rem] w-full">
        <Image src={src} alt="Drink" fill className="object-cover" />
      </div>
      <div className="flex h-[2.4rem] items-center justify-center rounded-b-3xl px-2 py-1 text-white backdrop-blur-sm">
        <h2 className="text-center text-[0.9rem]">{title}</h2>
      </div>
    </div>
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
      <p className="text-center text-xs text-beigeRed">{shortDescription}</p>
    </motion.div>
  );
};
