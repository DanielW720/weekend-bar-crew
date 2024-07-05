"use client";

import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import useSearchParamsString from "@/app/hooks/useSearchParamsString";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const NotFoundHomeButton = () => {
  // Search params for the back button in order to persist the users latest search
  const searchParams = useSearchParamsString();
  const langPathname = useLanguagePathname();

  return (
    <Link
      href={`${langPathname}${searchParams}`}
      className="flex items-center gap-x-2 rounded bg-black/90 px-2 py-1 text-lg font-semibold text-darkGray shadow shadow-white"
    >
      <ArrowLeftIcon className="text-beige" height={35} width={35} />
      <span className="text-beige">Home</span>
    </Link>
  );
};
