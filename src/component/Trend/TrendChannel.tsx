import Image from "next/image";
import React from "react";
import { FaYoutube } from "react-icons/fa";

const TrendChannel = () => {
  return (
    <div className='TrendChannel-container'>
      <div className='Channel-wrap'>
        <div className='Channel-imgBox'>
          <Image
            src='/Images/Youtuber.webp'
            width='650'
            height='800'
            alt='Channel-profile'
          />
        </div>

        <div className='Channel-infoBox'>
          <div className='Category'>
            <span>2023 Fashion trend youtuber</span>
          </div>

          <div className='Channel-name'>
            <FaYoutube className='icon' />
            <h1>깡스타일리스트</h1>
          </div>

          <div className='Channel-subscribe'>
            <div className='subscribe-title'>
              <h2>구독자</h2>
            </div>
            <div className='subscribe-count'>
              <span>약 126만명</span>
            </div>
          </div>

          <div className='Channel-info'>
            <p>
              “안녕하세요 ~ 스타일리시트, 깡입니다!” 주 콘텐츠로 남성 패션을
              다루고 있으며 스타일링에 관한 전반적인 내용을 다루며 다양한 패션
              시도와 시대의 흐름을 잘 파악하여 의상 셋업을 추천하는 채널입니다.
              올해 대한민국 패션 유튜버중 2023 패션 트렌드를 잘 알리고 주목을 끈
              유튜버로 깡스타일리스트를 추천합니다.
            </p>
          </div>

          <a
            href='https://www.youtube.com/@kkang.stylist'
            className='viewChannel-button'
            target='_blank'
          >
            채널 보러가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrendChannel;
