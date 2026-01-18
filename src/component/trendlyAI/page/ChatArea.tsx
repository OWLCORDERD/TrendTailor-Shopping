import React from "react";
import { Trendly as CSS } from "@/styles";
import Intro from "@/component/trendlyAI/mode/Intro";

interface propsType {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatArea = ({ sideBarActive, setSideBarActive }: propsType) => {
  return (
    <CSS.ChatArea $sideActive={sideBarActive}>
      <CSS.ChatInner>
        <Intro />
      </CSS.ChatInner>
    </CSS.ChatArea>
  );
};

export default ChatArea;
