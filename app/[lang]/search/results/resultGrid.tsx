import React, { useEffect, useRef } from "react";
import { Drink } from "../../../types";
import { useInfiniteHits } from "react-instantsearch";
import { DrinkCard } from "./drinkCard";

function ResultGrid() {
  const { items, showMore, isLastPage } = useInfiniteHits<Drink>();
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            console.log("Show more");
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <ul className="mt-8 grid w-fit grid-cols-1 justify-items-center gap-16 px-8 pb-16 sm:grid-cols-2 md:mt-16 md:grid-cols-3 xl:gap-32">
      {items.map((drink) => (
        <DrinkCard key={drink.objectID} drink={drink} />
      ))}
      <div ref={sentinelRef} aria-hidden="true" />
    </ul>
  );
}

export default ResultGrid;
