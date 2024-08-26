"use client";

import Link from "next/link";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import { usePathname } from "next/navigation";

function FooterLinks({ about, contact }: { about: string; contact: string }) {
  const langPathname = useLanguagePathname();
  const pathname = usePathname();
  const subpath = getSubpath(pathname);

  return (
    <ul>
      <li
        className={`inline-block transition-colors duration-200 hover:text-white ${
          subpath === "about" && "text-white"
        }`}
      >
        <Link href={`${langPathname}/info/about`}>{about}</Link>
      </li>
      <li
        className={`mx-4 inline-block transition-colors duration-200 hover:text-white ${
          subpath === "contact" && "text-white"
        }`}
      >
        <Link href={`${langPathname}/info/contact`}>{contact}</Link>
      </li>
      <li
        className={`inline-block transition-colors duration-200 hover:text-white ${
          subpath === "instagram" && "text-white"
        }`}
      >
        <Link href={`${langPathname}/info/instagram`}>Instagram</Link>
      </li>
    </ul>
  );
}

export default FooterLinks;

const getSubpath = (pathname: string): string => {
  const paths = pathname.split("/");
  return paths[2] ? paths[2] : "";
};
