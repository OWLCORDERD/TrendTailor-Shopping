'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Dashboard as CSS } from '@/styles';
import { db } from '@/shared/lib/firebase';
import {
  BuildKpiJob,
  KpiCard,
  KpiKeywordDoc,
} from '@/feature/trend/jobs/build-kpi.jobs';

const TrendKpiStats = () => {
  const [cards, setCards] = useState<KpiCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadKpi = async () => {
      setIsLoading(true);

      try {
        const [clothesSnap, keywordSnap] = await Promise.all([
          getDocs(collection(db, 'clothes')),
          getDocs(collection(db, 'trend-keywords')),
        ]);

        const clothesList: trendClothes[] = [];
        clothesSnap.forEach(docSnap => {
          clothesList.push(docSnap.data() as trendClothes);
        });

        const keywordDocs: KpiKeywordDoc[] = keywordSnap.docs.map(docSnap => {
          const data = docSnap.data();
          const createdAtValue = data.createdAt;
          const createdAt =
            createdAtValue && typeof createdAtValue.toDate === 'function'
              ? createdAtValue.toDate()
              : createdAtValue instanceof Date
                ? createdAtValue
                : null;

          return {
            name: data.name ?? '',
            createdAt,
          };
        });

        if (cancelled) return;

        const kpiCards = new BuildKpiJob().process(clothesList, keywordDocs);
        setCards(kpiCards);
      } catch (error) {
        console.error('KPI 통계 집계 실패:', error);
        if (!cancelled) {
          setCards(new BuildKpiJob().process([], []));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadKpi();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayCards =
    cards.length > 0 ? cards : new BuildKpiJob().process([], []);

  return (
    <CSS.KPIGraph>
      {displayCards.map(item => (
        <CSS.KPIGraphItem key={item.type}>
          <div className="kpi__label">{item.label}</div>
          <div className="kpi__value">{isLoading ? '—' : item.title}</div>
          <div className={`kpi__delta${item.deltaUp ? ' up' : ''}`}>
            {isLoading ? '' : item.value}
          </div>
        </CSS.KPIGraphItem>
      ))}
    </CSS.KPIGraph>
  );
};

export default TrendKpiStats;
