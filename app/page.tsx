import { Search } from "./search/search";
import { BackdropImage } from "./backdropImage";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <BackdropImage />
      <Search />
    </div>
  );
}
