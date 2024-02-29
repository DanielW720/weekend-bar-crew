export type DrinkItem = {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  tags: {
    alcohol: string;
    type: string[];
    baseSpirit: string[];
  };
};
