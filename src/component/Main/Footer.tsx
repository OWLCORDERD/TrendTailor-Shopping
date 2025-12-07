"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    height: 35rem;
  }
`;

const MainCont = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 1400px) {
    width: 80%;
    height: max-content;
    gap: 20px;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const Logo = styled.div`
  width: 100%;
  height: 8rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }
`;

const MainLogo = styled.div`
  width: 100%;

  h1 {
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 768px) {
    width: 25%;

    h1 {
      line-height: 5rem;
      font-size: 1.5rem;
    }
  }
`;

const LogoInfo = styled.div`
  width: 100%;

  p {
    font-size: 14px;
    font-family: "TheJamsil", sans-serif;
    text-transform: uppercase;
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    width: 60%;

    p {
      font-size: 12px;
      line-height: 2rem;
    }
  }
`;

const MainMenu = styled.div`
  width: 100%;
  height: 3rem;

  ul {
    width: 100%;
    height: 100%;

    li {
      display: inline-block;
      width: calc(100% / 3);
      line-height: 3rem;

      a {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        font-family: "TheJamsil", sans-serif;
      }
    }
  }
`;

const Community = styled.div`
  width: 100%;
  height: 7rem;

  h2 {
    width: 100%;
    line-height: 2rem;
    font-size: 1.2rem;
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
    margin-bottom: 2rem;
    color: #fff;
  }

  ul {
    width: 100%;
    height: 3rem;

    li {
      display: inline-block;
      width: calc(100% / 3);
      line-height: 3rem;

      a {
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        font-family: "TheJamsil", sans-serif;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SubCont = styled.div`
  position: relative;
  width: 30%;
  height: max-content;
  color: #fff;

  @media screen and (max-width: 1400px) {
    width: 80%;
    height: max-content;
  }
`;

const CopyRight = styled.span`
  width: 100%;
  line-height: 3rem;
  text-transform: uppercase;
  font-size: 14px;
  color: #fff;
  font-family: "Raleway", sans-serif;

  @media screen and (max-width: 768px) {
    position: relative;
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <footer>
      <Inner>
        <MainCont>
          <Logo>
            <MainLogo>
              <h1>TrendTailor</h1>
            </MainLogo>

            <LogoInfo>
              <p>트렌드를 재단하다. 당신의 트렌드를 찾아드립니다.</p>
            </LogoInfo>
          </Logo>

          <MainMenu>
            <ul>
              <li>
                <Link href='/about'>사이트 소개</Link>
              </li>

              <li>
                <a>이용안내</a>
              </li>

              <li>
                <a>개인정보처리방침</a>
              </li>
            </ul>
          </MainMenu>
        </MainCont>

        <SubCont>
          <Community>
            <h2>community</h2>

            <ul>
              <li>
                <a>고객센터</a>
              </li>
              <li>
                <Link href='/notice'>공지사항</Link>
              </li>
              <li>
                <Link href='/trend'>패션 트렌드</Link>
              </li>
            </ul>
          </Community>
        </SubCont>

        <SubCont>
          <CopyRight>Copyright (c) WISH. All Rights Reserved</CopyRight>
        </SubCont>
      </Inner>
    </footer>
  );
};

export default Footer;
