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
    >
      <BackdropImage />
      <div className="flex w-full flex-col justify-center px-10 py-6">
        <Search />
        <div className="mt-8 flex w-full flex-col items-center">
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
      </div>
    </motion.div>
  );
}
