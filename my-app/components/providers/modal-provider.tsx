"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../modals/card-modal";
import ProModal from "../modals/pro-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false); // helps avoid hydration errors

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
