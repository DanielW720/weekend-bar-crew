import { useEffect, useState } from "react";

export function useScroll() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });

    // clean up code
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return offset;
}
