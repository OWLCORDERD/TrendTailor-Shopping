import React from 'react';
import Timeline from '@/component/Main/Peed/TimeLine';
import DashboardSection from '@/component/Dashboard/Section';
import SystemLabel from '@/component/Dashboard/ui/SystemLabel';
import TrendTailorAI from '@/component/Main/Peed/TrendTailorAI';
import useSWR, { SWRResponse } from 'swr';
import { FetcherResponse } from 'swr/dist/_internal';
import KeywordForceGraph from '@/component/Dashboard/structure/KeywordForceGraph';
import SerpApiSample from '@/component/Dashboard/structure/SerpApiSample';

interface HeaderChildren {
  title?: string;
  children: React.ReactNode;
  label: {
    type?: 'dot' | 'eyebrow';
    labelTxt?: string;
    subTxt_B?: string;
  };
}

interface HeroChildren {
  title: string;
  desc: string;
  children: React.ReactNode;
  label: {
    type?: 'dot' | 'eyebrow';
    labelTxt?: string;
    subTxt_B?: string;
  };
  href?: string;
  buttonText?: string;
}
const page = async () => {
  const headerChildren: HeaderChildren = {
    children: (
      <>
        <SystemLabel
          type="dot"
          labelTxt="실시간 업데이트"
          subTxt_B="7월 15일 22:40"
        />
        <div className="count">
          <div className="count-item">
            <div className="count-item__label">아이템</div>
            <div className="count-item__value">1,234</div>
          </div>

          <div className="count-item">
            <div className="count-item__label">분석된 키워드</div>
            <div className="count-item__value">12</div>
          </div>
        </div>
      </>
    ),
    label: {
      subTxt_B: '트랜드 스타일 대시보드',
    },
  };

  const heroChildren: HeroChildren = {
    title: '올해 트렌드 키워드들을 분석해보세요.',
    desc: `월별마다 자동화된 트랜드 키워드 수집부터 의류 데이터 수집 파이프라인을 통해 최신화된 데이터를 기반으로
    상위 순위별로 연관 그래프를 시각화하여 제공합니다. 그래프를 통해 패션 트렌드 현황을 빠르게 분석해보세요!`,
    children: (
      <>
        {/* 키워드 그래프 */}
        <KeywordForceGraph />
      </>
    ),
    href: '/trend',
    label: {
      labelTxt: 'TRENDY KEYWORD VECTOR GRAPH',
    },
  };

  const sectionChildren: {
    title: string;
    desc: string;
    type: string;
    label: {
      labelTxt: string;
    };
    children: React.ReactNode;
  } = {
    type: 'banner',
    title: '검색 엔진 스크래핑 API 서비스 <strong>SerpApi</strong>',
    desc: `월별마다 OPEN AI 프롬프트를 통해 집계된 트렌드 키워드별 검색 쿼리를 구성하여 <br/>
    검색 엔진 스크래핑 API 서비스 <strong>SerpApi</strong> 구글 쇼핑 검색 엔진의 검색 결과를 통해 키워드별로 의류 데이터를 수집합니다.`,
    children: <SerpApiSample />,
    label: {
      labelTxt: 'TrendData Collection Pipeline',
    },
  };

  return (
    <>
      {/* 본문 헤더 & KPI 통계 그래프 영역 */}
      <DashboardSection type="header" header={headerChildren} />

      <DashboardSection type="kpi" />

      {/* 본문 상단 Hero 영역 */}
      <DashboardSection type="hero" hero={heroChildren} />

      <TrendTailorAI />

      <DashboardSection type="section" section={sectionChildren} />
    </>
  );
};

export default page;
