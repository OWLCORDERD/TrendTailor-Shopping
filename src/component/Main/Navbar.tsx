"use client";

import Link from "next/link";
import { Navbar as CSS } from "styles";
import React, { useContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { BsFillSunFill } from "react-icons/bs";
import { IoCloudyNightSharp } from "react-icons/io5";
import Search from "component/Search/Search";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { ThemeContext } from "../../../context/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import ResponsiveMenu from "./Responsive/ResponsiveMenu";

const Navbar = () => {
  const { data, status } = useSession();

  const { mode, toggle } = useContext(ThemeContext);

  const [responsiveMenuActive, setResponsiveMenuActive] =
    useState<boolean>(false);

  const [ResponsiveSearchActive, setResponsiveSearchActive] =
    useState<boolean>(false);

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      if (!responsiveMenuActive) {
        body.style.removeProperty("overflow");
      } else {
        body.style.overflow = "hidden";
      }
    }
  }, [responsiveMenuActive]);

  return (
    <header>
      <CSS.Container>
        <CSS.MainNav>
          <CSS.Logo>
            <Link href='/'>wish</Link>
          </CSS.Logo>

          <Search searchActive={ResponsiveSearchActive} />

          <CSS.LoginMenu>
            {status === "authenticated" ? (
              <a onClick={() => signOut()}>
                <AiOutlineLogin className='icon' />
                <span>logOut</span>
              </a>
            ) : (
              <Link href='/signin'>
                <AiOutlineLogin className='icon' />
                <span>login</span>
              </Link>
            )}

            {status === "authenticated" ? (
              <CSS.UserName>
                <span>{data.user?.name} 님 환영합니다.</span>
              </CSS.UserName>
            ) : (
              <Link href='/signup'>
                <AiOutlineUserAdd className='icon' />
                <span>sign Up</span>
              </Link>
            )}
          </CSS.LoginMenu>

          <CSS.ResponsiveNav>
            <CSS.SearchButton>
              <IoIosSearch
                onClick={() =>
                  setResponsiveSearchActive(!ResponsiveSearchActive)
                }
              />
            </CSS.SearchButton>

            {responsiveMenuActive ? (
              <CSS.ResponsiveButton
                onClick={() => setResponsiveMenuActive(false)}
              >
                <IoIosClose fontSize='40px' />
              </CSS.ResponsiveButton>
            ) : (
              <CSS.ResponsiveButton
                onClick={() => setResponsiveMenuActive(true)}
              >
                <GiHamburgerMenu />
              </CSS.ResponsiveButton>
            )}
          </CSS.ResponsiveNav>
        </CSS.MainNav>

        <CSS.SubNav>
          <CSS.modeButton onClick={toggle}>
            <CSS.lightMode className={mode === "light" ? "active" : ""}>
              <BsFillSunFill />
            </CSS.lightMode>

            <CSS.DarkMode className={mode === "dark" ? "active" : ""}>
              <IoCloudyNightSharp />
            </CSS.DarkMode>
          </CSS.modeButton>

          <CSS.Menu>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/shop'>shop</Link>
            </li>
            <li>
              <Link href='/trend'>Trend</Link>
            </li>
            <li>
              <Link href='/notice'>Notice</Link>
            </li>
          </CSS.Menu>
        </CSS.SubNav>
      </CSS.Container>

      <ResponsiveMenu
        menuActive={responsiveMenuActive}
        setResponsiveMenuActive={setResponsiveMenuActive}
      />
    </header>
  );
};

export default Navbar;
