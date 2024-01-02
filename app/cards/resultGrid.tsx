import React from "react";
import { Card } from "./card";

function ResultGrid() {
  return (
    <div className="grid w-fit grid-cols-1 justify-items-center gap-16 px-10 py-6 sm:grid-cols-2 md:grid-cols-3">
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
};

const data: { drinks: DrinkItem[] } = {
  drinks: [
    {
      id: 1,
      title: "Negroni",
      shortDescription:
        "Discover the bold allure of a Negroni, an exquisite blend of gin, Campari, and vermouth",
      imageUrl: "/Negroni.jpg",
    },
    {
      id: 2,
      title: "Aperol Spritz",
      shortDescription:
        "Embrace the vibrant effervescence of an Aperol Spritz, a captivating fusion of Aperol, prosecco, and a splash of soda",
      imageUrl: "/aperol-spritz.jpg",
    },
    {
      id: 3,
      title: "Caipirinha",
      shortDescription:
        "Experience the rhythmic flavors of Brazil in every sip with the irresistible caipirinha cocktail",
      imageUrl: "/caipirinha.jpg",
    },
    {
      id: 4,
      title: "Negroni",
      shortDescription:
        "Discover the bold allure of a Negroni, an exquisite blend of gin, Campari, and vermouth",
      imageUrl: "/Negroni.jpg",
    },
  ],
};
