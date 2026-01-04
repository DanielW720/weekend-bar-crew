import { Suspense } from "react";
import BackButton from "./backButton";
import SearchButton from "./searchButton";
import { Search } from "@/app/types";

export default function BackAndSearchStickyButtons({
  search,
  drinkCard,
}: {
  search: Search;
  drinkCard: { nonAlcoholic: string };
}) {
  return (
    <div
      className="absolute left-0 z-10 mt-4 flex w-full justify-between px-6"
      id="back-and-search"
    >
      <Suspense fallback={<BackButtonFallback />}>
        <BackButton />
        <SearchButton search={search} drinkCard={drinkCard} />
      </Suspense>
    </div>
  );
}

function BackButtonFallback() {
  return <div>Placeholder for BackButton</div>;
}
