import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import removeSearchModalParam from "../lib/removeSearchModalParam";

function useOpenModal(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const doOpen = searchParams.get("search-modal") === "open";

    // Is already open, do nothing
    if (isOpen && doOpen) return;

    // Should open
    if (doOpen) setIsOpen(true);
    // Is already open but should be closed (search-modal != "open")
    else if (isOpen) setIsOpen(false);
  }, [searchParams]);

  const close = () =>
    router.push(
      `${pathname}?${removeSearchModalParam(searchParams.toString())}`
    );

  return [isOpen, close];
}

export default useOpenModal;
