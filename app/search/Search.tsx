import React from "react";
import { Searchbar } from "./searchbar";
import { Tags } from "./tags";
import { roboto } from "../lib/globals/fonts";

export const Search = () => {
  return (
    <div className={`${roboto.className} mb-10 mt-6 w-full max-w-xs px-4`}>
      <Searchbar />
      <Tags />
    </div>
  );
};
