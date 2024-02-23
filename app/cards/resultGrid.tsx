"use client";

import React from "react";
import { Card } from "./card";
import useFirestoreDrinks from "../hooks/useFirestoreDrinks";

function ResultGrid() {
  const [items, loading] = useFirestoreDrinks();

  // Todo: Create skeleton loading component
  if (loading) return <p>loading...</p>;

  console.log("loading:", loading);
  console.log("items:", items);

  return (
    <div className="grid w-fit grid-cols-1 justify-items-center gap-16 px-10 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-32">
      {data.drinks.map((drink) => (
        <Card key={drink.id} drinkItem={drink} />
      ))}

      <Card
        key={items[0]["name"]}
        drinkItem={{
          id: items[0]["name"],
          name: items[0]["name"],
          imageUrl: items[0]["imageUrl"],
          shortDescription: items[0]["desciption_short"],
          tags: {
            alcohol: "true",
            type: ["strong, classic"],
            baseSpirit: ["whiskey"],
          },
        }}
      />
    </div>
  );
}

export default ResultGrid;

export type DrinkItem = {
  id: number;
  name: string;
  shortDescription: string;
  imageUrl: string;
  tags: {
    alcohol: string;
    type: string[];
    baseSpirit: string[];
  };
};

const data: { drinks: DrinkItem[] } = {
  drinks: [
    {
      id: 1,
      name: "Negroni",
      shortDescription:
        "Discover the bold allure of a Negroni, an exquisite blend of gin, Campari, and vermouth",
      imageUrl: "/negroni.jpg",
      tags: {
        alcohol: "yes",
        type: ["stirred", "classic", "bitter", "strong"],
        baseSpirit: ["gin", "sweet vermouth", "vermouth", "campari"],
      },
    },
    {
      id: 2,
      name: "Aperol Spritz",
      shortDescription:
        "Embrace the vibrant effervescence of an Aperol Spritz, a captivating fusion of Aperol, prosecco, and a splash of soda",
      imageUrl: "/aperol-spritz.jpg",
      tags: {
        alcohol: "yes",
        type: ["spritz"],
        baseSpirit: ["aperol"],
      },
    },
    {
      id: 3,
      name: "Caipirinha",
      shortDescription:
        "Experience the rhythmic flavors of Brazil in every sip with the irresistible caipirinha cocktail",
      imageUrl: "/caipirinha.jpg",
      tags: {
        alcohol: "yes",
        type: ["sour", "smashed"],
        baseSpirit: ["cachaça"],
      },
    },
  ],
};
