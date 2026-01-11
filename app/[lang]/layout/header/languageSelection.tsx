"use client";

import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import { supported_locales } from "@/proxy";
import { CheckIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

function LanguageSelection({ language }: { language: string }) {
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
      <Select.Trigger className="absolute left-4 top-4 p-1 text-sm text-beige/80 outline-none transition-colors duration-200 hover:text-white sm:left-4 sm:top-4 sm:text-sm">
        <motion.div
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.1 }}
          className="flex items-center"
        >
          <Select.Icon>
            <LiaGlobeEuropeSolid className="mr-1.5" size={16} />
          </Select.Icon>
          <Select.Value />
        </motion.div>
      </Select.Trigger>

      <Select.Content
        className="absolute rounded bg-darkGray/95 text-xs text-white"
        sideOffset={5}
        position="popper"
      >
        <Select.Arrow
          className="relative left-8 fill-darkGray"
          width={12}
          height={6}
        />
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-2 pb-1 pt-2 text-xs text-lightGray">
              {language}
            </Select.Label>
            {supported_locales.map((locale) => (
              <SelectItem key={locale} value={locale}>
                {locale}
              </SelectItem>
            ))}
          </Select.Group>
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
      className="flex cursor-pointer items-center rounded px-2 py-2 outline-none transition-colors duration-200 hover:bg-beige hover:text-extraDarkGray data-[state=checked]:text-beige data-[state=checked]:hover:text-extraDarkGray"
    >
      <Select.ItemText className="text-black">{children}</Select.ItemText>
      <Select.ItemIndicator>
        <CheckIcon className="ml-2" />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

export default LanguageSelection;
