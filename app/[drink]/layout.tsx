import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { roboto } from "../lib/globals/fonts";
import Background from "./background";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`px-6 ${roboto.className}`}>
      <Background />
      <div className="mt-4 flex justify-between">
        <Link href={"/"}>
          <ArrowLeftIcon className="text-beige" height={35} width={35} />
        </Link>
        <MagnifyingGlassIcon className="text-beige" height={35} width={35} />
      </div>
      <div className="py-4">{children}</div>
    </div>
  );
}
