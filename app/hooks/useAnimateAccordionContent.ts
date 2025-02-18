import { useAnimate } from "framer-motion";
import { useEffect } from "react";

function useAnimateAccordionContent(
  open: boolean,
  duration: number,
  delay: number
) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (open) {
      animate(
        scope.current,
        { y: 0, scale: 1, display: "flex" },
        { delay: delay, duration: duration }
      );
    } else {
      animate(
        scope.current,
        { y: -70, scale: 0, display: "hidden" },
        { duration: duration }
      );
    }
  }, [open, animate, delay, duration, scope]);

  return scope;
}

export default useAnimateAccordionContent;
