"use client";

import { Search } from "./search/search";
import { Card } from "./card";
import { BackdropImage } from "./backdropImage";
import { motion } from "framer-motion";

export default function Page() {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ duration: 0.2 }}
      variants={variants}
      className="flex flex-col items-center"
    >
      <BackdropImage />
      <Search />

      <div className="grid w-fit grid-cols-1 justify-items-center gap-16 px-10 py-6 sm:grid-cols-2 md:grid-cols-3">
        <Card
          src="/Negroni.jpg"
          title="Negroni"
          shortDescription="Discover the bold allure of a Negroni, an exquisite blend of gin,
              Campari, and vermouth"
        />
        <Card
          src="/aperol-spritz.jpg"
          title="Aperol-Spritz"
          shortDescription="Embrace the vibrant effervescence of an Aperol Spritz, a captivating fusion of Aperol, prosecco, and a splash of soda"
        />
        <Card
          src="/caipirinha.jpg"
          title="Caipirinha"
          shortDescription="Experience the rhythmic flavors of Brazil in every sip with the irresistible caipirinha cocktail"
        />
        <Card
          src="/Negroni.jpg"
          title="Negroni"
          shortDescription="Discover the bold allure of a Negroni, an exquisite blend of gin,
              Campari, and vermouth"
        />
      </div>
    </motion.div>
  );
}
