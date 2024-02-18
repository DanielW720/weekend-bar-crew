export type DrinkDetails = {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  recepie: {
    ingredients: string[];
    instructions: string[];
  };
  equipment: string[];
  image: { url: string; alt: string };
};

export const data: { drinkDetails: DrinkDetails } = {
  drinkDetails: {
    id: 1,
    title: "Negroni",
    shortDescription:
      "Discover the bold allure of a Negroni, an exquisite blend of gin, Campari, and vermouth",
    description:
      "Vuxendrink med beskt klös, en given aptitretare. Det sägs att drinken skapades av greve Camillo Negroni på 20-talet när han tröttnat på den då trendiga drinken Americano (campari och söt vermouth). Han spetsade den med gin och skapade därmed en ny klassiker.",
    recepie: {
      ingredients: [
        "1 handfull is",
        "2 cl gin",
        "2 cl Martini Rosso",
        "2 cl Campari Bitter",
        "1 skiva apelsin",
      ],
      instructions: [
        "Fyll ett tumblerglas med isbitar och häll i resten av ingredienserna.",
        "Ta gärna även en bit apelsin och pressa den över drinken för att få ut apelsinskalets oljor. Gnid även mot glasets kant innan du stoppar ner den i drinken.",
      ],
    },
    equipment: ["Tumblerglas eller liknande", "Kniv"],
    image: { url: "/negroni.jpg", alt: "Negroni drink" },
  },
};
