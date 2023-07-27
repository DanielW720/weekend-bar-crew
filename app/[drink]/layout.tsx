import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { roboto } from "../lib/globals/fonts";
import Background from "./background";
import Search from "./search/search";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`px-6 ${roboto.className}`}>
      <Background />
      <div className="fixed left-0 z-10 mt-4 flex w-full justify-between px-6">
        <Link href={"/"}>
          <ArrowLeftIcon className="text-beige" height={35} width={35} />
        </Link>
        <Search />
      </div>
      <div className="py-12">{children}</div>
    </div>
  );
}
