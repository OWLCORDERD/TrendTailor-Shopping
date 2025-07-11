import { styled } from "styled-components";

const ResponseMenu: any = {};

ResponseMenu.Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1000;
  transition: all 0.5s ease-in;
`;

ResponseMenu.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 0 2rem;

  .logo {
    display: flex;
    gap: 5px;
    align-items: center;
    text-align: center;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
    }

    h1 {
      font-weight: 400;
      font-size: 1.2rem;
      font-family: "Pacifico", cursive;
      color: var(--colorMain);
      text-align: center;
    }
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;

    svg {
      cursor: pointer;
    }
  }
`;

ResponseMenu.LoginMenu = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;

  .default-profile {
    height: 100%;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .profile-status {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 12rem;
      height: 4rem;

      .photo {
        position: relative;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        svg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .profile-txt {
        width: 7rem;

        h1 {
          width: 100%;
          text-align: center;
          font-family: $Noto-Korean;
          font-size: 10px;
        }
      }
    }

    .login-button {
      width: 12rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--colorMain);
      padding: 10px 0;

      span {
        font-size: 10px;
        font-weight: bold;
        color: #fff;
        font-family: $Noto-Korean;
      }
    }
  }
`;

ResponseMenu.MenuList = styled.ul`
  width: 100%;
  height: 6.25rem;
  margin: 1rem 0;

  li {
    display: inline-block;
    width: 33.3%;
    height: 100%;

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      span {
        font-size: 10px;
        font-weight: bold;
        margin-top: 10px;
        font-family: $Noto-Korean;
        color: #484848;
      }
    }
  }
`;

ResponseMenu.CategoryMenu = styled.div`
  ul {
    width: 100%;
    height: 100%;

    li {
      position: relative;
      display: block;
      width: 100%;
      height: 40px;
      transition: all 0.5s ease-out;
      overflow: hidden;

      &.on {
        &:first-child {
          height: 160px;
          transition: all 0.5s ease-in;
        }

        .sub-menu {
          height: 120px;
          transition: all 0.5s ease-in;
        }
      }

      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 0 20px;

        h2 {
          width: max-content;
          line-height: 30px;
          font-size: 12px;
          font-family: $Noto-Korean;
          text-transform: uppercase;
        }
      }

      .toggleMenu-title {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 0 20px;

        h2 {
          width: max-content;
          font-size: 12px;
          font-family: $Noto-Korean;
          text-transform: uppercase;
        }
      }

      .sub-menu {
        position: absolute;
        top: 40px;
        display: block;
        width: 100%;
        height: 0;
        transition: all 0.5s ease-out;

        li {
          width: 100%;
          height: 40px;

          a {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            height: 100%;

            span {
              font-size: 12px;
              color: #484848;
              font-family: $Noto-Korean;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
`;

export { ResponseMenu };
