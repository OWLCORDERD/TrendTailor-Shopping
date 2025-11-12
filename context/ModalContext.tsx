"use client";

import React, { useState } from "react";

interface ReactType {
  children: React.ReactNode;
}

interface modalType {
  showModal?: boolean;
  title?: string;
  content?: string;
  setToggle?: React.MouseEventHandler;
}

export const ModalContext = React.createContext<modalType>({});

export const ThemeProvider = ({ children }: ReactType) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const setToggle = ({ title, content }: any) => {
    setShowModal((show) => !show);

    setTitle(title);
    setContent(content);
  };

  return (
    <ModalContext.Provider value={{ showModal, title, content, setToggle }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
};
