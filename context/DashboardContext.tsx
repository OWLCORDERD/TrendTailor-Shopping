'use client';

import { createContext } from 'react';
import type { DashboardData } from '@/feature/trend/services/dashboard.service';

const EMPTY_DASHBOARD: DashboardData = {
  kpiCards: [],
  headerStats: { keywordCount: 0, itemCount: 0, latestUpdatedAt: null },
  graphTiers: {},
};

// 2026.11.01 메인 대시보드 ISR 집계 데이터 컨텍스트 (KPI · 헤더 통계 · 랭킹 구간별 그래프)
export const DashboardContext = createContext<DashboardData>(EMPTY_DASHBOARD);

// 메인 대시보드 > 서버 컴포넌트에서 집계한 데이터를 하위 클라이언트 컴포넌트에 공유하는 Provider
export const DashboardProvider = ({
  value,
  children,
}: {
  value: DashboardData;
  children: React.ReactNode;
}) => {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
