import { styled } from "styled-components";

const Navbar: any = {};

// pc 해상도 헤더 네비게이션 영역
Navbar.Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 0.5s ease-out;

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

Navbar.Logo = styled.div`
  position: relative;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    .logo-icon {
      width: 35px;
      height: 35px;
      border-radius: 8px;
      background: #fff;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: -0.05em;

      & > img {
        width: 32px;
        height: 32px;
      }
    }

    .logo-title {
      font-weight: 400;
      font-size: 1.5rem;
      font-family: "Pacifico", cursive;
      color: #fff;
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    width: 8rem;

    .logo-title {
      font-size: 1.2rem;
    }
  }
`;

Navbar.NavMenu = styled.nav`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--bg-elev) 60%, transparent);
  border: 1px solid var(--border);

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    border-radius: 999px;
    color: var(--text-muted);
    transition: all 0.2s;

    &__icon {
      display: flex;
      align-items: center;
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

    &.active {
      background: var(--accent);
      color: #fff;
    }
  }
`;

Navbar.LoginMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
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
      color: #fff;
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
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

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
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: transparent;
    border: none;

    svg {
      fill: #fff;
      width: 2rem;
      height: 2rem;
    }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  color: #fff;
`;

Navbar.ResponsiveLogo = styled.div`
  width: 6.25rem;
  height: 5rem;

  a {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 200px;
    height: 100%;

    .logo-icon {
      width: 35px;
      height: 35px;
      border-radius: 8px;
      background: #fff;
      display: grid;
      place-items: center;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: -0.05em;

      & > img {
        width: 32px;
        height: 32px;
      }
    }

    & > h1 {
      font-weight: 500;
      font-size: 1.2rem;
      font-family: "Pacifico", cursive;
      color: #fff;
      text-align: center;
    }
  }
`;

Navbar.ResponsiveMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 6.25rem;
`;

Navbar.ResponsiveButton = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;

Navbar.SearchButton = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;

export { Navbar };
