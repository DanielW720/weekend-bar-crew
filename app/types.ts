export type DrinkDetails = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  recepie: {
    ingredients: string[];
    instructions: string[];
  };
  tags: {
    alcohol: string;
    type: string[];
    baseSpirit: string[];
  };
  equipment: string[];
  image: { url: string; alt: string };
};
