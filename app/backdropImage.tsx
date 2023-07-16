import citrusGlassSplash from "../public/citrus-glass-splash.jpg";
import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="absolute right-4 top-0 -z-10 flex h-screen w-screen items-center justify-center xs:top-[-5rem] md:top-[-10rem]">
      <Image
        className="object-cover"
        src={citrusGlassSplash}
        alt="Citrus glass splash"
        fill
        priority
      />
      <div className="absolute top-0 h-screen w-screen bg-backdropOverlay" />
    </div>
  );
};
