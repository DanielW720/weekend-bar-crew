import * as Portal from "@radix-ui/react-portal";
import React from "react";
import { Search } from "@/app/search/search";

function Modal({ open, close }: { open: boolean; close: () => void }) {
  return open ? (
    <Portal.Root>
      <div
        className="fixed inset-0 h-screen w-screen bg-black/40 px-10 pt-[60%] backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <Search />
      </div>
    </Portal.Root>
  ) : null;
}

export default Modal;
