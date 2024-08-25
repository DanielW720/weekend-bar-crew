export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto mt-10 max-w-2xl px-8 pb-8 text-sm leading-[22px] tracking-wide text-white/95 sm:text-lg">
      {children}
    </div>
  );
}
