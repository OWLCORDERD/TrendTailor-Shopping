import React, { SetStateAction, useState } from "react";
import "styles/responsiveMenu.scss";
import { signOut, useSession } from "next-auth/react";
import { HiSpeakerphone } from "react-icons/hi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface propsMenuActiveState {
  menuActive: boolean;
  setResponsiveMenuActive: React.Dispatch<SetStateAction<boolean>>;
}

const ResponsiveMenu = ({
  menuActive,
  setResponsiveMenuActive,
}: propsMenuActiveState) => {
  const svgIcon = [
    {
      name: "photo",
      icon: () => (
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <mask
            id='mask0_794_97'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='30'
            height='30'
          >
            <circle cx='15' cy='15' r='15' fill='#F5F5F5' />
          </mask>
          <g mask='url(#mask0_794_97)'>
            <rect width='30' height='30' fill='#ECECEC' />
            <path
              d='M7 26C7 23.2386 9.23858 21 12 21H18C20.7614 21 23 23.2386 23 26V30H7V26Z'
              fill='#484848'
            />
            <rect x='9' y='9' width='12' height='12' rx='6' fill='#484848' />
          </g>
        </svg>
      ),
    },
    {
      name: "myPage",
      icon: () => (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <mask
            id='mask0_797_114'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='20'
            height='19'
          >
            <rect width='20' height='19' fill='#D9D9D9' />
          </mask>
          <g mask='url(#mask0_797_114)'>
            <path
              d='M4 15C4 13.3431 5.34315 12 7 12H13C14.6569 12 16 13.3431 16 15V20H4V15Z'
              fill='#484848'
            />
            <rect x='6' y='4' width='8' height='8' rx='4' fill='#484848' />
          </g>
        </svg>
      ),
    },
  ];

  const { data, status } = useSession();

  const router = useRouter();

  const [toggleSubMenu, setToggleSubMenu] = useState<boolean>(false);

  const login = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    router.push("/signin");

    setResponsiveMenuActive(false);
  };
  return (
    <div
      className={
        menuActive === true ? "Responsive-Menu" : "Responsive-Menu hidden"
      }
    >
      <div className='login-menu'>
        {status === "authenticated" ? (
          <div className='default-profile'>
            <div className='profile-status'>
              <div className='photo'>
                {data.user?.image ? (
                  <img src={data.user?.image} alt='' />
                ) : (
                  svgIcon[0].icon()
                )}
              </div>
              <div className='profile-txt'>
                <h1>{data.user?.name}님 환영합니다.</h1>
              </div>
            </div>
            <div className='login-button' onClick={() => signOut()}>
              <span>로그아웃</span>
            </div>
          </div>
        ) : (
          <div className='default-profile'>
            <div className='profile-status'>
              <div className='photo'>{svgIcon[0].icon()}</div>
              <div className='profile-txt'>
                <h1>로그인이 필요합니다.</h1>
              </div>
            </div>
            <div className='login-button' onClick={(e) => login(e)}>
              <span>로그인</span>
            </div>
          </div>
        )}
      </div>

      <ul className='mainMenu-list'>
        <li>
          <a href='#'>
            {svgIcon[1].icon()}

            <span>마이 페이지</span>
          </a>
        </li>

        <li>
          <Link href='/notice'>
            <HiSpeakerphone color='#484848' />

            <span>공지사항</span>
          </Link>
        </li>

        <li>
          <Link href='/signup'>
            <AiOutlineUserAdd color='#484848' />

            <span>회원가입</span>
          </Link>
        </li>
      </ul>

      <div className='category-menu'>
        <ul>
          <li className={toggleSubMenu ? "on" : ""}>
            <div className='toggleMenu-title'>
              <h2>Community</h2>
              <IoIosArrowDown
                onClick={() => setToggleSubMenu(!toggleSubMenu)}
              />
            </div>
            <ul className='sub-menu'>
              <li>
                <a href='#'>
                  <span>고객센터</span>
                </a>
              </li>
              <li>
                <Link href='/notice'>
                  <span>공지사항</span>
                </Link>
              </li>
              <li>
                <a href='#'>
                  <span>Trend News</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <Link href='/about'>
              <h2>About</h2>
            </Link>
          </li>
          <li>
            <Link href='/shop'>
              <h2>Shop</h2>
            </Link>
          </li>
          <li>
            <a href='#'>
              <h2>Trend</h2>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
