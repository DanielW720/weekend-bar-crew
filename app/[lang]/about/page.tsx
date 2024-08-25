import { Locale } from "@/app/types";
import Link from "next/link";
import React from "react";
import { getDictionary } from "../dictionaries";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 px-8 pb-8 text-sm leading-[22px] tracking-wide text-white/95">
      <h1 className="mb-4 text-center text-2xl tracking-wider text-beige">
        {dict.about.title}
      </h1>
      {dict.about.content_paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 10)}>{paragraph}</p>
      ))}
      <br />
      <p className="text-center text-3xl">🍸</p>
      <br />
      <div className="mx-auto max-w-lg rounded-md bg-extraDarkGray p-2 text-xs leading-5 shadow-md">
        <p>{dict.about.suggestions}</p>
        <br />
        <div className="mx-auto w-fit">
          <Link
            href={`/${params.lang}/contact`}
            className="text-blue-400 hover:underline"
          >
            👉 {dict.about.contact_page}
          </Link>
        </div>
      </div>
    </div>
  );
}
