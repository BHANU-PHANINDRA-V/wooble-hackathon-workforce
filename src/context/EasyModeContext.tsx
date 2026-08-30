"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface EasyModeContextType {
  easyMode: boolean;
  toggleEasyMode: () => void;
}

const EasyModeContext = createContext<EasyModeContextType>({
  easyMode: false,
  toggleEasyMode: () => {},
});

export const EasyModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [easyMode, setEasyMode] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("bwc_easymode");
    if (saved === "true") {
      setEasyMode(true);
      document.documentElement.classList.add("easy-mode");
    }
  }, []);

  const toggleEasyMode = () => {
    setEasyMode((prev) => {
      const next = !prev;
      localStorage.setItem("bwc_easymode", next ? "true" : "false");
      if (next) {
        document.documentElement.classList.add("easy-mode");
      } else {
        document.documentElement.classList.remove("easy-mode");
      }
      return next;
    });
  };

  return (
    <EasyModeContext.Provider value={{ easyMode, toggleEasyMode }}>
      {children}
    </EasyModeContext.Provider>
  );
};

export const useEasyMode = () => useContext(EasyModeContext);
