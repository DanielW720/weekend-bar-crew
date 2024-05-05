"use client";

import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import Link from "next/link";

function HeaderLink() {
  const pathname = useLanguagePathname();

  return (
    <Link
      href={pathname}
      target="_parent"
      className="w-fit text-center text-[0.85rem] font-extrabold leading-6 tracking-[0.3rem]"
    >
      <h1 className="transition-colors duration-200 hover:text-white">
        Weekend
        <br />
        Bar
        <br />
        Crew
      </h1>
    </Link>
  );
}

export default HeaderLink;
