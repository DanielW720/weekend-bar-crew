import { Search } from "./search/search";
import { BackdropImage } from "./backdropImage";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-start">
      <BackdropImage />
      <Suspense fallback={<SearchFallback />}>
        <Search />
      </Suspense>
    </div>
  );
}

// TODO: Update fallback component
function SearchFallback() {
  return <div>Placeholder for Search</div>;
}
