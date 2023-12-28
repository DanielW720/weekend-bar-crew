import { SubmitHandler, useForm } from "react-hook-form";
import "material-icons/iconfont/outlined.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

type Inputs = {
  query: string;
};

export const Searchbar = ({ query }: { query: string | null }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/?query=${data.query}`);
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
        placeholder={query ? query : "Search"}
        {...register("query")}
        className="bg-inherit tracking-wide text-white outline-none placeholder:text-gray-400"
      />
    </form>
  );
};
