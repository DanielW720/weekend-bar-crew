"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import useSearchParamsString from "@/app/hooks/useSearchParamsString";

function BackButton() {
  // Search params for the back button in order to persist the users latest search
  const searchParams = useSearchParamsString();
  const langPathname = useLanguagePathname();

  return (
    <Link href={`${langPathname}${searchParams}`}>
      <ArrowLeftIcon className="text-beige" height={35} width={35} />
    </Link>
  );
}

export default BackButton;
