import * as Portal from "@radix-ui/react-portal";
import React from "react";
import { Search } from "@/app/search/search";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { useDisableBodyScroll } from "@/app/hooks/useDisableBodyScroll";
import useOpenModal from "@/app/hooks/useOpenModal";

function SearchModal() {
  const [isOpen, close] = useOpenModal();
  useDisableBodyScroll(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal.Root>
          <motion.div
            id="search-modal"
            key="search-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-10 flex flex-col items-center overflow-y-auto bg-black/40 pt-[8rem] backdrop-blur-md"
          >
            <button
              className="relative mb-4 ml-8 mr-auto text-3xl text-white"
              onClick={close}
            >
              <RxCross1 />
            </button>
            <Search />
          </motion.div>
        </Portal.Root>
      )}
    </AnimatePresence>
  );
}

export default SearchModal;
