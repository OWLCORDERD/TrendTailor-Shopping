import React from "react";
import { Trendly as CSS } from "@/styles";
import Intro from "@/component/trendlyAI/mode/Intro";
import { useAppSelector } from "@/store/hooks";
import Consultant from "@/component/trendlyAI/mode/Consultant/Consultant";

interface propsType {
  sideBarActive: boolean;
  setSideBarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatArea = ({ sideBarActive, setSideBarActive }: propsType) => {
  const chatMode = useAppSelector((state) => state.chatBubble.mode);

  const dynamicScreenRenderer = () => {
    switch (chatMode) {
      case "intro":
        return <Intro />;
      case "consultant":
        return <Consultant />;
      default:
        return <Intro />;
    }
  };
  return (
    <CSS.ChatArea $sideActive={sideBarActive}>
      <CSS.ChatInner>{dynamicScreenRenderer()}</CSS.ChatInner>
    </CSS.ChatArea>
  );
};

export default ChatArea;
