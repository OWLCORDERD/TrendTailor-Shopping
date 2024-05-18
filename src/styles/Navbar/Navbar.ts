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
      color: #000;
      font-family: "Raleway", sans-serif;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      text-align: center;
    }
  }

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

  &:hover {
    background-color: #e5e5e5;
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
