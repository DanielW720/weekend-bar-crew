import { collection, getDocs, query } from "firebase/firestore";
import type { MetadataRoute } from "next";
import { firestore } from "./firebase";
import { drinkConverter } from "./types";
import { supported_locales } from "@/middleware";

const baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const drinksRef = collection(firestore, "drinks").withConverter(
    drinkConverter
  );
  const q = query(drinksRef);
  const querySnapshot = await getDocs(q);

  const homePages: MetadataRoute.Sitemap = supported_locales.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: "2024-08-28T18:05:50.946Z",
    changeFrequency: "yearly",
    priority: 1,
  }));

  const aboutPages: MetadataRoute.Sitemap = supported_locales.map((lang) => ({
    url: `${baseUrl}/${lang}/info/about`,
    lastModified: "2024-08-28T18:05:50.946Z",
    changeFrequency: "monthly",
    priority: 1,
  }));

  const contactPages: MetadataRoute.Sitemap = supported_locales.map((lang) => ({
    url: `${baseUrl}/${lang}/info/contact`,
    lastModified: "2024-08-28T18:05:50.946Z",
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const instagramPages: MetadataRoute.Sitemap = supported_locales.map(
    (lang) => ({
      url: `${baseUrl}/${lang}/info/instagram`,
      lastModified: "2024-08-28T18:05:50.946Z",
      changeFrequency: "monthly",
      priority: 0.5,
    })
  );

  const drinkPages: MetadataRoute.Sitemap = querySnapshot.docs.map((doc) => ({
    url: `${baseUrl}/${doc.data().language}/${doc.data().name}`,
    lastModified: "2024-08-28T18:05:50.946Z",
    changeFrequency: "monthly",
    priority: 1,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: "2024-08-28T18:05:50.946Z",
      changeFrequency: "monthly",
      priority: 1,
    },
    ...homePages,
    ...aboutPages,
    ...contactPages,
    ...instagramPages,
    ...drinkPages,
  ];
}
