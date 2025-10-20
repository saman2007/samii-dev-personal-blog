"use client";

import { Themes } from "@/types/types";
import { createContext, useContext, useState } from "react";

interface StoreData {
  theme: Themes[number];
  [key: string]: any;
}

interface StoreContext {
  store: StoreData;
  setStore: (storeData: Partial<StoreData>) => void;
}

const storeContext = createContext<StoreContext>({
  store: { theme: "dark" },
  setStore: (storeData) => {},
});

interface StoreProviderProps {
  defaultStoreData: StoreData;
  children: React.ReactNode;
}

const StoreProvider = ({ defaultStoreData, children }: StoreProviderProps) => {
  const [store, setStore] = useState<StoreData>(defaultStoreData);

  const setPartialStore = (partialStore: Partial<StoreData>) =>
    setStore((prev) => ({ ...prev, ...partialStore }));

  return (
    <storeContext.Provider value={{ store, setStore: setPartialStore }}>
      {children}
    </storeContext.Provider>
  );
};

export const useStoreData = () => useContext(storeContext).store;
export const useSetStore = () => useContext(storeContext).setStore;

export default StoreProvider;
