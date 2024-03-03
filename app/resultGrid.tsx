"use client";

import React from "react";
import { DrinkCard } from "./cards/drinkCard";
import useSearchDrinks from "./hooks/useSearchDrinks";

function ResultGrid() {
  // Get list of drinks according to query and tags in search params
  const [items, loading] = useSearchDrinks();

  // Todo: Create skeleton loading component
  if (loading) return <p>loading...</p>;

  return (
    <div className="grid w-fit grid-cols-1 justify-items-center gap-16 px-10 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-32">
      {items.map((drink) => (
        <DrinkCard key={drink.id} drinkItem={drink} />
      ))}
    </div>
  );
}

export default ResultGrid;
