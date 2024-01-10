import citrusGlassSplash from "../public/citrus-glass-splash.jpg";
import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center">
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
