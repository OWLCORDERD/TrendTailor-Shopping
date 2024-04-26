import { styled } from "styled-components";

const Navbar: any = {};

Navbar.Container = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
  transition: all 0.5s ease-out;

  @media screen and (max-width: 768px) {
    height: 5rem;
  }
`;

Navbar.MainNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 6.25rem;
  transition: all 0.5s ease-in;

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
    font-size: 1.5rem;
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
    line-height: 5rem;
    font-weight: bold;
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

  a {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #000;
    width: 5rem;
    height: 4rem;
    font-family: "Raleway", sans-serif;
    font-weight: bold;
    font-size: 10px;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;

    .icon {
      height: 2.5rem;
      font-size: 1.2rem;
    }

    span {
      line-height: 1.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

Navbar.UserName = styled.div`
  display: block;
  width: 10rem;
  line-height: 2rem;
  font-size: 12px;
  font-family: "Noto Sans KR", sans-serif;
  color: #000;
  font-weight: bold;
  text-align: center;
`;

Navbar.SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 6.25rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

Navbar.modeButton = styled.div`
  position: relative;
  width: 10rem;
  height: 2rem;
  cursor: pointer;
`;

Navbar.lightMode = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  transition: all 0.5s ease-out;

  svg {
    color: #000;
  }

  &.active {
    background-color: #000;
    transition: all 0.5s ease-in;

    svg {
      color: #fff;
    }
  }
`;

Navbar.DarkMode = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  transition: all 0.5s ease-out;

  svg {
    color: #000;
  }

  &.active {
    background-color: #fff;
    transition: all 0.5s ease-in;

    svg {
      color: #000;
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

Navbar.ResponsiveNav = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    width: 6.25rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
