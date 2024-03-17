import { useEffect } from "react";
import {
  setBodyOverflowHidden,
  unsetBodyOverflow,
} from "../lib/unsetBodyOverflow";

export const useDisableBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      setBodyOverflowHidden();
    } else {
      unsetBodyOverflow();
    }
  }, [isOpen]);
};
