"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";

function BackButton() {
  // Search params for the back button in order to persist the users latest search
  const searchParams = useSearchParams();

  return (
    <Link href={`/?${searchParams.toString()}`}>
      <ArrowLeftIcon className="text-beige" height={35} width={35} />
    </Link>
  );
}

export default BackButton;
