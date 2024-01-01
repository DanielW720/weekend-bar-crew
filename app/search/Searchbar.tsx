import { SubmitHandler, useForm } from "react-hook-form";
import "material-icons/iconfont/outlined.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    updateSearchParams(data.query);

  const updateSearchParams = (query: string) => {
    // Update search params
    let paramsString: string;
    if (searchParams.has("query")) {
      const params = [];
      for (const [key, value] of searchParams.entries()) {
        params.push(`${key}=${key === "query" ? query : value}`);
      }
      paramsString = params.join("&");
    } else {
      paramsString = `${searchParams}&query=${query}`;
    }
    router.push(`/?${paramsString}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="caret-beigeRed flex h-12 w-full items-center rounded-full border-2 border-beige backdrop-blur-[1px]"
    >
      <button type="submit" className="mx-2 flex items-center">
        <MagnifyingGlassIcon color="beige" width={20} height={20} />
      </button>
      <input
        autoComplete="off"
        type="text"
        placeholder={`${
          searchParams.has("query") ? searchParams.get("query") : "Search"
        }`}
        {...register("query")}
        className="bg-inherit tracking-wide text-white outline-none placeholder:text-gray-400"
      />
    </form>
  );
};
