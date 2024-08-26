import React, { useState } from "react";
import Facet from "./facet";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { IoChevronDown } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import useAnimateAccordionContent from "@/app/hooks/useAnimateAccordionContent";
import { Facets } from "@/app/types";
import {
  useClearRefinements,
  useCurrentRefinements,
} from "react-instantsearch";
import { CiCircleRemove } from "react-icons/ci";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FacetsAccordion({
  facets,
  options,
}: {
  facets: Facets;
  options: string;
}) {
  const [open, setOpen] = useState(false);
  const { items } = useCurrentRefinements();
  const hasRefinements = items.length > 0;
  const { refine } = useClearRefinements();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const animationDuration = 0.3;
  const animationDelay = 0.2;
  const handleValueChange = () => setOpen((prev) => !prev);
  const variants = {
    closed: {
      y: -70,
      opacity: 0,
      scale: 0,
      transition: { duration: animationDuration },
    },
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { delay: animationDelay, duration: animationDuration },
    },
  };

  return (
    <RadixAccordion.Root
      className="relative w-full max-w-xs sm:max-w-lg"
      value={open ? "filters" : ""}
      onValueChange={handleValueChange}
      type="single"
      collapsible
    >
      <RadixAccordion.Item value="filters">
        <RadixAccordion.Header className="my-4 flex flex-col items-center gap-4 text-center">
          {hasRefinements && (
            <button
              type="button"
              onClick={() => {
                refine();
                // Update search params to only include the query
                const query = searchParams.get("query");
                router.push(`${pathname}${query ? `?query=${query}` : ""}`);
              }}
              className="text-xs text-beige"
            >
              Remove {items.length} {items.length > 1 ? "filters" : "filter"}
              <CiCircleRemove className="ml-1 inline-block text-sm" />
            </button>
          )}
          <RadixAccordion.Trigger className="group text-lightGray data-[state=open]:text-beige">
            <motion.div
              whileTap={{ scale: 0.93 }}
              className={`${
                hasRefinements && "text-beige"
              } flex items-center justify-center gap-2 rounded-xl px-2 py-1 text-sm font-thin tracking-wider hover:text-beige sm:text-[1rem]`}
            >
              <p className="transition-colors duration-300">{options}</p>
              <IoChevronDown className="transform duration-300 group-data-[state=open]:rotate-180" />
            </motion.div>
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <AccordionContent
          facets={facets}
          open={open}
          duration={animationDuration}
          delay={animationDelay}
        />
        <RadixAccordion.Content className="px-4 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <AnimatePresence>
            {open && (
              <motion.div
                className="z-0 h-[220px] w-full rounded-2xl border-2 border-beige bg-extraDarkGray/50 backdrop-blur-lg sm:h-[170px]"
                initial="closed"
                animate="open"
                exit="closed"
                variants={variants}
              />
            )}
          </AnimatePresence>
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    </RadixAccordion.Root>
  );
}

// The facets must always be rendered (not lazy loaded) to not mess with chosen filters
const AccordionContent = ({
  facets,
  open,
  duration,
  delay,
}: {
  facets: Facets;
  open: boolean;
  duration: number;
  delay: number;
}) => {
  const scope = useAnimateAccordionContent(open, duration, delay);

  return (
    <motion.div
      ref={scope}
      className={`absolute z-50 hidden h-[220px] w-full items-center justify-center sm:h-[170px]`}
    >
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-3 px-7 py-6">
        {facets.map((facet) => (
          <Facet
            attribute={facet.attribute}
            displayName={facet.displayName}
            key={facet.attribute}
          />
        ))}
      </div>
    </motion.div>
  );
};
