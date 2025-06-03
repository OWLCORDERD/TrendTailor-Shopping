import { styled } from "styled-components";

const Navbar: any = {};

// pc 해상도 헤더 네비게이션 영역
Navbar.Container = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 5rem;
  z-index: 1100;
  transition: all 0.5s ease-out;

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

Navbar.Logo = styled.div`
  position: relative;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    gap: 5px;
    align-items: center;
    width: 200px;
    height: 100%;

    & > img {
      width: 3rem;
      height: 3rem;
    }

    & > h1 {
      font-weight: 400;
      font-size: 1.5rem;
      font-family: "Pacifico", cursive;
      color: var(--colorMain);
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    width: 8rem;

    a {
      font-size: 1.2rem;
    }
  }
`;

Navbar.LoginMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12rem;
  height: 100%;

  .login,
  .signup {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 5rem;
    height: 4rem;

    .icon {
      height: 2.5rem;
      font-size: 1.2rem;
    }

    span {
      line-height: 1.5rem;
      font-size: 10px;
      font-family: "Raleway", sans-serif;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
    }
  }

  // 모바일 버전 로그인 메뉴 숨김
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

Navbar.LoginUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 10px;
  font-family: "Noto Sans KR", sans-serif;
  padding: 0 1rem;
  cursor: pointer;

  .user-imgBox {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid transparent;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-icon {
    display: flex;
    align-items: center;
    justify-contents: center;
    width: 3rem;
    height: 3rem;

    svg {
      font-size: 1.5rem;
    }
  }

  .user-name {
    width: 5rem;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
  }

  .arrow-down {
    font-size: 15px;
  }
`;

Navbar.Menu = styled.ul`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50rem;

  li {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 3rem;

    a {
      width: max-content;
      font-family: "Raleway", sans-serif;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  @media screen and (min-width: 1440px) and (max-width: 1900px) {
    width: 40rem;
    li {
      a {
        font-size: 10px;
      }
    }
  }
`;

// 모바일 반응형 헤더 네비게이션 영역
Navbar.ResponsiveNav = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;

Navbar.ResponsiveLogo = styled.div`
  width: 6.25rem;
  height: 5rem;

  a {
    display: flex;
    gap: 5px;
    align-items: center;
    width: 200px;
    height: 100%;

    & > img {
      width: 3rem;
      height: 3rem;
    }

    & > h1 {
      font-weight: 500;
      font-size: 21px;
      font-family: "Pacifico", cursive;
      color: var(--colorMain);
      text-align: center;
    }
  }
`;

Navbar.ResponsiveMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6.25rem;
  height: 100%;
`;

Navbar.ResponsiveButton = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
`;

Navbar.SearchButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
`;

export { Navbar };
