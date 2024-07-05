import { Suspense } from "react";
import { NotFoundHomeButton } from "./notFoundHomeButton";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center gap-10 py-20 text-beige">
      <h2 className="text-2xl">404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <NotFoundHomeButton />
      </Suspense>
    </main>
  );
}
