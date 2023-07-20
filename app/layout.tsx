import "./globals.css";
import { Header } from "./Header";
import { inknut_antiqua } from "./lib/globals/fonts";

export const metadata = {
  title: "Weekend Bar Crew",
  description:
    "Weekend Bar Crew - Discover hundreds of tasty and beautiful cockatils.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inknut_antiqua.className} bg-black`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
