export const Header = () => {
  return (
    <header className="relative z-10 flex h-headerMobile flex-row items-center justify-start border-b-4 border-headerText bg-gradient-to-r from-black from-25% to-headerRight text-headerText sm:h-headerSmall md:h-headerMedium">
      <div className="sm:pl-15 flex flex-row items-end pl-4 xs:pl-10 md:pl-20">
        <div className="leading-0 flex flex-col items-center text-sm font-bold tracking-[0.3rem] sm:text-xl md:text-2xl">
          <p>
            Weekend
            <br />
          </p>
          <p className="my-1">
            Bar
            <br />
          </p>
          <p>Crew</p>
        </div>
        <span className="max-w-[225px] px-4 text-[0.6rem] leading-5 tracking-widest sm:ml-10 sm:text-[0.8rem]">
          Discover hundreds of tasty and beautiful cocktails
        </span>
      </div>
    </header>
  );
};
