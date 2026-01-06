import { firestore } from "@/app/firebase";
import getAlternativeLanguages from "@/app/lib/getAlternateLanguages";
import { Locale, drinkConverter } from "@/app/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { notFound } from "next/navigation";
import { getDictionary } from "../dictionaries";
import DrinkImage from "./drinkImage";
import DrinkInfo from "./drinkInfo";
import RelatedDrinks from "./related/relatedDrinks";
import Tabs from "./tabs/tabs";

// Dynamic segments not included in generateStaticParams are generated on demand. E.g., when a new
// recipe is added to the database, the new drink page should be available directly waiting for revalidation.
export const dynamicParams = true;
// Revalidate every 15th minute. If a recipe is removed from the database, the page will be removed after revalidation.
export const revalidate = 900;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; drink: string }>;
}) {
  // Use the params.drink to fetch drink data at build time to statically render this page
  const { lang, drink: drinkName } = await params;
  const drink = await fetchDrink(drinkName, lang);
  const dict = await getDictionary(lang as Locale);

  if (!drink) notFound();

  return (
    <div className="flex w-full flex-col items-center py-12">
      <h1 className="mt-6 text-center text-4xl tracking-widest text-beige">
        {drink.name}
      </h1>
      
      {/* Image with Badges Overlay */}
      <div className="relative rounded-[1rem] border-b-2 border-beige shadow-lg mt-6 overflow-hidden">
        <DrinkImage image={drink.image} />
        
        {/* Type and Status Badges - Overlaid at Bottom */}
        {(drink.type.length > 0 || !drink.contains_alcohol) && (
          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1.5 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            {drink.type.length > 0 &&
              drink.type.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded-full bg-black/25 text-beige border border-beige/40 text-xs font-medium backdrop-blur-md"
                >
                  {t}
                </span>
              ))}
            {!drink.contains_alcohol && (
              <span className="px-2 py-1 rounded-full bg-green-700/30 text-white border border-green-400/40 text-xs font-medium backdrop-blur-sm">
                {dict.drinkCard.nonAlcoholic}
              </span>
            )}
          </div>
        )}
      </div>

      <DrinkInfo drink={drink} nonAlcoholicLabel={dict.drinkCard.nonAlcoholic} drinkInfo={dict.drinkInfo} />
      <Tabs
        drink={JSON.parse(JSON.stringify(drink))}
        tabs={dict.drinkpage.tabs}
        recipeDisplayNames={dict.drinkpage.recipe}
      />
      <RelatedDrinks drink={drink} />
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
  params: Promise<{ lang: string; drink: string }>;
}) {
  const { lang, drink } = await params;
  const drinkData = await fetchDrink(drink, lang as Locale);

  if (!drinkData)
    return {
      title: "Weekend Bar Crew - 404",
    };

  const languages = getAlternativeLanguages(lang, drink);

  return {
    title: `Weekend Bar Crew - ${drink}`,
    description: drinkData.description_short,
    alternates: {
      // canonical: `/${params.lang}/${drink.name}`,
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
