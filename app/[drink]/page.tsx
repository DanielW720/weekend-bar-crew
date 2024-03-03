import { collection, getDocs, query, where } from "firebase/firestore";
import DrinkImage from "./drinkImage";
import Tabs from "./tabs/tabs";
import { firestore } from "../firebase";
import { Drink } from "../types";

type DynamicDrinkParams = { drink: string };

export default async function Page({ params }: { params: DynamicDrinkParams }) {
  // Use the params.drink to fetch drink data at build time to statically render this page
  const drink = await fetchDrink(params.drink);

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h1 className="text-[2.125rem] tracking-widest text-cyan">
        {drink.name}
      </h1>
      <DrinkImage image={drink.image} />
      <Tabs drink={drink} />
    </div>
  );
}

// generateStaticParams allows static rendering of all individual drink pages at build time
export async function generateStaticParams(): Promise<{ drink: string }[]> {
  const querySnapshot = await getDocs(collection(firestore, "drinks"));

  const drinks: { drink: string }[] = querySnapshot.docs.map((doc) => ({
    drink: doc.get("name"),
  }));

  return drinks;
}

// This async function only runs on the server, either during build time or during revalidation
async function fetchDrink(drink: string) {
  const drinksCollectionReference = collection(firestore, `drinks`);
  const drinkQuery = query(
    drinksCollectionReference,
    where("name", "==", decode_utf8(drink))
  );
  const snapshot = await getDocs(drinkQuery);

  // Perform validation on document. If incorrect, log info to console and return.
  if (snapshot.empty || snapshot.size > 1) {
    console.error(
      `The number of documents in fetchDrink("${drink}") should be exactly 1 but were ${snapshot.size}`
    );
    throw new Error(
      "Number of documents in snapshot is incorrect. Should be exactly one document."
    );
  }
  // More validation...

  const doc = snapshot.docs[0];
  return doc.data() as Drink;
}

function decode_utf8(s: string) {
  return decodeURIComponent(s);
}

// If user goes to /<drink-that-do-not-exist>, it will result in 404 not found
export const dynamicParams = false;

// Revalidate every hour
export const revalidate = 3600;
