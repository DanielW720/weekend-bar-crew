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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/40 backdrop-blur-md"
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
