import React from "react";
import FooterLinks from "./footerLinks";

export default function Footer({
  about,
  contact,
}: {
  about: string;
  contact: string;
}) {
  return (
    <footer className="z-50 flex h-16 w-full items-center justify-evenly border-t-2 border-beige bg-[#121212] px-6 py-2 sm:justify-center">
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
      <FooterLinks about={about} contact={contact} />
    </footer>
  );
}
