import React from "react";
import { Searchbar } from "./Searchbar";
import { Tags } from "./Tags";
import { roboto } from "../lib/globals/fonts";

export const Search = () => {
  return (
    <div className={`${roboto.className}`}>
      <Searchbar />
      <Tags />
    </div>
  );
};
