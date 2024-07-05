import { collection, getDocs, query, where } from "firebase/firestore";
import DrinkImage from "./drinkImage";
import Tabs from "./tabs/tabs";
import { Locale, drinkConverter } from "@/app/types";
import { firestore } from "@/app/firebase";
import { getDictionary } from "../dictionaries";
import getAlternativeLanguages from "@/app/lib/getAlternateLanguages";
import { notFound } from "next/navigation";

// Dynamic segments not included in generateStaticParams are generated on demand. E.g., when a new
// recipe is added to the database, the new drink page should be available directly waiting for revalidation.
export const dynamicParams = true;
// Revalidate every 15th minute. If a recipe is removed from the database, the page will be removed after revalidation.
export const revalidate = 900;

export default async function Page({
  params,
}: {
  params: { lang: Locale; drink: string };
}) {
  // Use the params.drink to fetch drink data at build time to statically render this page
  const drink = await fetchDrink(params.drink, params.lang);
  const dict = await getDictionary(params.lang);

  if (!drink) notFound();

  return (
    <div className="flex w-full flex-col items-center py-12">
      <h1 className="mt-6 text-4xl tracking-widest text-beige">{drink.name}</h1>
      <DrinkImage image={drink.image} />
      <Tabs
        drink={JSON.parse(JSON.stringify(drink))}
        tabs={dict.drinkpage.tabs}
        recipeDisplayNames={dict.drinkpage.recipe}
      />
    </div>
  );
}

// Generates the drink subpath routes. For each language, it generates one subpath per drink available in that language.
export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}): Promise<{ drink: string }[]> {
  // Get all drinks of language params.lang
  const drinksCollection = collection(firestore, "drinks");
  const drinksQuery = query(
    drinksCollection,
    where("language", "==", params.lang)
  );
  const snapshot = await getDocs(drinksQuery.withConverter(drinkConverter));

  const drinks = snapshot.docs.map((doc) => ({
    drink: encodeURI(doc.data().name),
  }));

  return drinks;
}

// Generates dynamic metadata, other than those defined statically in parent rout
export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; drink: string };
}) {
  const drink = await fetchDrink(params.drink, params.lang);

  if (!drink)
    return {
      title: "Weekend Bar Crew - 404",
    };

  const languages = getAlternativeLanguages(params.lang, params.drink);

  return {
    title: `Weekend Bar Crew - ${params.drink}`,
    description: drink.description_short,
    alternates: {
      canonical: `/${params.lang}/${drink.name}`,
      languages: languages,
    },
  };
}

// This async function only runs on the server, either during build time or during revalidation. It fetches drinks that fulfills both the name field and the language field, which should be at most one drink.
async function fetchDrink(name: string, language: string) {
  const drinksCollectionReference = collection(firestore, `drinks`);

  const drinkQuery = query(
    drinksCollectionReference,
    where("name", "==", decodeURI(decodeURI(name))),
    where("language", "==", language)
  );
  const snapshot = await getDocs(drinkQuery.withConverter(drinkConverter));

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return doc.data();
}
