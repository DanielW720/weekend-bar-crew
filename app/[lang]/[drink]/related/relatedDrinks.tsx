import { firestore, functions } from "@/app/firebase";
import { Drink, drinkConverter } from "@/app/types";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import RelatedDrink from "./relatedDrink";
import { httpsCallable } from "firebase/functions";

export default async function RelatedDrinks({ drink }: { drink: Drink }) {
  // Fetch related drinks based on the drink's tags
  const relatedDrinks = await fetchRelatedDrinks(drink);

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="mt-10 text-center text-2xl tracking-widest text-beige">
        Related drinks
      </h2>
      <div className="mt-6 flex w-full flex-wrap justify-center gap-4 text-white">
        {relatedDrinks.map((relatedDrink) => (
          <RelatedDrink key={relatedDrink.id} drink={relatedDrink} />
        ))}
      </div>
    </div>
  );
}

async function fetchRelatedDrinks(drink: Drink): Promise<Drink[]> {
  try {
    if (drink.name_embedding.every((value) => value === 0)) {
      console.warn(
        `Drink ${drink.name} (${drink.id}, ${drink.language}) has a zero name embedding`
      );
      return [];
    }


    // Fetch the 5 most similar drinks to the current, excluding the current drink
    const knnQuery = httpsCallable<
      {
        query: number[];
        k?: number;
        exclude?: string[];
        alcohol?: boolean;
        language?: string;
      },
      { drinks: string[] }
    >(functions, "knn_query");
    const similarDrinks = await knnQuery({
      query: drink.name_embedding,
      k: 5,
      exclude: [drink.id],
      alcohol: drink.contains_alcohol,
      language: drink.language,
    });

    // Fetch drinks by IDs from Firestore
    const drinksCollection = collection(firestore, "drinks").withConverter(
      drinkConverter
    );
    const drinksQuery = query(
      drinksCollection,
      where(documentId(), "in", similarDrinks.data.drinks)
    );
    const snapshot = await getDocs(drinksQuery);

    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error calling knn_query. Error:", error);
    return [];
  }
}
