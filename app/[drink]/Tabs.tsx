import React, { ReactNode, useState } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { DrinkDetails } from "./page";

export default function Tabs({ drinkDetails }: { drinkDetails: DrinkDetails }) {
  const [tab, setTab] = useState("tab2");

  return (
    <RadixTabs.Root
      className="relative z-10 mt-10 w-full" // Position relative & z-10 to allow clicking when back/search button is on top of tabs
      value={tab}
      onValueChange={setTab}
    >
      <RadixTabs.List className="flex max-w-sm justify-evenly bg-gradient-to-r from-transparent from-5% via-beige/10 to-transparent to-95% p-2">
        <Trigger value="tab1" tab={tab}>
          Översikt
        </Trigger>
        <Trigger value="tab2" tab={tab}>
          Recept
        </Trigger>
        <Trigger value="tab3" tab={tab}>
          Utrustning
        </Trigger>
      </RadixTabs.List>

      <AnimatePresence mode="wait">
        {tab === "tab1" ? (
          <SectionOne key="tab1" overview={drinkDetails.description} />
        ) : tab === "tab2" ? (
          <SectionTwo key="tab2" data={drinkDetails.recepie} />
        ) : (
          <SectionThree key="tab3" equipment={drinkDetails.equipment} />
        )}
      </AnimatePresence>
    </RadixTabs.Root>
  );
}

// Reusable Radix trigger tab button
function Trigger({
  children,
  value,
  tab,
}: {
  children: ReactNode;
  value: string;
  tab: string;
}) {
  return (
    <RadixTabs.Trigger className="group relative tracking-wider" value={value}>
      <h2 className="text-lg text-beige transition-colors duration-200 group-data-[state=active]:text-cyan">
        {children}
      </h2>
      {tab === value && (
        <motion.div
          className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-cyan"
          layoutId="underline"
          transition={{ duration: 0.2 }}
        />
      )}
    </RadixTabs.Trigger>
  );
}

function SectionOne({ overview }: { overview: string }) {
  return (
    <AnimateSection>
      <RadixTabs.Content className="mt-4 px-4 text-lg" value="tab1" forceMount>
        <p className="tracking-wideer text-white/80">{overview}</p>
      </RadixTabs.Content>
    </AnimateSection>
  );
}

function SectionTwo({
  data,
}: {
  data: { ingredients: string[]; instructions: string[] };
}) {
  return (
    <AnimateSection>
      <RadixTabs.Content className="mt-4 px-4 text-lg" value="tab2" forceMount>
        <div>
          <h3 className=" text-white">Ingredienser</h3>
          <ul className="ml-2 mt-4  text-white/80">
            {data.ingredients.map((item) => (
              <li key={item} className="my-0.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-beige" />
        <div>
          <h3 className="text-white">Instruktioner</h3>
          <ol className="ml-2 mt-4 leading-5 text-white/80">
            {data.instructions.map((e, idx) => (
              <li key={e} className="my-4">
                {`${idx + 1}. ${e}`}
              </li>
            ))}
          </ol>
        </div>
      </RadixTabs.Content>
    </AnimateSection>
  );
}

function SectionThree({ equipment }: { equipment: string[] }) {
  return (
    <AnimateSection>
      <RadixTabs.Content className="mt-4 px-4 text-lg" value="tab3" forceMount>
        <ul className="mt-2 text-white/80">
          {equipment.map((item) => (
            <li key={item} className="my-1">
              {item}
            </li>
          ))}
        </ul>
      </RadixTabs.Content>
    </AnimateSection>
  );
}

/**
 * Reusable animation-component for the sections.
 */
function AnimateSection({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
