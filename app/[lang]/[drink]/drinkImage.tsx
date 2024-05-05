"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Drink } from "../../types";

function DrinkImage({ image }: { image: Drink["image"] }) {
  return (
    <motion.div
      className="relative mt-10 h-[21rem] w-[19rem]"
      initial={{ y: 100, scale: 0.8 }}
      animate={{ y: 0, scale: 1 }}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="304px"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
        className="rounded-[2rem] border-b-4 border-b-beige object-cover"
      />
    </motion.div>
  );
}

export default DrinkImage;
