'use client';

import { createContext } from "react";

export const SalonContext = createContext();

export const SalonProvider = ({ children }) => {
  

  return (
    <SalonContext.Provider
      value={{}}
    >
      {children}
    </SalonContext.Provider>
  );
};
