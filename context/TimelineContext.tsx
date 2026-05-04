"use client";

import React, { useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MainBanner as CSS } from "styles/Banner/Main";

interface timelineCtxType {
  activeIndex?: number;
  updateActiveIndex: (index: number) => void;
}

export const TimelineContext = React.createContext<timelineCtxType>({
  activeIndex: 0,
  updateActiveIndex: () => {},
});

export const TimelineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [containerOpen, setContainerOpen] = useState<boolean>(true);

  const updateActiveIndex = (idx: number) => {
    setActiveIndex(idx);
  };

  const timelineList = [
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

  return (
    <TimelineContext.Provider value={{ activeIndex, updateActiveIndex }}>
      <CSS.TimelineNavigator $containerOpen={containerOpen}>
        <CSS.TimelineControl>
          <h1 className='timeline-title'>timeline</h1>
          {containerOpen ? (
            <AiOutlineMenuUnfold
              onClick={() => setContainerOpen(!containerOpen)}
            />
          ) : (
            <AiOutlineMenuFold
              onClick={() => setContainerOpen(!containerOpen)}
            />
          )}
        </CSS.TimelineControl>
        <CSS.Timeline $containerOpen={containerOpen}>
          {timelineList.map((item, i) => {
            return (
              <CSS.TimelineItem key={item.id}>
                <div className='timeline-index'>
                  <p className='timeline-en'>{item.title}</p>
                  <span className='timeline-kr'>{item.subTitle}</span>
                </div>

                <span className={activeIndex === i ? "dot active" : "dot"} />
              </CSS.TimelineItem>
            );
          })}
        </CSS.Timeline>
      </CSS.TimelineNavigator>
      {children}
    </TimelineContext.Provider>
  );
};
