import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  setBodyOverflowHidden,
  unsetBodyOverflow,
} from "../lib/unsetBodyOverflow";

function useMenuModal(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const doOpen = searchParams.get("menu-modal") === "open";
    // Is already open, do nothing (except keep body scrolling disabled)
    if (isOpen && doOpen) {
      setBodyOverflowHidden();
      return;
    }
    // Should be opened
    else if (doOpen) {
      setBodyOverflowHidden();
      setIsOpen(true);
    }
    // Is already open but should be closed
    else if (isOpen) {
      unsetBodyOverflow();
      setIsOpen(false);
    }
  }, [searchParams, isOpen]);

  const open = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("menu-modal", "open");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const close = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("menu-modal");
    router.push(
      `${pathname}?${newParams.toString()}`.replace(/\?$/, "")
    );
  };

  return [isOpen, open, close];
}

export default useMenuModal;
