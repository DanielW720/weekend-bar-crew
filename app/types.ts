import {
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentReference,
} from "firebase/firestore";
import dict from "./[lang]/dictionaries/en.json";
import Facet from "./[lang]/search/facets/facet";

/**
 * Data model used in Cloud Firestore "drinks" collection.
 */
export type Drink = {
  name: string;
  contains_alcohol: string;
  language: string;
  description_short: string;
  description: string[];
  base_spirit: string[];
  flavor_profile: string[];
  type: string[];
  equipment: string[];
  difficulty_level: string;
  preparation_time_min: string;
  glassware: string[];
  recipe: {
    ingredients: {
      name: string;
      quantity: string;
      system: string;
    }[];
    instructions: string[];
  };
  image: { url: string; alt: string };
  id: string;
  ref: DocumentReference<DocumentData>;
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

export const drinkConverter: FirestoreDataConverter<Drink> = {
  toFirestore(drink: Drink): DocumentData {
    return {
      name: drink.name,
      description_short: drink.description_short,
      description: drink.description,
      contains_alcohol: drink.contains_alcohol,
      language: drink.language,
      base_spirit: drink.base_spirit,
      flavor_profile: drink.flavor_profile,
      type: drink.type,
      equipment: drink.equipment,
      difficulty_level: drink.difficulty_level,
      preparation_time_min: drink.preparation_time_min,
      glassware: drink.glassware,
      recipe: {
        ingredients: drink.recipe.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          system: ingredient.system,
        })),
        instructions: drink.recipe.instructions,
      },
      image: {
        url: drink.image.url,
        alt: drink.image.alt,
      },
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Drink {
    const data = snapshot.data(options);
    return {
      name: data.name,
      description_short: data.description_short,
      description: data.description,
      contains_alcohol: data.contains_alcohol,
      language: data.language,
      base_spirit: data.base_spirit,
      flavor_profile: data.flavor_profile,
      type: data.type,
      equipment: data.equipment,
      difficulty_level: data.difficulty_level,
      preparation_time_min: data.preparation_time_min,
      glassware: data.glassware,
      recipe: {
        ingredients: data.recipe.ingredients.map(
          (ingredient: { name: string; quantity: string; system: string }) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            system: ingredient.system,
          })
        ),
        instructions: data.recipe.instructions,
      },
      image: {
        url: data.image.url,
        alt: data.image.alt,
      },
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};
