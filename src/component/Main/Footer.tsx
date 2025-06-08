"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 26rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
  }
`;

const MainCont = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    line-height: 5rem;
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
    font-size: 1.5rem;
    color: #fff;
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

  @media screen and (max-width: 768px) {
    display: none;
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
  height: 100%;
  color: #fff;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: max-content;
  }
`;

const Customer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
`;

const CustomerTitle = styled.div`
  width: 100%;

  h2 {
    width: 100%;
    line-height: 5rem;
    font-size: 1.2rem;
    font-family: "Raleway", sans-serif;
    text-transform: uppercase;
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1rem;
    }
  }
`;

const CustomerNumber = styled.div`
  width: 100%;
  height: 5rem;

  span {
    line-height: 5rem;
    font-size: 2rem;
    font-family: "TheJamsil", sans-serif;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    span {
      font-size: 1.5rem;
    }
  }
`;

const Operation = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media screen and (max-width: 768px) {
    position: relative;
  }
`;

const OperationList = styled.ul`
  width: 100%;
  height: 100%;

  li {
    display: inline-block;
    width: 50%;
    height: 3rem;
    line-height: 3rem;

    span {
      color: #fff;
      font-size: 12px;
      font-family: "TheJamsil", sans-serif;
      font-weight: 400;
    }
  }
`;

const Banking = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;

  @media screen and (max-width: 768px) {
    height: 10rem;
  }
`;

const BankingTitle = styled.div`
  width: 100%;

  h2 {
    line-height: 5rem;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: $Raleway-font;
    text-transform: uppercase;
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
    h2 {
      font-size: 1rem;
      line-height: 3rem;
    }
  }
`;

const BankingInfo = styled.ul`
  width: 100%;
  height: 10rem;

  li {
    display: block;
    width: 100%;
    height: calc(10rem / 2);

    p {
      line-height: calc(10rem / 2);
      font-size: 14px;
      color: #fff;
      font-weight: 400;
      font-family: "TheJamsil", sans-serif;
    }
  }

  @media screen and (max-width: 768px) {
    height: 3rem;

    li {
      display: inline-block;
      width: 50%;
      height: 3rem;

      p {
        line-height: 3rem;
        font-size: 12px;
      }
    }
  }
`;

const CopyRight = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
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
        </MainCont>

        <SubCont>
          <Customer>
            <CustomerTitle>
              <h2>Customer center</h2>
            </CustomerTitle>

            <CustomerNumber>
              <span>1544-1544</span>
            </CustomerNumber>
          </Customer>

          <Operation>
            <OperationList>
              <li>
                <span>AM 10:00 ~ PM 17:00</span>
              </li>

              <li>
                <span>Saturday, Sunday OFF</span>
              </li>

              <li>
                <span>대표 : 임민혁</span>
              </li>

              <li>
                <span>장소 : 서울특별시 강동구 둔촌동</span>
              </li>
            </OperationList>
          </Operation>
        </SubCont>

        <SubCont>
          <Banking>
            <BankingTitle>
              <h2>Banking</h2>
            </BankingTitle>

            <BankingInfo>
              <li>
                <p>국민 937702-00-123456</p>
              </li>

              <li>
                <p>예금주) 대표 임민혁</p>
              </li>
            </BankingInfo>
          </Banking>

          <CopyRight>Copyright (c) WISH. All Rights Reserved</CopyRight>
        </SubCont>
      </Inner>
    </footer>
  );
};

export default Footer;
