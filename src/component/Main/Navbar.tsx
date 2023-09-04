"use client";

import Link from "next/link";
import React from "react";
import "styles/navbar.scss";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Search from "component/Search/Search";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";

const Navbar = () => {
  const { data: session, status }: any = useSession();

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
              <div className='user-profile'></div>
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
        </div>

        <div className='Sub-nav'>
          <div className='menu-button'>
            <button className='button-icon'>
              <HiOutlineMenuAlt2 />
            </button>
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
            <li>
              <a href='#'>Megazine</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
