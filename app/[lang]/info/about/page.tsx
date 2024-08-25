import { Locale } from "@/app/types";
import Link from "next/link";
import React from "react";
import { getDictionary } from "../../dictionaries";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="flex flex-col gap-4 sm:gap-8">
      <h1 className="mb-4 text-center text-2xl tracking-wider text-beige sm:text-3xl font-bold">
        {dict.about.title}
      </h1>
      {dict.about.content_paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 10)}>{paragraph}</p>
      ))}
      <br />
      <p className="text-center text-3xl">🍸</p>
      <br />
      <div className="mx-auto max-w-lg rounded-md bg-extraDarkGray p-2 text-xs leading-5 shadow-md shadow-darkGray">
        <p>{dict.about.suggestions}</p>
        <br />
        <div className="mx-auto w-fit">
          <Link
            href={`/${params.lang}/info/contact`}
            className="text-blue-400 hover:underline"
          >
            👉 {dict.about.contact_page}
          </Link>
        </div>
      </div>
    </div>
  );
}
