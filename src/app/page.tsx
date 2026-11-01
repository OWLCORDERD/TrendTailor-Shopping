import React from 'react';
import DashboardSection from '@/component/Dashboard/Section';
import TrendTailorAI from '@/component/Main/Peed/TrendTailorAI';
import KeywordForceGraph from '@/component/Dashboard/structure/KeywordForceGraph';
import { getDashboardData } from '@/feature/trend/services/dashboard.service';
import { DashboardProvider } from '../../context/DashboardContext';
import TrendKpiStats from '@/component/Dashboard/structure/TrendKpiStats';
import DashboardHeader from '@/component/Dashboard/structure/Header';

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

// 2026.11.01 대시보드 데이터는 관리자 수집 완료 시 revalidateDashboard(Server Action)로 즉시 갱신
// 갱신 누락 및 '이번달' KPI 월 전환 대비 안전망으로 하루 단위 재생성
export const revalidate = 86400;

const page = async () => {
  const dashboardData = await getDashboardData();

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
    href: '/',
    label: {
      labelTxt: 'TRENDY KEYWORD VECTOR GRAPH',
    },
  };

  return (
    <DashboardProvider value={dashboardData}>
      {/* 2026.10.05 본문 헤더 & KPI 통계 그래프 영역
      서버 컴포넌트 props 구조 아닌 독립적인 클라이언트 사이드 컴포넌트로 분리 */}
      <DashboardHeader />

      <TrendKpiStats />

      {/* 본문 상단 Hero 영역 */}
      <DashboardSection type="hero" hero={heroChildren} />

      <TrendTailorAI />

      {/* <DashboardSection type="section" section={sectionChildren} /> */}
    </DashboardProvider>
  );
};

export default page;
