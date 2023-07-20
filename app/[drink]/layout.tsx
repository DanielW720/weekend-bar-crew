import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { roboto } from "../lib/globals/fonts";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`px-6 ${roboto.className}`}>
      <div className="flex justify-between pt-4">
        <Link href={"/"}>
          <ArrowLeftIcon className="text-beige" height={35} width={35} />
        </Link>
        <MagnifyingGlassIcon className="text-beige" height={35} width={35} />
      </div>
      <div>{children}</div>
    </div>
  );
}
