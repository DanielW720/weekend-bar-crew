"use client";

import Image from "next/image";
import Tabs from "./tabs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h2 className="text-[2.125rem] tracking-widest text-cyan">
        {data.drinkDetails.title}
      </h2>
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
      <Tabs drinkDetails={data.drinkDetails} />
    </div>
  );
}

export type DrinkDetails = {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  recepie: {
    ingredients: string[];
    instructions: string[];
  };
  equipment: string[];
  image: { url: string; alt: string };
};

const data: { drinkDetails: DrinkDetails } = {
  drinkDetails: {
    id: 1,
    title: "Negroni",
    shortDescription:
      "Discover the bold allure of a Negroni, an exquisite blend of gin, Campari, and vermouth",
    description:
      "Vuxendrink med beskt klös, en given aptitretare. Det sägs att drinken skapades av greve Camillo Negroni på 20-talet när han tröttnat på den då trendiga drinken Americano (campari och söt vermouth). Han spetsade den med gin och skapade därmed en ny klassiker.",
    recepie: {
      ingredients: [
        "1 handfull is",
        "2 cl gin",
        "2 cl Martini Rosso",
        "2 cl Campari Bitter",
        "1 skiva apelsin",
      ],
      instructions: [
        "Fyll ett tumblerglas med isbitar och häll i resten av ingredienserna.",
        "Ta gärna även en bit apelsin och pressa den över drinken för att få ut apelsinskalets oljor. Gnid även mot glasets kant innan du stoppar ner den i drinken.",
      ],
    },
    equipment: ["Tumblerglas eller liknande", "Kniv"],
    image: { url: "/Negroni.jpg", alt: "Negroni drink" },
  },
};
