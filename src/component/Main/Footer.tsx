import React from "react";
import "styles/footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className='Ft-cont1'>
        <div className='Ft-logo'>
          <div className='Main-logo'>
            <h1>Wish</h1>
          </div>

          <div className='logo-info'>
            <p>Wearing Information Shopping&Shared Homepage</p>
          </div>
        </div>

        <div className='Ft-menu'>
          <ul>
            <li>
              <a href='#'>사이트 소개</a>
            </li>

            <li>
              <a href='#'>이용안내</a>
            </li>

            <li>
              <a href='#'>개인정보처리방침</a>
            </li>
          </ul>
        </div>

        <div className='Ft-Community'>
          <h2 className='Community-title'>community</h2>

          <ul>
            <li>
              <a href='#'>고객센터</a>
            </li>
            <li>
              <a href='#'>공지사항</a>
            </li>
            <li>
              <a href='#'>Megazine</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='Ft-Customer'>
        <h2 className='Customer-title'>Customer center</h2>

        <div className='Customer-number'>
          <h3>1544-1544</h3>
        </div>

        <div className='Operation-info'>
          <ul className='Operation-list'>
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
          </ul>
        </div>
      </div>

      <div className='Ft-Banking'>
        <h2 className='Banking-title'>Banking</h2>

        <ul className='Banking-info'>
          <li>
            <p>국민 937702-00-123456</p>
          </li>

          <li>
            <p>예금주) 대표 임민혁</p>
          </li>
        </ul>

        <h2 className='CopyRight-info'>
          Copyright (c) WISH. All Rights Reserved
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
