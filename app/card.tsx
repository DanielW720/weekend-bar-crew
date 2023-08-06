"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { roboto } from "./lib/globals/fonts";

export const Card = ({
  src,
  title,
  shortDescription,
}: {
  src: string;
  title: string;
  shortDescription: string;
}) => {
  const router = useRouter();
  const [isTouching, setIsTouching] = useState(false);
  let touchTimer: NodeJS.Timeout;

  const handleTouchStart = () => {
    touchTimer = setTimeout(() => setIsTouching(true), 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimer);
    setIsTouching(false);
  };

  return (
    <motion.div
      className={`${roboto.className} group relative my-8 h-[13rem] w-[17rem] select-none overflow-hidden rounded-3xl border-b-2 border-b-beige bg-black/50 tracking-wider`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => router.push(`/${title}`)}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      <AnimatePresence>
        {isTouching && <CardBackdrop shortDescription={shortDescription} />}
      </AnimatePresence>
      <div className="relative top-0 h-[10.5rem] w-full">
        <Image
          src={src}
          alt="Drink"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
          className="pointer-events-none object-cover"
        />
      </div>
      <div className="flex h-[2.4rem] items-center justify-center rounded-b-3xl px-2 py-1 text-white backdrop-blur-sm">
        <h2 className="text-center text-[1.1rem]">{title}</h2>
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
      <p className="text-center text-sm font-light text-beige">
        {shortDescription}
      </p>
    </motion.div>
  );
};
