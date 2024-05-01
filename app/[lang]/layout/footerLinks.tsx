"use client";

import Link from "next/link";
import useLanguagePathname from "@/app/hooks/useLanguagePathname";

function FooterLinks({ about, contact }: { about: string; contact: string }) {
  const pathname = useLanguagePathname();

  return (
    <ul className="text-xs text-white sm:ml-20">
      <li className="inline-block">
        <Link href={`${pathname}/info`}>{about}</Link>
      </li>
      <li className="mx-4 inline-block">
        <Link href={`${pathname}/info`}>{contact}</Link>
      </li>
      <li className="inline-block">
        <Link href={`${pathname}/info`}>Instagram</Link>
      </li>
    </ul>
  );
}

export default FooterLinks;
