import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { roboto } from "../lib/globals/fonts";
import Background from "./background";
import Search from "./search/search";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`px-6 ${roboto.className}`}>
      <Background />
      <div className="mt-4 flex justify-between">
        <Link href={"/"}>
          <ArrowLeftIcon className="text-beige" height={35} width={35} />
        </Link>
        <Search />
      </div>
      <div className="py-4">{children}</div>
    </div>
  );
}
