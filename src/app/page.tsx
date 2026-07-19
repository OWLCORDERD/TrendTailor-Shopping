import React from "react";
import Timeline from "@/component/Main/Peed/TimeLine";
import DashboardSection from "@/component/Dashboard/Section";
import SystemLabel from "@/component/Dashboard/ui/SystemLabel";
import KPIGraph from "@/component/Dashboard/ui/KPIGraph";
import KeywordMapGraph from "@/component/Dashboard/architecture/KeywordMapGraph";
import TrendTailorAI from "@/component/Main/Peed/TrendTailorAI";

const page = async () => {
  return (
    <>
      {/* 본문 헤더 & KPI 통계 그래프 영역 */}
      <DashboardSection type='header'>
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
      </DashboardSection>

      <KPIGraph />

      {/* 본문 상단 Hero 영역 */}
      <KeywordMapGraph type='hero' />

      <TrendTailorAI />
    </>
  );
};

export default page;
