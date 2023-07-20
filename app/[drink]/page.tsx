"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useEffect } from "react";

export default function Page() {
  // Go to top on first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="text-3xl tracking-widest text-cyan">Negroni</h2>
      <div className="relative mt-6 h-[21rem] w-[19rem]">
        <Image
          src={"/negroni.jpg"}
          alt="Drink"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMMPwIAAXgBHdkaTf8AAAAASUVORK5CYII="
          className="rounded-[2rem] border-b-4 border-b-beigeRed object-cover"
        />
      </div>
      <Tabs.Root className="mt-6 w-full" defaultValue="tab2">
        <Tabs.List className="flex max-w-sm justify-evenly text-beige">
          <Tabs.Trigger
            className="tracking-wider data-[state=active]:text-cyan"
            value="tab1"
          >
            Översikt
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tracking-wider data-[state=active]:text-cyan"
            value="tab2"
          >
            Recept
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tracking-wider data-[state=active]:text-cyan"
            value="tab3"
          >
            Utrustning
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="p-4 text-white" value="tab1">
          <p className="ml-2 text-sm">{data.overview}</p>
        </Tabs.Content>
        <Tabs.Content
          className="ml-10 mt-4 tracking-wider text-white"
          value="tab2"
        >
          <h3 className="">Ingredienser</h3>
          <ul className="mt-2 text-sm text-white/90">
            {data.ingredients.map((item) => (
              <li key={item} className="my-1">
                {item}
              </li>
            ))}
          </ul>
        </Tabs.Content>
        <Tabs.Content className="p-4 text-white" value="tab3">
          <ul className="mt-2 text-sm text-white/90">
            {data.equipment.map((item) => (
              <li key={item} className="my-1">
                {item}
              </li>
            ))}
          </ul>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

const data = {
  overview:
    "Vuxendrink med beskt klös, en given aptitretare. Det sägs att drinken skapades av greve Camillo Negroni på 20-talet när han tröttnat på den då trendiga drinken Americano (campari och söt vermouth). Han spetsade den med gin och skapade därmed en ny klassiker.",
  ingredients: [
    "1 handfull is",
    "2 cl gin",
    "2 cl Martini Rosso",
    "2 cl Campari Bitter",
    "1 skiva apelsin",
  ],
  equipment: ["Tumblerglas eller liknande", "Kniv"],
};
