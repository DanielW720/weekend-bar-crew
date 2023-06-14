import citrusGlassSplash from "../public/citrus-glass-splash.jpg";
import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="absolute top-0 z-0 flex min-h-screen min-w-full items-center justify-center xs:top-[-5rem] md:top-[-10rem]">
      <Image
        className=""
        src={citrusGlassSplash}
        alt="Citrus glass splash"
        priority={true}
      />
      <div className="absolute h-full w-full bg-backdropOverlay" />
    </div>
  );
};
