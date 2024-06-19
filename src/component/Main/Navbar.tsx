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
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data, status } = useSession();

  const [responsiveMenuActive, setResponsiveMenuActive] =
    useState<boolean>(false);

  const [ResponsiveSearchActive, setResponsiveSearchActive] =
    useState<boolean>(false);

  const [userPopupOpen, setUserPopupOpen] = useState<boolean>(false);

  const [mobileMatches, setMobileMatches] = useState<boolean>(false);

  const handleChange = (query: string) => {
    setMobileMatches(() => {
      return window.matchMedia(query).matches;
    });
  };

  useEffect(() => {
    const query = "screen and (max-width : 768px)";
    let mql = window.matchMedia(query);

    if (mql.matches) {
      setMobileMatches(mql.matches);
    }

    mql.addEventListener("change", () => handleChange(query));

    return () => {
      mql.removeEventListener("change", () => handleChange);
    };
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setResponsiveMenuActive(false);
    }
  }, [pathname]);

  return (
    <header>
      {mobileMatches ? (
        <>
          <CSS.ResponsiveNav>
            <CSS.ResponsiveLogo>
              <Link href='/' prefetch={true}>
                wish
              </Link>
            </CSS.ResponsiveLogo>
            <CSS.ResponsiveMenu>
              <CSS.SearchButton>
                <IoIosSearch onClick={() => setResponsiveSearchActive(true)} />
              </CSS.SearchButton>

              <CSS.ResponsiveButton
                onClick={() => setResponsiveMenuActive(true)}
              >
                <GiHamburgerMenu />
              </CSS.ResponsiveButton>
            </CSS.ResponsiveMenu>

            <Search
              searchActive={ResponsiveSearchActive}
              setSearchActive={setResponsiveSearchActive}
            />
          </CSS.ResponsiveNav>

          <AnimatePresence>
            {responsiveMenuActive ? (
              <ResponsiveMenu
                setResponsiveMenuActive={setResponsiveMenuActive}
              />
            ) : null}
          </AnimatePresence>
        </>
      ) : (
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
          </CSS.MainNav>

          <CSS.SubNav>
            <CSS.Menu>
              <li>
                <Link href='/about' prefetch={true}>
                  About
                </Link>
              </li>
              <li>
                <Link href='/shop' prefetch={false}>
                  shop
                </Link>
              </li>
              <li>
                <Link href='/trend' prefetch={false}>
                  Trend
                </Link>
              </li>
              <li>
                <Link href='/notice' prefetch={false}>
                  Notice
                </Link>
              </li>
            </CSS.Menu>
          </CSS.SubNav>
        </CSS.Container>
      )}

      {userPopupOpen ? <UserPopup setUserPopupOpen={setUserPopupOpen} /> : null}
    </header>
  );
};

export default Navbar;
