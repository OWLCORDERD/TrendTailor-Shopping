"use client";

import React, { useState } from "react";
import { MainBanner as CSS } from "styles";

const TimelineNavigator = () => {
  const timelineItems = [
    {
      id: 1,
      title: "intro",
      subTitle: "인트로",
    },
    {
      id: 2,
      title: "trendly ai",
      subTitle: "트랜드 컨설팅 AI",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <CSS.TimelineNavigator>
      <CSS.Timeline>
        {timelineItems.map((item, i) => {
          return (
            <CSS.TimelineItem key={item.id}>
              <div className='timeline-index'>
                <p className='timeline-en'>{item.title}</p>
                <span className='timeline-kr'>{item.subTitle}</span>
              </div>

              <span className='dot' />
            </CSS.TimelineItem>
          );
        })}
      </CSS.Timeline>
    </CSS.TimelineNavigator>
  );
};

export default TimelineNavigator;
