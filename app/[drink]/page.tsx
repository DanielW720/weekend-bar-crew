import { collection, getDocs } from "firebase/firestore";
import { data } from "./data";
import DrinkImage from "./drinkImage";
import Tabs from "./tabs";
import { firestore } from "../firebase";

export default function Page({ params }: { params: { drink: string } }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h2 className="text-[2.125rem] tracking-widest text-cyan">
        {params.drink}
      </h2>
      <DrinkImage />
      <Tabs drinkDetails={data.drinkDetails} />
    </div>
  );
}

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(firestore, "drinks"));

  return querySnapshot.docs.map((drink) => ({
    drink: drink.get("name"),
  }));
}

// If user goes to /<drink-that-do-not-exist>, it will result in 404 not found
export const dynamicParams = false;

// Revalidate every hour
export const revalidate = 3600;
