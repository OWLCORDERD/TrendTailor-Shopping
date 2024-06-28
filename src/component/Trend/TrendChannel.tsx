"use client";

import { channelDataType } from "app/trend/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";

interface channelDataProps {
  channelData: channelDataType[];
}

const TrendChannel = ({ channelData }: channelDataProps) => {
  const [replaceDescription, setReplaceDescription] = useState<string>("");
  console.log(channelData);

  useEffect(() => {
    const tagReplaceReg = /<[^>]*>?/g;
    const replaceTxt = channelData[0].snippet.description.replace(
      tagReplaceReg,
      ""
    );

    setReplaceDescription(replaceTxt);
  }, []);
  return (
    <div className='TrendChannel-container'>
      <div className='Channel-wrap'>
        <div className='Channel-imgBox'>
          <Image
            src={channelData[0].snippet.thumbnails.high.url}
            width='800'
            height='800'
            alt={`${channelData[0].snippet.title} 채널 이미지`}
          />
        </div>

        <div className='Channel-infoBox'>
          <div className='Category'>
            <span>2023 Fashion trend youtuber</span>
          </div>

          <div className='Channel-name'>
            <FaYoutube className='icon' />
            <h1>{channelData[0].snippet.title}</h1>
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
            <p>{replaceDescription}</p>
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
