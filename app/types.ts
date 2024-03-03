export type Drink = {
  id: string;
  name: string;
  description_short: string;
  description: string;
  recepie: {
    ingredients: string[];
    instructions: string[];
  };
  tags: {
    alcohol: string;
    type: string[];
    base_spirit: string[];
  };
  equipment: string[];
  image: { url: string; alt: string };
};
