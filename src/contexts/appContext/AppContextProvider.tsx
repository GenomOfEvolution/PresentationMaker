import React from "react";
import { useCreateAppContext, AppContextType } from "./AppContext";

const Context = React.createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
  const context = React.useContext(Context);
  if (!context) throw new Error("Use app context within provider!");
  return context;
};

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useCreateAppContext();
  return <Context.Provider value={context}>{children}</Context.Provider>;
};
