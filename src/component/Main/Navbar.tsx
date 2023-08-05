"use client";

import Link from "next/link";
import React from "react";
import "styles/navbar.scss";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const { data: session, status }: any = useSession();

  return (
    <header>
      <nav className='Navbar-container'>
        <div className='logo'>
          <h1>wish</h1>
        </div>

        <ul className='Navbar-menu'>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <Link href='/shop'>shop</Link>
          </li>
          <li>
            <a href='#'>Trend</a>
          </li>
          <li>
            <a href='#'>News</a>
          </li>
          <li>
            <a href='#'>peed</a>
          </li>
        </ul>

        <div className='login-menu'>
          {status === "authenticated" ? (
            <div className='user-profile'></div>
          ) : (
            <Link href='/signin' className='login-button'>
              login
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
              sign Up
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
