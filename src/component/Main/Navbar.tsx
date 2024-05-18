"use client";

import Link from "next/link";
import { Navbar as CSS } from "styles";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Search from "component/Search/Search";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import ResponsiveMenu from "./Responsive/ResponsiveMenu";
import UserPopup from "component/Popup/UserPopup";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { data, status } = useSession();

  const [responsiveMenuActive, setResponsiveMenuActive] =
    useState<boolean>(false);

  const [ResponsiveSearchActive, setResponsiveSearchActive] =
    useState<boolean>(false);

  const [userPopupOpen, setUserPopupOpen] = useState<boolean>(false);

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

          <Search
            searchActive={ResponsiveSearchActive}
            setSearchActive={setResponsiveSearchActive}
          />

          <CSS.LoginMenu>
            {status === "authenticated" && data.user ? (
              <CSS.LoginUser onClick={() => setUserPopupOpen(!userPopupOpen)}>
                {data.user.image ? (
                  <div className='user-imgBox'>
                    <Image
                      src={data.user.image}
                      alt='user-image'
                      width='50'
                      height='50'
                    />
                  </div>
                ) : (
                  <div className='user-icon'>
                    <FaUserCircle />
                  </div>
                )}
                <span className='user-name'>{data.user.name}</span>
                <IoIosArrowDown className='arrow-down' />
              </CSS.LoginUser>
            ) : (
              <>
                <Link href='/signin' className='login'>
                  <AiOutlineLogin className='icon' />
                  <span>login</span>
                </Link>

                <Link href='/signup' className='signup'>
                  <AiOutlineUserAdd className='icon' />
                  <span>sign Up</span>
                </Link>
              </>
            )}
          </CSS.LoginMenu>

          <CSS.ResponsiveNav>
            <CSS.SearchButton>
              <IoIosSearch onClick={() => setResponsiveSearchActive(true)} />
            </CSS.SearchButton>

            {responsiveMenuActive ? (
              <CSS.ResponsiveButton
                onClick={() => setResponsiveMenuActive(false)}
              >
                <IoIosClose fontSize='30px' />
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

      {userPopupOpen ? <UserPopup setUserPopupOpen={setUserPopupOpen} /> : null}
    </header>
  );
};

export default Navbar;
