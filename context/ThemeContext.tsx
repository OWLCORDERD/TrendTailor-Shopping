"use client";

import React, { useState } from "react";

interface ReactType {
  children: React.ReactNode;
}

interface example {
  mode?: string;
  toggle?: React.MouseEventHandler;
}

export const ThemeContext = React.createContext<example>({});

export const ThemeProvider = ({ children }: ReactType) => {
  const [mode, setMode] = useState<string>("light");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
