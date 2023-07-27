import * as Portal from "@radix-ui/react-portal";
import React from "react";
import { Search } from "@/app/search/search";
import { AnimatePresence, motion } from "framer-motion";

function Modal({ open, close }: { open: boolean; close: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <Portal.Root>
          <motion.div
            key="search-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 h-screen w-screen bg-black/40 px-10 pt-[60%] backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <Search />
          </motion.div>
        </Portal.Root>
      )}
    </AnimatePresence>
  );
}

export default Modal;
