import { SubmitHandler, useForm } from "react-hook-form";
import "material-icons/iconfont/outlined.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchBox } from "react-instantsearch";

type Inputs = {
  query: string;
};

export const Searchbar = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { query, refine, clear } = useSearchBox();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query");
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Update search params
    let paramsString: string;
    if (searchParams.has("query")) {
      const params = [];
      for (const [key, value] of searchParams.entries()) {
        // If query is empty, remove query param altogether
        if (key === "query" && data.query === "") continue;

        params.push(`${key}=${key === "query" ? data.query : value}`);
      }
      paramsString = params.join("&");
    } else if (searchParams.toString().length === 0) {
      paramsString = `query=${data.query}`;
    } else {
      paramsString = `${searchParams}&query=${data.query}`;
    }
    router.push(`/?${paramsString}`);
    // Update search
    refine(data.query);
  };

  return (
    <div className="w-full max-w-xs px-4">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
          (e.target as HTMLFormElement).querySelector("input")?.blur();
        }}
        className="caret-beigeRed flex h-12  items-center rounded-full border-2 border-beige backdrop-blur-[1px]"
      >
        <button type="submit" className="mx-2 flex items-center">
          <MagnifyingGlassIcon color="beige" width={20} height={20} />
        </button>
        <input
          autoComplete="off"
          type="text"
          placeholder={`Search`}
          defaultValue={currentQuery != null ? currentQuery : ""}
          {...register("query")}
          className="w-full bg-inherit tracking-wide text-white outline-none placeholder:text-gray-400"
        />
        {/* Add clearing button */}
      </form>
    </div>
  );
};
