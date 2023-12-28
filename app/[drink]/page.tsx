"use client";

import Image from "next/image";
import Tabs from "./tabs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h2 className="text-[2.125rem] tracking-widest text-cyan">Negroni</h2>
      <motion.div
        className="relative mt-6 h-[21rem] w-[19rem]"
        initial={{ y: 100, scale: 0.8 }}
        animate={{ y: 0, scale: 1 }}
      >
        <Image
          src={"/negroni.jpg"}
          alt="Drink"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
          className="rounded-[2rem] border-b-4 border-b-beige object-cover"
        />
      </motion.div>
      <Tabs />
    </div>
  );
}
