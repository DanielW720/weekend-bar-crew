import React from "react";
import { Searchbar } from "./Searchbar";
import { Tags } from "./Tags";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["400"],
  subsets: ["cyrillic"],
});

export const Search = () => {
  return (
    <div className={`${roboto.className}`}>
      <Searchbar />
      <Tags />
    </div>
  );
};
