import React from "react";
import { useCreateAppContext } from "./AppContext";

const Context = React.createContext(null);

export function useAppContext() {
  const context = React.useContext(Context);
  if (!context) throw new Error("Use app context within provider!");
  return context;
}

export const AppContextProvider = ({ children }) => {
  const context = useCreateAppContext();
  return <Context.Provider value={context}>{children}</Context.Provider>;
};
