/**
 * Data model used in Cloud Firestore "drinks" collection.
 */
export type Drink = {
  id: string;
  base_spirit: string[];
  description: string;
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
