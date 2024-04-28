import { Suspense } from "react";
import BackButton from "./backButton";
import SearchButton from "./searchButton";

export default function BackAndSearchStickyButtons() {
  return (
    <div
      className="absolute left-0 z-10 mt-4 flex w-full justify-between px-6"
      id="back-and-search"
    >
      <Suspense fallback={<BackButtonFallback />}>
        <BackButton />
        <SearchButton />
      </Suspense>
    </div>
  );
}

function BackButtonFallback() {
  return <div>Placeholder for BackButton</div>;
}
