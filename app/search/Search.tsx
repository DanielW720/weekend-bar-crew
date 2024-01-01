"use client";

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

/**
 * Splits a string and lowercases all values. If value is null, return empty array
 * @param value String value to split and lowercase
 * @returns String array
 */
// const toLowercaseArray = (value: string | null, delimiter: string = ";") =>
//   value != null
//     ? value.split(delimiter).map((value) => value.toLowerCase())
//     : [];
