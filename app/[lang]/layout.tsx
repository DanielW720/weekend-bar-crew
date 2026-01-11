import "@/app/globals.css";
import Header from "./layout/header/header";
import Footer from "./layout/footer/footer";
import MenuModal from "./layout/header/menuModal";
import { Analytics } from "@vercel/analytics/react";
import { inknut_antiqua } from "../lib/fonts";
import { supported_locales } from "@/proxy";
import { getDictionary } from "./dictionaries";
import { Locale } from "../types";
import getAlternateLanguages from "../lib/getAlternateLanguages";
import GoogleAdsense from "../googleAdsense";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const languages = getAlternateLanguages(lang as Locale);
  const dict = await getDictionary(lang as Locale);

  return {
    title: "Weekend Bar Crew",
    description: `Weekend Bar Crew - ${dict.header.slogan}`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
    alternates: {
      // canonical: `/${params.lang}`,
      languages: languages,
    },
  };
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang}>
      <body
        className={`${inknut_antiqua.className} min-h-screen overflow-x-hidden bg-black`}
      >
        <Analytics />
        <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUB_ID!} />
        <Header
          slogan={dict.header.slogan}
          language={dict.header.language}
        />
        <Suspense fallback={null}>
          <MenuModal about={dict.footer.about} contact={dict.footer.contact} />
        </Suspense>
        <div className="flex min-h-[calc(100vh-6.25rem)] flex-col justify-between">
          <main>{children}</main>
          <Footer
            about={dict.footer.about}
            contact={dict.footer.contact}
            lang={lang as Locale}
          />
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<{ lang: string }[]> {
  return supported_locales.map((lang) => ({ lang: lang }));
}
