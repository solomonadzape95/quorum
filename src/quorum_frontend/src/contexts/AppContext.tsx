import React, { createContext, useState, ReactNode, useContext } from "react";

export const AppContext = createContext<{
  globals: { view: string };
  updateView: (view: "user" | "org") => void;
} | null>(null);
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [globals, setGlobals] = useState({
    view: "user",
  });
  const updateView = (view: "user" | "org") =>
    setGlobals((g) => ({ ...g, view }));
  return (
    <AppContext.Provider value={{ globals, updateView }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.error("Context cannot be used outside provider");
  }
  return context;
};
