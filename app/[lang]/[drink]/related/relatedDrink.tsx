import Image from "next/image";
import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Drink } from "@/app/types";

export default function RelatedDrink({ drink }: { drink: Drink }) {
  const href = `/${drink.language}/${drink.id}`;

  return (
    <HoverCard.Root key={drink.id}>
      <HoverCard.Trigger asChild>
        <Link href={href}>
          <div className="relative h-24 w-24 overflow-hidden rounded-md">
            <Image
              src={drink.image.url}
              alt={drink.image.alt}
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute inset-0 z-10">
              <h3 className="absolute px-1 pt-[2px] text-xxs tracking-wider text-beige">
                {drink.name}
              </h3>
            </div>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-darkGray/80 to-transparent" />
          </div>
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={5}
          side="top"
          className="border-b- z-10 mx-4 overflow-hidden rounded-md border-beige shadow-md shadow-beige/10"
        >
          <Link href={href}>
            <div className="relative h-64 w-64">
              <Image
                src={drink.image.url}
                alt={drink.image.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 z-10 p-2">
                <h3 className="text-lg font-bold tracking-wider text-beige">
                  {drink.name}
                </h3>
                <p className="text-xs text-white/90">
                  {drink.description_short}
                </p>
              </div>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent from-30% to-darkGray/90 to-85%" />
            </div>
          </Link>
          <HoverCard.Arrow className="fill-beige" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
