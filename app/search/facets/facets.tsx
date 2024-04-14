import React from "react";
import Facet from "./facet";
import * as RadixAccordion from "@radix-ui/react-Accordion";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";

export default function Facets() {
  return (
    <RadixAccordion.Root
      className="relative w-full max-w-xs sm:max-w-lg"
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
        <RadixAccordion.Content className="overflow- px-4 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          {
            <div className="flex h-[170px] w-full items-center justify-center rounded-2xl border-2 border-beige bg-extraDarkGray/50 backdrop-blur-lg">
              <div className="grid h-fit w-fit grid-cols-2 items-center justify-items-start gap-x-3 gap-y-3 py-3 sm:grid-cols-3">
                {facets.map((facet) => (
                  <Facet
                    attribute={facet.attribute}
                    displayName={facet.en}
                    key={facet.attribute}
                  />
                ))}
              </div>
            </div>
          }
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    </RadixAccordion.Root>
  );
}

/**
 * Facets with display names for different languages.
 */
const facets = [
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
