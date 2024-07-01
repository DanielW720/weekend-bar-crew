import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center gap-10 py-20 text-beige">
      <h2 className="text-2xl">404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="rounded bg-white px-2 py-1 text-lg font-semibold text-darkGray shadow shadow-white"
      >
        Return Home
      </Link>
    </main>
  );
}
