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
    desc: `월별마다 집계된 트렌드 키워드별 검색 쿼리를 구성하여 검색 엔진 스크래핑 API 서비스 <strong>SerpApi</strong> 구글 쇼핑 검색 엔진으로 의류 데이터를 수집하며 키워드 간의 메타데이터 관계 정의한 스키마 형태로 최종 저장합니다.`,
    children: <SerpApiSample />,
    label: {
      labelTxt: 'TrendData Collection Pipeline',
    },
  };

  return (
    <>
      {/* 2026.10.05 본문 헤더 & KPI 통계 그래프 영역
      서버 컴포넌트 props 구조 아닌 독립적인 클라이언트 사이드 컴포넌트로 분리 */}
      <DashboardSection type="header" />

      <DashboardSection type="kpi" />

      {/* 본문 상단 Hero 영역 */}
      <DashboardSection type="hero" hero={heroChildren} />

      <TrendTailorAI />

      <DashboardSection type="section" section={sectionChildren} />
    </>
  );
};

export default page;
