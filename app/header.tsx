export const Header = () => {
  return (
    <header className="sticky top-0 z-10 flex h-headerMobile w-screen flex-row items-center justify-start border-b-4 border-headerText bg-gradient-to-r from-black from-30% via-headerVia via-75% to-headerRight text-headerText sm:h-headerSmall md:h-headerMedium">
      <div className="flex flex-row items-end pl-8 xs:pl-10 md:pl-20">
        <span className="leading-0 flex flex-col items-center text-[0.775rem] font-extrabold tracking-[0.3rem] sm:text-xl md:text-2xl">
          <p>
            Weekend
            <br />
          </p>
          <p className="my-1">
            Bar
            <br />
          </p>
          <p>Crew</p>
        </span>
        <p className="w-[175px] overflow-hidden px-6 text-[0.575rem] leading-5 tracking-widest sm:ml-10 sm:text-[0.8rem] ">
          Discover hundreds of tasty and beautiful cocktails
        </p>
      </div>
    </header>
  );
};
