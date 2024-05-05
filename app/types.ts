import dict from "./[lang]/dictionaries/en.json";

/**
 * Data model used in Cloud Firestore "drinks" collection.
 */
export type Drink = {
  id: string;
  base_spirit: string[];
  description: string[];
  description_short: string;
  difficulty_level: string;
  equipment: string[];
  flavor_profile: string[];
  glassware: string[];
  image: { url: string; alt: string };
  language: string;
  mocktail_available: string;
  mocktail_recepie?: {
    ingredients: {
      name: string;
      metricQuantity: string;
      imperialQuantity: string;
    }[];
    instructions: string[];
  };
  name: string;
  preparation_time_min: string;
  recepie: {
    ingredients: {
      name: string;
      metricQuantity: string;
      imperialQuantity: string;
    }[];
    instructions: string[];
  };
  type: string[];
};

// According to supported languages in middleware.js
export type Locale = "en" | "sv";

// Search types
export type Search = typeof dict.search;
export type Facets = typeof dict.search.facets;

// Drink page tabs type
export type Tabs = typeof dict.drinkpage.tabs;

// Recipe display names
export type RecipeDisplayNames = typeof dict.drinkpage.recipe;
