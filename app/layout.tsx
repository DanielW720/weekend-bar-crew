import "./globals.css";
import { Inknut_Antiqua } from "next/font/google";

const inknut_antiqua = Inknut_Antiqua({
  weight: ["700", "300"],
  subsets: ["devanagari"],
});

export const metadata = {
  title: "Weekend Bar Crew",
  description:
    "Weekend Bar Crew - Discover hundreds of tasty and beautiful cockatils.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inknut_antiqua.className}`}>
        <header className="flex flex-row items-center justify-start border-b-4 border-headerText bg-gradient-to-r from-black from-25% to-headerRight text-headerText sm:h-32 md:h-40">
          <div className="ml-20 flex flex-row items-end">
            <div className="leading-0 flex flex-col items-center font-bold tracking-[0.3rem] sm:text-xl md:text-2xl">
              <p>
                Weekend
                <br />
              </p>
              <p className="my-1">
                Bar
                <br />
              </p>
              <p>Crew</p>
            </div>
            <span className="ml-10 w-44 text-[0.8rem] leading-5 tracking-widest">
              Discover hundreds of tasty and beautiful cocktails
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
