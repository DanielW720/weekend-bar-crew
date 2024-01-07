import Link from "next/link";
import "./globals.css";
import { Header } from "./header";
import { inknut_antiqua } from "./lib/globals/fonts";
import { BackdropImage } from "./backdropImage";

export const metadata = {
  title: "Weekend Bar Crew",
  description:
    "Weekend Bar Crew - Discover hundreds of tasty and beautiful cockatils.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inknut_antiqua.className} flex min-h-screen flex-col justify-between bg-black`}
      >
        <div>
          <Header />
          <main>{children}</main>
        </div>
        <footer className="z-10 flex w-full items-center justify-evenly border-t-2 border-beige bg-[#121212] px-6 py-2">
          <div
            className={`w-fit text-center text-[0.65rem] font-extrabold leading-[0.8rem] tracking-[0.2rem] text-beige`}
          >
            <h3>
              Weekend
              <br />
              Bar
              <br />
              Crew
            </h3>
          </div>
          <ul className="text-xs text-white">
            <li className="inline-block">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="mx-4 inline-block">
              <Link href={"#"}>Contact</Link>
            </li>
            <li className="inline-block">
              <Link href={"#"}>Instagram</Link>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
