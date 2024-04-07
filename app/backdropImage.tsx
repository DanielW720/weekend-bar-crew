import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="absolute top-0 -z-10 h-screen w-screen max-w-lg xs:max-w-xl sm:max-w-3xl">
      <Image
        className="object-cover"
        src="/citrus-glass-splash.jpg"
        alt="Citrus glass splash"
        fill
        priority
      />
      <div className="fixed inset-0 h-screen bg-backdropOverlay" />
    </div>
  );
};
