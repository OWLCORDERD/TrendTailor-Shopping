import React from "react";
import { Trendly as CSS } from "@/styles";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";

const Detail = () => {
  const currentChannel = useAppSelector(
    (state) => state.chatBubble.currentConsultant
  );

  console.log(currentChannel);
  return (
    <CSS.ChannelDetail>
      <div className='channel-profile'>
        <div className='channel-img'>
          <Image
            src={
              currentChannel ? currentChannel.snippet.thumbnails.high.url : ""
            }
            width={120}
            height={150}
            alt={currentChannel?.snippet.title + " 채널 이미지"}
          />
        </div>

        <div className='channel-info'>
          <div className='index'>
            <h1 className='channel-name'>{currentChannel?.snippet.title}</h1>
            <ul className='channel-subscriber'>
              <li className='title'>구독자</li>
              <li className='count'>
                {currentChannel?.statistics.subscriberCount}명
              </li>
            </ul>
          </div>
          <a
            href={`https://www.youtube.com/${currentChannel?.snippet.customUrl}`}
            target='_blank'
            rel='noopener noreferrer'
            className='channel-link'
          >
            채널 바로가기
          </a>
        </div>
      </div>

      <div className='recommend-comment'>
        <p className='index'>👨🏻‍💻 채널 소개</p>
        <span className='comment'>{currentChannel?.snippet.description}</span>
      </div>

      <div className='recommend-comment'>
        <p className='index'>👨🏻‍💻 컨설턴트 선정 이유</p>
        <dl className='keyword'>
          <dt className='title'>키워드</dt>
          <dd>{currentChannel?.keyword}</dd>
        </dl>
      </div>
    </CSS.ChannelDetail>
  );
};

export default Detail;
