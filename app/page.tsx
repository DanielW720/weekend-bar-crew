import { Search } from "./search/search";
import ResultGrid from "./cards/resultGrid";
import { BackdropImage } from "./backdropImage";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <BackdropImage />
      <Search />
      <ResultGrid />
    </div>
  );
}
