"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { roboto } from "../lib/globals/fonts";
import Background from "./background";
import Search from "./search/search";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
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
      className={`px-6 ${roboto.className}`}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.2 }}
      variants={variants}
    >
      <Background />
      <div
        className="fixed left-0 z-10 mt-4 flex w-full justify-between px-6"
        id="back-and-search"
      >
        <Link href={`/?${searchParams.toString()}`}>
          <ArrowLeftIcon className="text-beige" height={35} width={35} />
        </Link>
        <Search />
      </div>
      <div className="py-12">{children}</div>
    </motion.div>
  );
}
