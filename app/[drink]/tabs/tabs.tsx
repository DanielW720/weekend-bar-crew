"use client";

import React, { ReactNode, useState } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Drink } from "../../types";
import { EquipmentTab } from "./equipmentTab";
import { OverviewTab } from "./overviewTab";
import { RecepieTab } from "./recepieTab";

export enum DrinkPageTabs {
  Overview = "Översikt",
  Recepie = "Recept",
  Equipment = "Utrustning",
}

export default function Tabs({ drink: drink }: { drink: Drink }) {
  const [tab, setTab] = useState(DrinkPageTabs.Recepie);

  const handleTabChange = (value: string) => {
    setTab(value as DrinkPageTabs); // Cast the string value to the enum type
  };

  return (
    <section className="w-full">
      <RadixTabs.Root
        className="relative z-10 mt-10 flex w-full flex-col items-center"
        value={tab}
        onValueChange={handleTabChange}
      >
        <RadixTabs.List className="flex bg-gradient-to-r from-transparent from-5% via-beige/10 to-transparent to-95% p-2">
          <Trigger value={DrinkPageTabs.Overview} tab={tab}>
            Översikt
          </Trigger>
          <div className="mx-4 sm:mx-8 md:mx-12">
            <Trigger value={DrinkPageTabs.Recepie} tab={tab}>
              Recept
            </Trigger>
          </div>
          <Trigger value={DrinkPageTabs.Equipment} tab={tab}>
            Utrustning
          </Trigger>
        </RadixTabs.List>

        {/* AnimatePresence for smooth animations when swithing tabs */}
        <AnimatePresence mode="wait">
          {tab === DrinkPageTabs.Overview ? (
            <AnimateTab key={DrinkPageTabs.Overview}>
              <OverviewTab overview={drink.description} />
            </AnimateTab>
          ) : tab === DrinkPageTabs.Recepie ? (
            <AnimateTab key={DrinkPageTabs.Recepie}>
              <RecepieTab recepie={drink.recepie} />
            </AnimateTab>
          ) : (
            <AnimateTab key={DrinkPageTabs.Equipment}>
              <EquipmentTab equipment={drink.equipment} />
            </AnimateTab>
          )}
        </AnimatePresence>
      </RadixTabs.Root>
    </section>
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
  tab: DrinkPageTabs;
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

/**
 * Reusable animation-component for the sections.
 */
export function AnimateTab({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="mt-6 flex min-h-[12rem] w-full max-w-md flex-col items-start p-2 text-lg tracking-widest"
    >
      {children}
    </motion.div>
  );
}
