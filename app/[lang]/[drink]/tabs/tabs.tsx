"use client";

import React, { ReactNode, useState } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Drink, RecipeDisplayNames, Tabs } from "../../../types";
import { EquipmentTab } from "./equipmentTab";
import { OverviewTab } from "./overviewTab";
import { RecepieTab } from "./recepieTab";

export default function Tabs({
  drink,
  tabs,
  recipeDisplayNames,
}: {
  drink: Drink;
  tabs: Tabs;
  recipeDisplayNames: RecipeDisplayNames;
}) {
  const [tab, setTab] = useState(tabs.recipe);

  const handleTabChange = (value: string) => setTab(value);

  return (
    <section className="w-full">
      <RadixTabs.Root
        className="relative z-10 mt-12 flex w-full flex-col items-center"
        value={tab}
        onValueChange={handleTabChange}
      >
        <RadixTabs.List className="mb-4 flex bg-gradient-to-r from-transparent from-5% via-beige/10 to-transparent to-95% p-2">
          <Trigger value={tabs.overview} tab={tab}>
            {tabs.overview}
          </Trigger>
          <div className="mx-4 sm:mx-8 md:mx-12">
            <Trigger value={tabs.recipe} tab={tab}>
              {tabs.recipe}
            </Trigger>
          </div>
          <Trigger value={tabs.equipment} tab={tab}>
            {tabs.equipment}
          </Trigger>
        </RadixTabs.List>

        {/* AnimatePresence for smooth animations when swithing tabs */}
        <AnimatePresence mode="wait">
          {tab === tabs.overview ? (
            <AnimateTab
              key={tabs.overview}
              swipeLeft={() => {}}
              swipeRight={() => setTab(tabs.recipe)}
            >
              <OverviewTab
                description={drink.description}
                value={tabs.overview}
              />
            </AnimateTab>
          ) : tab === tabs.recipe ? (
            <AnimateTab
              key={tabs.recipe}
              swipeLeft={() => {
                setTab(tabs.overview);
              }}
              swipeRight={() => setTab(tabs.equipment)}
            >
              <RecepieTab
                recepie={drink.recepie}
                value={tabs.recipe}
                displayNames={recipeDisplayNames}
              />
            </AnimateTab>
          ) : (
            <AnimateTab
              key={tabs.equipment}
              swipeLeft={() => {
                setTab(tabs.recipe);
              }}
              swipeRight={() => {}}
            >
              <EquipmentTab
                equipment={drink.equipment}
                value={tabs.equipment}
              />
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
  tab: string;
}) {
  return (
    <RadixTabs.Trigger className="group relative tracking-wider" value={value}>
      <h2 className="text-lg text-beige transition-colors duration-200 hover:text-white group-data-[state=active]:text-white">
        {children}
      </h2>
      {tab === value && (
        <motion.div
          className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
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
export function AnimateTab({
  children,
  swipeLeft,
  swipeRight,
}: {
  children: ReactNode;
  swipeLeft: () => void;
  swipeRight: () => void;
}) {
  const x = useMotionValue(0);
  const color = useTransform(
    x,
    [-100, 0, 100],
    ["#171717", "rgb(207, 207, 207, 100%)", "#171717"]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      drag="x"
      dragSnapToOrigin
      dragElastic={0.15}
      dragConstraints={{ left: -100, right: 100 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 90) {
          swipeLeft();
        } else if (info.offset.x < -90) {
          swipeRight();
        }
      }}
      style={{ color, x }}
      className="mt-6 flex min-h-[25rem] w-full max-w-md flex-col items-start p-2 text-lg tracking-widest lg:max-w-xl xl:max-w-6xl"
    >
      {children}
    </motion.div>
  );
}
