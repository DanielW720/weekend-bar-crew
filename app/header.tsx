export const Header = () => {
  return (
    <header className="relative z-10 flex h-headerMobile flex-row items-center justify-start overflow-hidden border-b-4 border-headerText bg-gradient-to-r from-black from-25% to-headerRight text-headerText sm:h-headerSmall md:h-headerMedium">
      <div className="flex flex-row items-end pl-20">
        <div className="leading-0 flex flex-col items-center font-bold tracking-[0.3rem] sm:text-xl md:text-2xl">
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
        <span className="ml-10  w-44 text-[0.8rem] leading-5 tracking-widest">
          Discover hundreds of tasty and beautiful cocktails
        </span>
      </div>
    </header>
  );
};
