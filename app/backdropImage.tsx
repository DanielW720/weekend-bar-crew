import citrusGlassSplash from "../public/citrus-glass-splash.jpg";
import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="fixed -z-10 h-screen w-screen max-w-lg xs:max-w-xl sm:max-w-3xl">
      <Image
        className="object-cover"
        src={citrusGlassSplash}
        alt="Citrus glass splash"
        fill
        priority
      />
      <div className="fixed inset-0 h-screen bg-backdropOverlay" />
    </div>
  );
};
