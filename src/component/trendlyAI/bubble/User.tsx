import React from "react";
import { Trendly as CSS } from "@/styles";
import { useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";

const UserBubble = ({ message }: { message: messageType }) => {
  // 로그인 사용자 정보
  const { status, data } = useSession();
  return (
    <CSS.UserBubble>
      <CSS.UserProfile>
        {status === "authenticated" && data.user && data.user.image ? (
          <Image
            src={data.user.image}
            width={50}
            height={50}
            alt={data.user?.name + "님의 프로필 이미지"}
          />
        ) : (
          <FaUserAlt />
        )}
      </CSS.UserProfile>
      <CSS.UserMessage>{message.content}</CSS.UserMessage>
    </CSS.UserBubble>
  );
};

export default UserBubble;
