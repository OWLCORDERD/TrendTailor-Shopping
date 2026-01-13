import React from "react";
import { Trendly as CSS } from "@/styles";

interface propsType {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatArea = ({ sideBarActive, setSideBarActive }: propsType) => {
  return <CSS.ChatArea>ChatArea</CSS.ChatArea>;
};

export default ChatArea;
