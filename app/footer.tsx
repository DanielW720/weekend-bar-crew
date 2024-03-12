import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="z-50 flex h-16 w-full items-center justify-evenly border-t-2 border-beige bg-[#121212] px-6 py-2 sm:justify-center">
      <div
        className={`w-fit text-center text-[0.65rem] font-extrabold leading-[0.8rem] tracking-[0.2rem] text-beige`}
      >
        <h3>
          Weekend
          <br />
          Bar
          <br />
          Crew
        </h3>
      </div>
      <ul className="text-xs text-white sm:ml-20">
        <li className="inline-block">
          <Link href={"/info"}>About</Link>
        </li>
        <li className="mx-4 inline-block">
          <Link href={"/info"}>Contact</Link>
        </li>
        <li className="inline-block">
          <Link href={"#"}>Instagram</Link>
        </li>
      </ul>
    </footer>
  );
}
