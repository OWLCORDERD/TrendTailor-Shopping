// d3 Force Directed 런타임 데이터 > 노드 배열 데이터

export interface KeywordNode {
  id: string;
  name: string;
  type: 'keyword';
  val: number;
  rank: number;
  clothesCount: number;
  topBrands: string[];
}

// d3 Force Directed 런타임 데이터 > 링크 배열 데이터
export interface KeywordLink {
  source: string;
  target: string;
  value: number; // 선 굵기 (공통 브랜드 수 또는 유사도 점수)
  distance: number; // D3 Force 거리 (유사도가 높을수록 짧게 설정)
}

export const GRAPH_PAGE_SIZE = 10;
export const GRAPH_MAX_RANK = 20;

export type GraphRankTier = 'top1-10' | 'top11-20';

export interface GraphProcessOptions {
  rankTier?: GraphRankTier;
}

export interface GraphProcessMeta {
  totalKeywords: number;
  rankTier: GraphRankTier;
  rankRange: { from: number; to: number };
  availableTiers: GraphRankTier[];
  nodeCount: number;
  linkCount: number;
}

export interface GraphProcessResult {
  nodes: KeywordNode[];
  links: KeywordLink[];
  meta: GraphProcessMeta;
}

interface KeywordAggregate {
  keyword: string;
  brands: Set<string>;
  totalReviews: number;
  count: number;
}

const SIMILARITY_THRESHOLD = 0.15;

const RANK_TIER_RANGE: Record<
  GraphRankTier,
  { offset: number; limit: number }
> = {
  'top1-10': { offset: 0, limit: GRAPH_PAGE_SIZE },
  'top11-20': { offset: GRAPH_PAGE_SIZE, limit: GRAPH_PAGE_SIZE },
};

export class BuildGraphJob {
  /**
   * SerpApi 수집 데이터를 D3 Force Directed Graph Runtime Data로 변환
   * 기본: 리뷰 수 기준 TOP 1~10 키워드만 노출 (성능 최적화)
   */
  public process(
    clothesList: trendClothes[],
    options: GraphProcessOptions = {}
  ): GraphProcessResult {
    const rankTier = options.rankTier ?? 'top1-10';
    const aggregates = this.buildKeywordAggregates(clothesList);
    const rankedKeywords = this.sortKeywordsByRank(aggregates);
    const availableTiers = this.getAvailableTiers(rankedKeywords.length);
    const safeTier = availableTiers.includes(rankTier)
      ? rankTier
      : availableTiers[0];

    const { offset, limit } = RANK_TIER_RANGE[safeTier];
    const visibleAggregates = rankedKeywords.slice(offset, offset + limit);

    const nodes = this.buildNodes(visibleAggregates, rankedKeywords);
    const links = this.buildLinks(visibleAggregates);

    const rankFrom = visibleAggregates[0]?.rank ?? 0;
    const rankTo = visibleAggregates[visibleAggregates.length - 1]?.rank ?? 0;

    return {
      nodes,
      links,
      meta: {
        totalKeywords: rankedKeywords.length,
        rankTier: safeTier,
        rankRange: { from: rankFrom, to: rankTo },
        availableTiers,
        nodeCount: nodes.length,
        linkCount: links.length,
      },
    };
  }

  private buildKeywordAggregates(
    clothesList: trendClothes[]
  ): KeywordAggregate[] {
    const aggregateMap = new Map<string, KeywordAggregate>();

    clothesList.forEach(item => {
      const keyword = item.keywordName;
      if (!keyword || !item.brand) return;

      if (!aggregateMap.has(keyword)) {
        aggregateMap.set(keyword, {
          keyword,
          brands: new Set<string>(),
          totalReviews: 0,
          count: 0,
        });
      }

      const aggregate = aggregateMap.get(keyword)!;
      aggregate.brands.add(item.brand.trim().toLowerCase());
      aggregate.totalReviews += item.reviews || 0;
      aggregate.count += 1;
    });

    return Array.from(aggregateMap.values());
  }

  /** 리뷰 수 우선, 동률이면 의류 수 → 키워드명 순 */
  private sortKeywordsByRank(aggregates: KeywordAggregate[]) {
    return [...aggregates]
      .sort((a, b) => {
        if (b.totalReviews !== a.totalReviews) {
          return b.totalReviews - a.totalReviews;
        }

        if (b.count !== a.count) {
          return b.count - a.count;
        }

        return a.keyword.localeCompare(b.keyword, 'ko');
      })
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  }

  private getAvailableTiers(totalKeywords: number): GraphRankTier[] {
    const tiers: GraphRankTier[] = ['top1-10'];

    if (totalKeywords > GRAPH_PAGE_SIZE) {
      tiers.push('top11-20');
    }

    return tiers;
  }

  private buildNodes(
    visibleAggregates: Array<KeywordAggregate & { rank: number }>,
    rankedKeywords: Array<KeywordAggregate & { rank: number }>
  ): KeywordNode[] {
    const rankLookup = new Map(
      rankedKeywords.map(item => [item.keyword, item.rank])
    );

    return visibleAggregates.map(item => ({
      id: `kw_${item.keyword}`,
      name: item.keyword,
      type: 'keyword' as const,
      rank: rankLookup.get(item.keyword) ?? item.rank,
      val: Math.max(30, 25 + Math.log10(item.totalReviews + 1) * 8),
      clothesCount: item.count,
      topBrands: Array.from(item.brands).slice(0, 5),
      brandTotalCount: item.brands.size,
    }));
  }

  /** 선택된 키워드 구간 내에서만 N x N 자카드 유사도 연산 (최대 10개 → 45쌍) */
  private buildLinks(
    visibleAggregates: Array<KeywordAggregate & { rank: number }>
  ): KeywordLink[] {
    const links: KeywordLink[] = [];
    const keywords = visibleAggregates.map(item => item.keyword);
    const brandMap = new Map(
      visibleAggregates.map(item => [item.keyword, item.brands])
    );

    for (let i = 0; i < keywords.length; i++) {
      for (let j = i + 1; j < keywords.length; j++) {
        const kwA = keywords[i];
        const kwB = keywords[j];
        const setA = brandMap.get(kwA)!;
        const setB = brandMap.get(kwB)!;

        const intersection = new Set(
          [...setA].filter(brand => setB.has(brand))
        );
        const union = new Set([...setA, ...setB]);

        if (union.size === 0) continue;

        const similarity = intersection.size / union.size;

        if (similarity >= SIMILARITY_THRESHOLD || intersection.size >= 2) {
          links.push({
            source: `kw_${kwA}`,
            target: `kw_${kwB}`,
            value: Number((similarity * 10).toFixed(1)),
            distance: Math.max(50, 200 - similarity * 150),
          });
        }
      }
    }

    return links;
  }
}
