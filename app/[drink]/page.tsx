import { data } from "./data";
import DrinkImage from "./drinkImage";
import Tabs from "./tabs";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <h2 className="text-[2.125rem] tracking-widest text-cyan">
        {data.drinkDetails.title}
      </h2>
      <DrinkImage />
      <Tabs drinkDetails={data.drinkDetails} />
    </div>
  );
}
