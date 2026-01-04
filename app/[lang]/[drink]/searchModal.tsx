import * as Portal from "@radix-ui/react-portal";
import React from "react";
import { Search } from "../search/search";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import useOpenSearchModal from "@/app/hooks/useOpenModal";
import { Search as SearchType } from "@/app/types";

function SearchModal({ search, drinkCard }: { search: SearchType; drinkCard: { nonAlcoholic: string } }) {
  const [isOpen, close] = useOpenSearchModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal.Root key="search-modal-root">
          <motion.div
            id="search-modal"
            key="search-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col items-center overflow-y-auto bg-black/40 pt-[8rem] backdrop-blur-md"
          >
            <ExitModalButton close={close} />
            <Search search={search} drinkCard={drinkCard} />
          </motion.div>
        </Portal.Root>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;

function ExitModalButton({ close }: { close: () => void }) {
  return (
    <button
      className="relative mb-4 ml-8 mr-auto text-3xl text-beige"
      onClick={close}
    >
      <RxCross1 />
    </button>
  );
}
