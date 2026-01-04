import { Search } from "./search/search";
import { BackdropImage } from "./backdropImage";
import { Suspense } from "react";
import { getDictionary } from "./dictionaries";
import { Locale } from "../types";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col items-center justify-start">
      <BackdropImage />
      <Suspense fallback={<SearchFallback />}>
        <Search search={dict.search} drinkCard={dict.drinkCard} />
      </Suspense>
    </div>
  );
}

// TODO: Update fallback component
function SearchFallback() {
  return <div>Placeholder for Search</div>;
}
