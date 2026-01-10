"use client";

import useMenuModal from "@/app/hooks/useMenuModal";
import { GiHamburgerMenu } from "react-icons/gi";


export default function MenuButton() {
  const [, open] = useMenuModal();

  return (
    <button
      onClick={open}
      className="absolute right-4 top-4 text-2xl text-beige hover:text-white transition-colors sm:mr-6"
      aria-label="Open menu"
    >
      <GiHamburgerMenu />
    </button>
  );
}
