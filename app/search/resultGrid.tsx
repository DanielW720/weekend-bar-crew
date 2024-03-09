import React from "react";
import { DrinkCard } from "../cards/drinkCard";
import { Drink } from "../types";

function ResultGrid({ items, loading }: { items: Drink[]; loading: boolean }) {
  if (loading) return Loading();

  return (
    <div className="mt-6 grid w-fit grid-cols-1 justify-items-center gap-16 px-10 pb-6 sm:grid-cols-2 md:mt-10 md:grid-cols-3 lg:gap-32">
      {items.map((drink) => (
        <DrinkCard key={drink.id} drinkItem={drink} />
      ))}
    </div>
  );
}

// Todo: Create skeleton loading component
function Loading() {
  return <p>Loading...</p>;
}

export default ResultGrid;
