"use client";

import React from "react";
import { DrinkCard } from "./drinkCard";
import { Drink } from "../../types";
import { useHits, useInstantSearch } from "react-instantsearch";

function ResultGrid() {
  const hits = useHits<Drink>();
  const { status } = useInstantSearch();

  if (status === "loading") return <Loading />;

  return (
    <div className="mt-8 grid w-fit grid-cols-1 justify-items-center gap-16 px-10 pb-16 sm:grid-cols-2 md:mt-16 md:grid-cols-3 lg:gap-32 lg:px-32">
      {hits.hits.map((drink) => (
        <DrinkCard key={drink.objectID} drink={drink} />
      ))}
    </div>
  );
}

// Todo: Create skeleton loading component
function Loading() {
  return <p>Loading...</p>;
}

export default ResultGrid;
