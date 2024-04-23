import { styled } from "styled-components";

const Navbar = {};

Navbar.Container = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
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
    font-size: 1.6rem;
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
  width: 15rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #000;
    width: 5rem;
    height: 3rem;
    font-family: $Raleway-font;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;

    .icon {
      font-size: 1.5rem;
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
  font-family: $Noto-Korean;
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
  position: relative;
  width: 40rem;

  li {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 25%;
    height: 3rem;

    a {
      width: max-content;
      font-family: $Raleway-font;
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
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
  font-size: 1.2rem;
  cursor: pointer;
`;

Navbar.SearchButton = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
`;

export { Navbar };
