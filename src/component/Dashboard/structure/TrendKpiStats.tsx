'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Dashboard as CSS } from '@/styles';
import {
  KpiCard,
} from '@/feature/trend/jobs/build-kpi.jobs';
import { DashboardContext } from '../../../../context/DashboardContext';

const TrendKpiStats = () => {
  const [cards, setCards] = useState<KpiCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { kpiCards } = useContext(DashboardContext);

  useEffect(() => {
    if (kpiCards.length > 0) {
      setIsLoading(true);
      try {
        setCards(kpiCards);
      } catch (err) {
        console.error('KPI 통계 집계 실패:', err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [kpiCards]);

  return (
    <CSS.KPIGraph>
      {kpiCards.map(item => (
        <CSS.KPIGraphItem key={item.type}>
          <div className="kpi__label">{item.label}</div>
          {/* key 변경으로 로딩 완료 시 진입 애니메이션 1회 재생 */}
          <div
            key={isLoading ? 'loading' : 'loaded'}
            className={`kpi__value${isLoading ? '' : ' is-loaded'}`}
          >
            {isLoading ? '—' : item.title}
          </div>
          <div className={`kpi__delta${item.deltaUp ? ' up' : ''}`}>
            {isLoading ? '' : item.value}
          </div>
        </CSS.KPIGraphItem>
      ))}
    </CSS.KPIGraph>
  );
};

export default TrendKpiStats;
