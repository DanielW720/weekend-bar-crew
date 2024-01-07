import citrusGlassSplash from "../public/citrus-glass-splash.jpg";
import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="absolute inset-0 -z-10 flex max-h-screen items-center justify-center">
      <Image
        className="object-cover"
        src={citrusGlassSplash}
        alt="Citrus glass splash"
        fill
        priority
      />
      <div className="absolute inset-0 bg-backdropOverlay" />
    </div>
  );
};
