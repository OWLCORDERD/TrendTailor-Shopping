import React from "react";
import Timeline from "@/component/Main/Peed/TimeLine";
import DashboardSection from "@/component/Dashboard/Section";
import SystemLabel from "@/component/Dashboard/ui/SystemLabel";
import TrendTailorAI from "@/component/Main/Peed/TrendTailorAI";
import useSWR, { SWRResponse } from "swr";
import { FetcherResponse } from "swr/dist/_internal";
import KeywordForceGraph from "@/component/Dashboard/structure/KeywordForceGraph";

interface HeaderChildren {
  title?: string;
  children: React.ReactNode;
  label: {
    type?: "dot" | "eyebrow";
    labelTxt?: string;
    subTxt_B?: string;
  };
}

interface HeroChildren {
  title: string;
  desc: string;
  children: React.ReactNode;
  label: {
    type?: "dot" | "eyebrow";
    labelTxt?: string;
    subTxt_B?: string;
  };
}
const page = async () => {
  const headerChildren: HeaderChildren = {
    children: (
      <>
        <SystemLabel
          type='dot'
          labelTxt='실시간 업데이트'
          subTxt_B='7월 15일 22:40'
        />
        <div className='count'>
          <div className='count-item'>
            <div className='count-item__label'>아이템</div>
            <div className='count-item__value'>1,234</div>
          </div>

          <div className='count-item'>
            <div className='count-item__label'>분석된 키워드</div>
            <div className='count-item__value'>12</div>
          </div>
        </div>
      </>
    ),
    label: {
      subTxt_B: "트랜드 스타일 대시보드"
    }
  }

  const heroChildren: HeroChildren = {
    title: "올해 트랜드 키워드들을 분석해보세요.",
    desc: `trendtailor는 월별마다 트랜드 키워드를 수집하며 
    그래프로 시각화하여 제공합니다. 이번달에는 어떤 흐름의 변화가 나타났을지 그래프를 통해 분석해보세요!`,
    children: (
      <>
        {/* 키워드 그래프 */}
        <KeywordForceGraph />
      </>
    ),
    label: {
      labelTxt: "TRENDY KEYWORD VECTOR GRAPH",
    }
  }

  return (
    <>
      {/* 본문 헤더 & KPI 통계 그래프 영역 */}
      <DashboardSection
        type='header'
        header={headerChildren} />

      <DashboardSection
        type='kpi' />

      {/* 본문 상단 Hero 영역 */}
      <DashboardSection
        type='hero'
        hero={heroChildren} />

      <TrendTailorAI />
    </>
  );
};

export default page;
