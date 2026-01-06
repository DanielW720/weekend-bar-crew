"use client";

import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import Link from "next/link";

function HeaderLink() {
  const pathname = useLanguagePathname();

  return (
    <Link
      href={pathname}
      target="_parent"
      className="group/logo w-fit text-center text-[0.85rem] font-extrabold leading-6 tracking-[0.3rem] transition-all duration-300"
    >
      <h1 className="transition-all duration-300 group-hover/logo:text-white group-hover/logo:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-focus-visible/logo:text-white group-focus-visible/logo:outline-2 group-focus-visible/logo:outline-offset-2 group-focus-visible/logo:outline-beige">
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
