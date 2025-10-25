"use client";

import { Themes, UserPrivateInfo } from "@/types/types";
import { createContext, useContext, useState } from "react";

interface AuthInfo {
  user: UserPrivateInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

interface StoreData {
  theme: Themes[number] | null;
  auth: AuthInfo;
  [key: string]: any;
}

interface StoreContext {
  store: StoreData;
  setStore: (storeData: Partial<StoreData>) => void;
}

const storeContext = createContext<StoreContext>({
  store: {
    theme: "dark",
    auth: { isLoggedIn: false, user: null, isLoading: false },
  },
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
