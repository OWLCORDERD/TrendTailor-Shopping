"use client";

import Link from "next/link";
import React, { useContext } from "react";
import "styles/navbar.scss";
import { signOut, useSession } from "next-auth/react";
import { BsFillSunFill } from "react-icons/bs";
import { IoCloudyNightSharp } from "react-icons/io5";
import Search from "component/Search/Search";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { ThemeContext } from "../../../context/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const { data: session, status }: any = useSession();

  const { mode, toggle } = useContext(ThemeContext);

  return (
    <header>
      <nav className='Navbar-container'>
        <div className='Main-nav'>
          <div className='logo'>
            <Link href='/'>wish</Link>
          </div>

          <Search />

          <div className='login-menu'>
            {status === "authenticated" ? (
              <div className='user-profile'>
                <img src={session.user.image} alt='profile-img' />
              </div>
            ) : (
              <Link href='/signin' className='login-button'>
                <AiOutlineLogin className='icon' />
                <span>login</span>
              </Link>
            )}

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

            <div className='Responsive-button'>
              <GiHamburgerMenu />
            </div>
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
              <a href='#'>Trend</a>
            </li>
            <li>
              <Link href='/notice'>Notice</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
