import React from "react";
import { Card } from "./card";
import useFirestoreDrinks from "../hooks/useFirestoreDrinks";

function ResultGrid() {
  const [items, loading] = useFirestoreDrinks();

  // Todo: Create skeleton loading component
  if (loading) return <p>loading...</p>;

  return (
    <div className="grid w-fit grid-cols-1 justify-items-center gap-16 px-10 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-32">
      {data.drinks.map((drink) => (
        <Card key={drink.id} drinkItem={drink} />
      ))}
    </div>
  );
}

export default ResultGrid;

export type DrinkItem = {
  id: number;
  title: string;
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
      title: "Negroni",
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
      title: "Aperol Spritz",
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
      title: "Caipirinha",
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
