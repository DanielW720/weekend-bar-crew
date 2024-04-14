import React, { useState } from "react";
import Facet from "./facet";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { IoChevronDown } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import useAnimateAccordionContent from "@/app/hooks/useAnimateAccordionContent";

export default function FacetsAccordion() {
  const [open, setOpen] = useState(false);
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
        <div className="my-4 flex w-full justify-center">
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="group">
              <motion.div
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-thin tracking-wider text-gray-200 sm:text-[1rem]"
              >
                <span>Options</span>
                <IoChevronDown className="transform duration-300 group-data-[state=open]:rotate-180" />
              </motion.div>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
        </div>
        <AccordionContent
          open={open}
          duration={animationDuration}
          delay={animationDelay}
        />
        <RadixAccordion.Content className="px-4 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <AnimatePresence>
            {open && (
              <motion.div
                className="z-0 h-[170px] w-full rounded-2xl border-2 border-beige bg-extraDarkGray/50 backdrop-blur-lg"
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
  open,
  duration,
  delay,
}: {
  open: boolean;
  duration: number;
  delay: number;
}) => {
  const scope = useAnimateAccordionContent(open, duration, delay);

  return (
    <motion.div
      ref={scope}
      className={`absolute z-50 hidden h-[170px] w-full items-center justify-center px-4 opacity-0`}
    >
      <div className="grid h-fit w-fit grid-cols-2 items-center justify-items-start gap-x-3 gap-y-3 py-3 sm:grid-cols-3">
        {facets.map((facet) => (
          <Facet
            attribute={facet.attribute}
            displayName={facet.en}
            key={facet.attribute}
          />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Facets with display names for different languages.
 */
const facets: { attribute: string; en: string }[] = [
  {
    attribute: "base_spirit",
    // Based on the selected language by user, use the appropriate display name
    en: "Base Spirit",
    // sv: "Grundspirit",
    // no: "Basisånd",
    // dk: "Basisalkohol",
    // fi: "Pohja-alkoholi",
    // is: "Grunnspyrt",
  },
  {
    attribute: "difficulty_level",
    en: "Difficulty",
  },
  {
    attribute: "flavor_profile",
    en: "Flavor Profile",
  },
  {
    attribute: "glassware",
    en: "Glassware",
  },
  {
    attribute: "mocktail_available",
    en: "Non-Alcoholic",
  },
  {
    attribute: "preparation_time_min",
    en: "Prep Time",
  },
  {
    attribute: "type",
    en: "Type",
  },
];
