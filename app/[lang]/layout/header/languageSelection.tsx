"use client";

import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import { supported_locales } from "@/middleware";
import { CheckIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

function LanguageSelection() {
  const languagePathname = useLanguagePathname(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const onValueChangeHandler = (value: string) => {
    const path = pathname.split("/");
    path[1] = value;
    const updatedPathname = path.join("/");
    router.push(updatedPathname + "?" + searchParams.toString());
  };

  const onOpenChangeHandler = () => setOpen((prev) => !prev);

  return (
    <Select.Root
      value={languagePathname}
      onValueChange={(value: string) => onValueChangeHandler(value)}
      open={open}
      onOpenChange={onOpenChangeHandler}
    >
      <Select.Trigger className="absolute right-2 top-2 flex h-6 items-center p-1 text-xs outline-none">
        <Select.Value />
        <Select.Icon>
          <LiaGlobeEuropeSolid className="ml-[2px] text-xl text-beige" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content className="w-[4.5rem] rounded bg-darkGray px-2 text-sm text-white">
        <Select.Viewport className="p-[5px]">
          <Select.Arrow className="fill-darkGray" />
          {supported_locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {locale}
            </SelectItem>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

function SelectItem({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) {
  return (
    <Select.Item
      value={value}
      className="flex items-center justify-between py-1 outline-none data-[state=checked]:text-beige "
    >
      <Select.ItemText className="text-black">{children}</Select.ItemText>
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export default LanguageSelection;
