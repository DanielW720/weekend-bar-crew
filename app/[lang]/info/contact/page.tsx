import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa6";

function Page() {
  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <h1 className="mb-4 text-center text-2xl font-bold tracking-wider text-beige sm:text-3xl">
        Contact Us
      </h1>
      <p className="text-center">
        Currently, we can only be contacted on Instagram.
      </p>
      <Link
        href="https://www.instagram.com/weekendbarcrew/"
        target="_blank"
        className="mx-auto block text-center text-beige hover:underline"
      >
        Weekend Bar Crew <br /> Instagram <br />
        <FaInstagram className="inline-block rounded-[4px] bg-gradient-to-r from-purple-500 to-pink-500 text-xl" />
      </Link>
    </div>
  );
}

export default Page;
