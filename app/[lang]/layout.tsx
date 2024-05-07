import "@/app/globals.css";
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";
import { Analytics } from "@vercel/analytics/react";
import { inknut_antiqua } from "../lib/fonts";
import { supported_locales } from "@/middleware";
import { getDictionary } from "./dictionaries";
import { Locale } from "../types";

export const metadata = {
  title: "Weekend Bar Crew",
  description:
    "Weekend Bar Crew - Discover hundreds of tasty and beautiful cockatils.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  alternates: {
    canonical: "/",
    languages: {
      en: "en",
      sv: "sv",
    },
  },
};

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body
        className={`${inknut_antiqua.className} min-h-screen overflow-x-hidden bg-black`}
      >
        <Analytics />
        <Header slogan={dict.header.slogan} language={dict.header.language} />
        <div className="flex min-h-[calc(100vh-6.25rem)] flex-col justify-between">
          <main>{children}</main>
          <Footer about={dict.footer.about} contact={dict.footer.contact} />
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<{ lang: string }[]> {
  return supported_locales.map((lang) => ({ lang: lang }));
}

export const dynamicParams = false;
