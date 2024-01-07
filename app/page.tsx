"use client";

import { Search } from "./search/search";
import { motion } from "framer-motion";
import ResultGrid from "./cards/resultGrid";
import { BackdropImage } from "./backdropImage";

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
      <ResultGrid />
    </motion.div>
  );
}
