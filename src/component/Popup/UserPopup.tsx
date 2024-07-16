"use client";

import React, { useContext } from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { ThemeContext } from "../../../context/ThemeContext";
import { useRouter } from "next/navigation";
import { BsFillSunFill } from "react-icons/bs";
import { IoCloudyNightSharp } from "react-icons/io5";

interface propsSvgType {
  setUserPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 50px;
  width: 20rem;
  height: max-content;
  background-color: rgba(0, 0, 0, 0.8);
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6.25rem;
  padding: 0 2rem;
`;

const ProfileImgBox = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 50%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;

  svg {
    font-size: 2rem;
    color: #fff !important;
  }
`;

const UserInfo = styled.div`
  width: 10rem;
  height: 4rem;
  font-family: "Noto sans KR", sans-serif;

  h1 {
    font-size: 1.2rem;
    line-height: 2.5rem;
    color: #fff !important;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    line-height: 1.5rem;
    color: #fff !important;
  }
`;

const UserMenu = styled.ul`
  width: 100%;
  height: 8rem;
  padding: 1rem 0;
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    font-size: 1.2rem;
    color: #fff !important;
  }

  span {
    width: 80%;
    font-family: "Noto sans KR", sans-serif;
    font-size: 12px;
    line-height: 3rem;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: #fff !important;
  }
`;

const LogoutMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 2rem;
  border-top: 2px solid rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  svg {
    font-size: 1.2rem;
    color: #fff !important;
  }

  span {
    width: 80%;
    line-height: 3rem;
    font-family: "Noto sans KR", sans-serif;
    font-size: 12px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: #fff !important;
  }
`;

const UserPopup = ({ setUserPopupOpen }: propsSvgType) => {
  const { data, status } = useSession();
  const { mode, toggle } = useContext(ThemeContext);
  const router = useRouter();

  const logoutUser = () => {
    signOut();

    setUserPopupOpen(false);

    router.push("/");
  };

  return (
    <PopupContainer>
      <UserProfile>
        {status === "authenticated" && data.user ? (
          <>
            <ProfileImgBox>
              {data.user.image ? (
                <Image
                  src={data.user.image}
                  width='100'
                  height='100'
                  alt='프로필 이미지'
                />
              ) : (
                <DefaultProfile>
                  <FaUserCircle />
                </DefaultProfile>
              )}
            </ProfileImgBox>

            <UserInfo>
              <h1>{data.user.name}</h1>
              <span>{data.user.email}</span>
            </UserInfo>
          </>
        ) : null}
      </UserProfile>

      <UserMenu>
        <MenuItem onClick={toggle}>
          {mode === "light" ? <BsFillSunFill /> : <IoCloudyNightSharp />}
          <span>Theme</span>
        </MenuItem>
        <MenuItem>
          <FaShoppingCart />
          <span>장바구니</span>
        </MenuItem>
      </UserMenu>

      <LogoutMenu onClick={logoutUser}>
        <IoMdLogOut />
        <span>Log Out</span>
      </LogoutMenu>
    </PopupContainer>
  );
};

export default UserPopup;
