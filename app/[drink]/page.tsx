"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Page() {
  // Go to top on first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="text-3xl tracking-widest text-cyan">Margarita</h2>
      <div className="relative mt-6 h-[21rem] w-[19rem]">
        <Image
          src={"/caipirinha.jpg"}
          alt="Drink"
          fill
          className="rounded-[2rem] border-b-4 border-b-beigeRed object-cover"
        />
      </div>
    </div>
  );
}
