import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import removeSearchModalParam from "../lib/removeSearchModalParam";
import {
  setBodyOverflowHidden,
  unsetBodyOverflow,
} from "../lib/unsetBodyOverflow";

function useOpenSearchModal(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const doOpen = searchParams.get("search-modal") === "open";
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
  }, [searchParams]);

  const close = () =>
    router.push(
      `${pathname}?${removeSearchModalParam(searchParams.toString())}`
    );

  return [isOpen, close];
}

export default useOpenSearchModal;
