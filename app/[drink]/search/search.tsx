"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import Modal from "./modal";

function Search() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((prevState) => !prevState)}>
        <MagnifyingGlassIcon className="text-beige" height={35} width={35} />
      </button>
      <Modal open={open} close={() => setOpen(false)} />
    </div>
  );
}

export default Search;
