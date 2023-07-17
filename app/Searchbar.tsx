"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import "material-icons/iconfont/outlined.css";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-12 w-full items-center rounded-full border-2 border-beige caret-beigeRed backdrop-blur-[1px]"
    >
      <button type="submit" className="mx-2 flex items-center">
        <span className="material-icons-outlined text-beige">search</span>
      </button>
      <input
        autoComplete="off"
        type="text"
        placeholder="Search"
        {...register("query")}
        className="bg-inherit tracking-wide text-white outline-none placeholder:text-gray-400"
      />
    </form>
  );
};
