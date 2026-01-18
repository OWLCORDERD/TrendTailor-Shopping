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
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Logo from "assets/images/logo.png";

const Navbar = () => {
  const { data, status } = useSession();
  const route = usePathname();

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
    <>
      {route !== "/trendly" && (
        <header>
          {mobileMatches ? (
            <>
              {/* 반응형 네비게이션 */}
              <CSS.ResponsiveNav>
                <CSS.ResponsiveLogo>
                  <Link href='/' prefetch={true} className='logo'>
                    <Image src={Logo} alt='TrendTailor 로고 이미지' />
                    <h1 className='logo-title'>TrendTailor</h1>
                  </Link>
                </CSS.ResponsiveLogo>
                <CSS.ResponsiveMenu>
                  <CSS.SearchButton>
                    <IoIosSearch
                      onClick={() => setResponsiveSearchActive(true)}
                    />
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

              {/* 반응형 햄버거 메뉴 영역 */}
              <AnimatePresence>
                {responsiveMenuActive ? (
                  <ResponsiveMenu
                    setResponsiveMenuActive={setResponsiveMenuActive}
                  />
                ) : null}
              </AnimatePresence>
            </>
          ) : (
            <>
              {/* 데스크탑 네비게이션 */}
              <CSS.Container>
                <CSS.Logo>
                  <Link href='/' prefetch={true} className='logo'>
                    <Image src={Logo} alt='TrendTailor 로고 이미지' />
                    <h1 className='logo-title'>TrendTailor</h1>
                  </Link>
                </CSS.Logo>

                <CSS.LoginMenu>
                  {status === "authenticated" && data.user ? (
                    <CSS.LoginUser>
                      {data.user.image ? (
                        <button
                          type='button'
                          className='user-imgBox'
                          onClick={() => setUserPopupOpen(!userPopupOpen)}
                        >
                          <Image
                            src={data.user.image}
                            alt='user-image'
                            width='50'
                            height='50'
                          />
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='user-icon'
                          onClick={() => setUserPopupOpen(!userPopupOpen)}
                        >
                          <FaUserCircle />
                        </button>
                      )}
                    </CSS.LoginUser>
                  ) : (
                    <>
                      <Link href='/login' className='login'>
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
              </CSS.Container>
            </>
          )}

          {/* 로그인 사용자 프로필 클릭 시, 드롭다운되는 팝업 */}
          {userPopupOpen ? (
            <UserPopup setUserPopupOpen={setUserPopupOpen} />
          ) : null}
        </header>
      )}
    </>
  );
};

export default Navbar;
