"use client";

import useLanguagePathname from "@/app/hooks/useLanguagePathname";
import useMenuModal from "@/app/hooks/useMenuModal";
import * as Portal from "@radix-ui/react-portal";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";

interface MenuModalProps {
  about: string;
  contact: string;
}

function MenuModal({ about, contact }: MenuModalProps) {
  const [isOpen, , close] = useMenuModal();
  const langPathname = useLanguagePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal.Root key="menu-modal-root">
          <motion.div
            id="menu-modal"
            key="menu-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col items-center overflow-y-auto bg-black/40 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-36 w-11/12 max-w-md rounded-lg bg-black/90 p-6 border-2 border-beige relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mb-6 text-2xl text-beige hover:text-white transition-colors absolute top-4 right-4"
                onClick={close}
              >
                <RxCross1 />
              </button>

              <nav className="flex flex-col gap-4">
                <Link
                  href={`${langPathname}/info/about`}
                  onClick={close}
                  className="text-lg text-beige hover:text-white transition-colors py-2"
                >
                  {about}
                </Link>
                <Link
                  href={`${langPathname}/info/contact`}
                  onClick={close}
                  className="text-lg text-beige hover:text-white transition-colors py-2"
                >
                  {contact}
                </Link>
                <Link
                  href={`${langPathname}/info/instagram`}
                  onClick={close}
                  className="text-lg text-beige hover:text-white transition-colors py-2"
                >
                  Instagram
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        </Portal.Root>
      )}
    </AnimatePresence>
  );
}

export default MenuModal;
