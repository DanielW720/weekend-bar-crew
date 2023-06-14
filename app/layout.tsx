import "./globals.css";
import { Inknut_Antiqua } from "next/font/google";
import { Header } from "./header";
import { BackdropImage } from "./backdropImage";

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
      <body className={`${inknut_antiqua.className} bg-black`}>
        <Header />
        <main>
          <BackdropImage />
          {children}
        </main>
      </body>
    </html>
  );
}
