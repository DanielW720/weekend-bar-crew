"use client";

import Link from "next/link";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";

function FooterLinks() {
  const pathname = useLanguagePathname();

  return (
    <ul className="text-xs text-white sm:ml-20">
      <li className="inline-block">
        <Link href={`${pathname}/info`}>About</Link>
      </li>
      <li className="mx-4 inline-block">
        <Link href={`${pathname}/info`}>Contact</Link>
      </li>
      <li className="inline-block">
        <Link href={`${pathname}/info`}>Instagram</Link>
      </li>
    </ul>
  );
}

export default FooterLinks;
