import "./globals.css";
import { Header } from "./header";
import { inknut_antiqua } from "./lib/globals/fonts";
import Footer from "./footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Weekend Bar Crew",
  description:
    "Weekend Bar Crew - Discover hundreds of tasty and beautiful cockatils.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inknut_antiqua.className} min-h-screen overflow-x-hidden bg-black`}
      >
        <Analytics />
        <Header />
        <div className="flex min-h-[calc(100vh-6.25rem)] flex-col justify-between">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
