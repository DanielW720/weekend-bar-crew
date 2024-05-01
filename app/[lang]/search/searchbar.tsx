import { SubmitHandler, useForm } from "react-hook-form";
import "material-icons/iconfont/outlined.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import useCurrentQuery from "@/app/hooks/useCurrentQuery";
import { unsetBodyOverflow } from "@/app/lib/unsetBodyOverflow";

type Inputs = {
  query: string;
};

export const Searchbar = ({ placeholder }: { placeholder: string }) => {
  const { setValue, register, handleSubmit } = useForm<Inputs>();
  const currentQuery = useCurrentQuery(setValue);
  const searchParams = useSearchParams();
  const pathname = usePathname();
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

    // Enable body scrolling (may have been disabled by modal)
    unsetBodyOverflow();

    router.push(`${pathname}?${paramsString}`);
  };

  return (
    <div className="w-full max-w-xs px-4 md:max-w-sm">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
          (e.target as HTMLFormElement).querySelector("input")?.blur();
        }}
        className="caret-beigeRed flex h-12 items-center rounded-full border-2 border-beige backdrop-blur-[1px]"
      >
        <button
          type="submit"
          className="mx-2 flex items-center text-lg text-beige"
        >
          <CiSearch />
        </button>
        <input
          autoComplete="off"
          type="text"
          placeholder={placeholder}
          defaultValue={currentQuery}
          {...register("query")}
          className="placeholder:text-gray-400 w-full bg-inherit tracking-wide text-white outline-none"
        />
        <button
          className="mx-2 text-lg text-beige"
          onClick={() => {
            onSubmit({ query: "" });
          }}
          type="button"
        >
          <RxCross1 />
        </button>
      </form>
    </div>
  );
};
