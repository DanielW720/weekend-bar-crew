"use client";

import Image from "next/image";
import { useEffect } from "react";
import Tabs from "./tabs";

export default function Page() {
  // Go to top on first render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h2 className="text-[2.125rem] tracking-widest text-cyan">Negroni</h2>
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
      <Tabs />
    </div>
  );
}
