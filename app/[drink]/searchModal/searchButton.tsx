"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import SearchModal from "./searchModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={() =>
          router.push(
            `${pathname}?${searchParams.toString()}&search-modal=open`
          )
        }
      >
        <MagnifyingGlassIcon className="text-beige" height={35} width={35} />
      </button>
      <SearchModal />
    </div>
  );
}

export default SearchButton;
