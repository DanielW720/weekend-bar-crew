import React from "react";
import Facet from "./facet";

export default function Facets() {
  return (
    <div className="mt-6 flex max-w-lg flex-wrap items-center justify-center gap-3 px-4 md:gap-5">
      {facets.map((facet) => (
        <Facet
          attribute={facet.attribute}
          displayName={facet.en}
          key={facet.attribute}
        />
      ))}
    </div>
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
    en: "Difficulty Level",
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
    en: "Preparation Time",
  },
  {
    attribute: "type",
    en: "Type",
  },
];
