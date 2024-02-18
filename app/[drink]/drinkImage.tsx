"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { data } from "./data";

function DrinkImage() {
  return (
    <motion.div
      className="relative mt-6 h-[21rem] w-[19rem]"
      initial={{ y: 100, scale: 0.8 }}
      animate={{ y: 0, scale: 1 }}
    >
      <Image
        src={data.drinkDetails.image.url}
        alt={data.drinkDetails.image.alt}
        fill
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
        className="rounded-[2rem] border-b-4 border-b-beige object-cover"
      />
    </motion.div>
  );
}

export default DrinkImage;
