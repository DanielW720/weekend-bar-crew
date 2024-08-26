import React from "react";
import FooterLinks from "./footerLinks";
import Link from "next/link";
import { FaCopyright } from "react-icons/fa";
import { Locale } from "@/app/types";

export default function Footer({
  about,
  contact,
  lang,
}: {
  about: string;
  contact: string;
  lang: Locale;
}) {
  return (
    <footer className="z-50 h-16 w-full border-t-2 border-beige bg-[#121212] px-6 py-2 text-xs text-beige">
      <div className="mx-auto flex w-full max-w-xl items-center justify-center gap-x-4 xs:gap-x-6 sm:justify-between">
        <div
          className={`text-center text-[0.65rem] font-extrabold leading-[0.8rem] tracking-[0.2rem]`}
        >
          <h3 className="transition-colors duration-300 hover:text-white">
            <Link href={`/${lang}/`}>
              Weekend
              <br />
              Bar
              <br />
              Crew
              <FaCopyright className="mb-1 inline-block sm:hidden" />
            </Link>
          </h3>
        </div>
        <FooterLinks about={about} contact={contact} />
        <p className="hidden text-beige sm:block">
          <FaCopyright className="inline" /> 2024 weekendbarcrew.com <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
