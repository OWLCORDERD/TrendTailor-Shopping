import React from "react";
import { Trendly as CSS } from "@/styles";
import chatbotImg from "@/assets/images/chatbot.png";
import Image from "next/image";

const trendly = ({ message }: { message: string }) => {
  return (
    <CSS.ChatBotBubble>
      <CSS.ChatBotIcon>
        <Image src={chatbotImg} alt='Chat Bot Icon' />
      </CSS.ChatBotIcon>
      <CSS.ChatBotMessage>{message}</CSS.ChatBotMessage>
    </CSS.ChatBotBubble>
  );
};

export default trendly;
