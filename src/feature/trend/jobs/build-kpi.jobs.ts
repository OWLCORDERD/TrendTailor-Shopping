import { BuildGraphJob } from '@/feature/trend/jobs/build-graph.jobs';

export type KpiCardType = 'top-keyword' | 'new-clothes' | 'new-keyword';

export interface KpiKeywordDoc {
  name: string;
  createdAt: Date | null;
}

export interface KpiCard {
  type: KpiCardType;
  label: string;
  title: string;
  value: string;
  deltaUp: boolean;
}

const KPI_EMPTY: KpiCard[] = [
  {
    type: 'top-keyword',
    label: '인기 1위 키워드',
    title: '-',
    value: '의류 0건',
    deltaUp: false,
  },
  {
    type: 'new-clothes',
    label: '이번달 신규 등록 아이템',
    title: `${new Date().getMonth() + 1}월 신상 의류`,
    value: '+ 0',
    deltaUp: false,
  },
  {
    type: 'new-keyword',
    label: '신규 등록 키워드',
    title: '-',
    value: '+ 0',
    deltaUp: false,
  },
];

const toDate = (value: unknown): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (typeof value === 'object') {
    const maybeTimestamp = value as {
      toDate?: () => Date;
      seconds?: number;
    };

    if (typeof maybeTimestamp.toDate === 'function') {
      const parsed = maybeTimestamp.toDate();
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    if (typeof maybeTimestamp.seconds === 'number') {
      return new Date(maybeTimestamp.seconds * 1000);
    }
  }

  return null;
};

const isSameMonth = (date: Date | null, now: Date) => {
  if (!date) return false;
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
};

const formatDelta = (count: number) => `+ ${count.toLocaleString('ko-KR')}`;

const keywordHeadline = (names: string[]) => {
  if (names.length === 0) return '-';
  if (names.length === 1) return names[0];
  return `${names[0]} 외`;
};

/**
 * 대시보드 KPI — 렌더 시점의 의류/키워드 풀에서 계산 가능한 통계만 집계
 *
 * 1. 인기 1위 키워드: 그래프와 동일하게 리뷰 합계 → 의류 수 순 랭킹 1위
 * 2. 이번달 신규 아이템: createdAt(없으면 updatedAt)이 이번달인 의류 수
 * 3. 신규 키워드: trend-keywords.createdAt이 이번달인 문서 수
 *    (키워드 문서 날짜가 없으면 의류 풀의 고유 키워드 수로 대체)
 */
export class BuildKpiJob {
  public process(
    clothesList: trendClothes[],
    keywordDocs: KpiKeywordDoc[] = [],
    now = new Date()
  ): KpiCard[] {
    if (!clothesList.length && !keywordDocs.length) {
      return KPI_EMPTY;
    }

    return [
      this.buildTopKeyword(clothesList),
      this.buildMonthlyClothes(clothesList, now),
      this.buildNewKeywords(clothesList, keywordDocs, now),
    ];
  }

  private buildTopKeyword(clothesList: trendClothes[]): KpiCard {
    const graph = new BuildGraphJob().process(clothesList, {
      rankTier: 'top1-10',
    });
    const top =
      graph.nodes.find(node => node.rank === 1) ?? graph.nodes[0] ?? null;

    if (!top) {
      return KPI_EMPTY[0];
    }

    return {
      type: 'top-keyword',
      label: '인기 1위 키워드',
      title: top.name,
      value: `의류 ${top.clothesCount.toLocaleString('ko-KR')}건`,
      deltaUp: top.clothesCount > 0,
    };
  }

  private buildMonthlyClothes(clothesList: trendClothes[], now: Date): KpiCard {
    const monthLabel = `${now.getMonth() + 1}월 신상 의류`;
    const monthlyCount = clothesList.filter(item => {
      const registered =
        toDate(item.createdAt) ?? toDate((item as trendClothes).updatedAt);
      return isSameMonth(registered, now);
    }).length;

    return {
      type: 'new-clothes',
      label: '이번달 신규 등록 아이템',
      title: monthLabel,
      value: formatDelta(monthlyCount),
      deltaUp: monthlyCount > 0,
    };
  }

  private buildNewKeywords(
    clothesList: trendClothes[],
    keywordDocs: KpiKeywordDoc[],
    now: Date
  ): KpiCard {
    const datedKeywords = keywordDocs.filter(doc => doc.name && doc.createdAt);

    if (datedKeywords.length > 0) {
      const newKeywords = datedKeywords
        .filter(doc => isSameMonth(doc.createdAt, now))
        .map(doc => doc.name);

      return {
        type: 'new-keyword',
        label: '신규 등록 키워드',
        title: keywordHeadline(newKeywords),
        value: formatDelta(newKeywords.length),
        deltaUp: newKeywords.length > 0,
      };
    }

    const uniqueNames = Array.from(
      new Set(
        clothesList
          .map(item => item.keywordName?.trim())
          .filter((name): name is string => Boolean(name))
      )
    );

    return {
      type: 'new-keyword',
      label: '등록 키워드',
      title: keywordHeadline(uniqueNames),
      value: formatDelta(uniqueNames.length),
      deltaUp: uniqueNames.length > 0,
    };
  }
}
