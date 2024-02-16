"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import "styles/navbar.scss";
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
  const { data: session, status }: any = useSession();

  const { mode, toggle } = useContext(ThemeContext);

  const [responsiveMenuActive, setResponsiveMenuActive] =
    useState<boolean>(false);

  return (
    <header>
      <nav className='Navbar-container'>
        <div className='Main-nav'>
          <div className='logo'>
            <Link href='/'>wish</Link>
          </div>

          <Search />

          <div className='login-menu'>
            <Link href='/signin' className='login-button'>
              <AiOutlineLogin className='icon' />
              <span>login</span>
            </Link>

            {status === "authenticated" && session.user ? (
              <div className='user-name'>
                <a onClick={() => signOut()}>
                  {session.user.name} 님 환영합니다.
                </a>
              </div>
            ) : (
              <Link href='/signup' className='signUp-button'>
                <AiOutlineUserAdd className='icon' />
                <span>sign Up</span>
              </Link>
            )}
          </div>

          <div className='Responsive-menuBox'>
            <div className='Search-button'>
              <IoIosSearch />
            </div>

            {responsiveMenuActive ? (
              <div
                className='Responsive-button'
                onClick={() => setResponsiveMenuActive(false)}
              >
                <IoIosClose fontSize='40px' />
              </div>
            ) : (
              <div
                className='Responsive-button'
                onClick={() => setResponsiveMenuActive(true)}
              >
                <GiHamburgerMenu />
              </div>
            )}
          </div>
        </div>

        <div className='Sub-nav'>
          <div className='mode-button' onClick={toggle}>
            <div className='light-mode' id={mode === "light" ? "active" : ""}>
              <BsFillSunFill />
            </div>

            <div className='dark-mode' id={mode === "dark" ? "active" : ""}>
              <IoCloudyNightSharp />
            </div>
          </div>

          <ul className='Navbar-menu'>
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
          </ul>
        </div>
      </nav>

      <ResponsiveMenu
        menuActive={responsiveMenuActive}
        setResponsiveMenuActive={setResponsiveMenuActive}
      />
    </header>
  );
};

export default Navbar;
