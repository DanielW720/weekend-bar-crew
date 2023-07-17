import { Searchbar } from "./Searchbar";
import { Tags } from "./Tags";

export default function Page() {
  return (
    <div className="flex w-full flex-col justify-center px-10 py-6">
      <Searchbar />
      <Tags />
    </div>
  );
}
