import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';
import {
  BuildKpiJob,
  KpiCard,
  KpiKeywordDoc,
} from '@/feature/trend/jobs/build-kpi.jobs';
import {
  BuildGraphJob,
  GraphProcessResult,
  GraphRankTier,
} from '@/feature/trend/jobs/build-graph.jobs';

export interface DashboardHeaderStats {
  keywordCount: number;
  itemCount: number;
  latestUpdatedAt: string | null; // 키워드 문서 updatedAt(없으면 createdAt) 최신값 ISO 문자열
}

export interface DashboardData {
  kpiCards: KpiCard[];
  headerStats: DashboardHeaderStats;
  graphTiers: Partial<Record<GraphRankTier, GraphProcessResult>>;
}

// Firestore Timestamp · Date · 문자열 > Date 변환 (변환 불가 시 null)
const toDate = (value: any): Date | null => {
  if (!value) return null;
  const date =
    typeof value.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * 2026.11.01 메인 대시보드 데이터 서버 집계 (ISR 재생성 시점에만 실행)
 * - Firestore 조회 후 KPI · 헤더 통계 · 랭킹 구간별 그래프 데이터까지 서버에서 계산
 * - 의류 원본 목록은 클라이언트로 내려보내지 않아 RSC payload 축소
 * - 조회 실패 시 에러를 그대로 던져, ISR이 빈 데이터 대신 직전 성공 페이지를 유지하도록 처리
 */
export const getDashboardData = async (): Promise<DashboardData> => {
  const [clothesSnap, keywordSnap] = await Promise.all([
    getDocs(collection(db, 'clothes')),
    getDocs(collection(db, 'trend-keywords')),
  ]);

  const clothesList = clothesSnap.docs.map(
    docSnap => docSnap.data() as trendClothes
  );

  const keywordDocs: KpiKeywordDoc[] = [];
  let latestUpdatedAt: Date | null = null;

  keywordSnap.docs.forEach(docSnap => {
    const data = docSnap.data();
    const createdAt = toDate(data.createdAt);
    const updatedAt = toDate(data.updatedAt) ?? createdAt;

    keywordDocs.push({ name: data.name ?? '', createdAt });

    if (updatedAt && (!latestUpdatedAt || updatedAt > latestUpdatedAt)) {
      latestUpdatedAt = updatedAt;
    }
  });

  // 기본 구간(TOP 1-10) 계산 후, 노출 가능한 나머지 구간도 미리 계산해 select 전환 시 재연산 방지
  const buildGraphJob = new BuildGraphJob();
  const defaultGraph = buildGraphJob.process(clothesList, {
    rankTier: 'top1-10',
  });
  const graphTiers: DashboardData['graphTiers'] = {
    [defaultGraph.meta.rankTier]: defaultGraph,
  };

  defaultGraph.meta.availableTiers
    .filter(tier => tier !== defaultGraph.meta.rankTier)
    .forEach(tier => {
      graphTiers[tier] = buildGraphJob.process(clothesList, { rankTier: tier });
    });

  return {
    kpiCards: new BuildKpiJob().process(clothesList, keywordDocs),
    headerStats: {
      keywordCount: keywordSnap.size,
      itemCount: clothesSnap.size,
      latestUpdatedAt: (latestUpdatedAt as Date | null)?.toISOString() ?? null,
    },
    graphTiers,
  };
};
