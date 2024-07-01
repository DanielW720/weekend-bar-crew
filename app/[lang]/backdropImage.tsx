import Image from "next/image";

export const BackdropImage = () => {
  return (
    <div className="fixed top-20 -z-10 h-screen w-screen max-w-lg overflow-hidden xs:max-w-xl sm:max-w-3xl">
      <Image
        className="object-cover"
        src="/images/citrus-glass-splash.jpg"
        alt="Citrus glass splash"
        fill
        priority
      />
      <div className="absolute h-full w-full bg-backdropOverlay" />
    </div>
  );
};
