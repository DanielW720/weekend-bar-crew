import { Search } from "./search/search";
import { BackdropImage } from "./backdropImage";
import { Suspense } from "react";
import { getDictionary } from "./dictionaries";
import { Locale } from "../types";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="flex flex-col items-center justify-start">
      <BackdropImage />
      <Suspense fallback={<SearchFallback />}>
        <Search search={dict.search} />
      </Suspense>
    </div>
  );
}

// TODO: Update fallback component
function SearchFallback() {
  return <div>Placeholder for Search</div>;
}
