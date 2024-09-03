import { firestore } from "@/app/firebase";
import { Drink, drinkConverter } from "@/app/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

export default async function RelatedDrinks({ drink }: { drink: Drink }) {
  // Fetch related drinks based on the drink's tags
  const relatedDrinks = await fetchRelatedDrinks(drink);

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="mt-10 text-center text-2xl tracking-widest text-beige">
        Related drinks
      </h2>
      <div className="mt-6 flex w-full flex-wrap justify-center gap-4 text-white">
        {relatedDrinks.map((drink) => (
          <div key={drink.id}>
            <Link href={`/${drink.language}/${drink.name}`}>
              <div className="relative h-24 w-24 overflow-hidden rounded-md shadow-md">
                <Image
                  src={drink.image.url}
                  alt={drink.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

async function fetchRelatedDrinks(drink: Drink): Promise<Drink[]> {
  // Fetch drinks with at least one tag in common with the current drink
  const drinksCollection = collection(firestore, "drinks").withConverter(
    drinkConverter
  );
  const drinksQuery = query(
    drinksCollection,
    where("__name__", "!=", drink.id),
    where("base_spirits", "array-contains-any", drink.base_spirits),
    where("language", "==", drink.language)
  );
  const snapshot = await getDocs(drinksQuery.withConverter(drinkConverter));

  return snapshot.docs.map((doc) => doc.data());
}
