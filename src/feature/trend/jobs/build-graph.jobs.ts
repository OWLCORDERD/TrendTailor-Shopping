// d3 Force Directed 런타임 데이터 > 노드 배열 데이터

export interface KeywordNode {
  id: string;
  name: string;
  type: 'keyword';
  val: number;
  clothesCount: number;
  topBrands: string[];
}

// d3 Force Directed 런타임 데이터 > 링크 배열 데이터
export interface KeywordLink {
  source: string;
  target: string;
  value: number;    // 선 굵기 (공통 브랜드 수 또는 유사도 점수)
  distance: number; // D3 Force 거리 (유사도가 높을수록 짧게 설정)
}

export class BuildGraphJob {
  /**
   * SerpApi 수집 데이터를 D3 Force Directed Graph Runtime Data로 변환
   */
  public process(clothesList: trendClothes[]) {
    // 키워드별 브랜드 및 통계 데이터 수집
    const keywordBrandMap = new Map<string, Set<string>>();
    const keywordStatsMap = new Map<string, { totalReviews: number; count: number }>();

    // 1. 키워드별 브랜드 및 통계 데이터 수집
    clothesList.forEach((item) => {
      const kw = item.keywordName;
      if (!item.brand) return;

      // 브랜드 Map 생성
      if (!keywordBrandMap.has(kw)) {
        keywordBrandMap.set(kw, new Set<string>());
        keywordStatsMap.set(kw, { totalReviews: 0, count: 0 });
      }

      keywordBrandMap.get(kw)!.add(item.brand.trim().toLowerCase());
      
      const stat = keywordStatsMap.get(kw)!;
      stat.totalReviews += item.reviews || 0;
      stat.count += 1;
    });

    const keywords = Array.from(keywordBrandMap.keys());
    const nodes: KeywordNode[] = [];
    const links: KeywordLink[] = [];

    // 2. 키워드 노드 생성
    keywords.forEach((kw) => {
      const stat = keywordStatsMap.get(kw)!;
      const brands = Array.from(keywordBrandMap.get(kw)!);

      nodes.push({
        id: `kw_${kw}`,
        name: kw,
        type: 'keyword',
        val: Math.max(30, 25 + Math.log10(stat.totalReviews + 1) * 8), // 노드 크기
        clothesCount: stat.count,
        topBrands: brands.slice(0, 5), // 상위 브랜드 5개
      });
    });

    // 3. 키워드간 브랜드 자카드 유사도 연산 (N x N 조합)
    const SIMILARITY_THRESHOLD = 0.15; // 최소 15% 이상 유사할 때만 연결 (노이즈 방지)

    for (let i = 0; i < keywords.length; i++) {
      for (let j = i + 1; j < keywords.length; j++) {
        const kwA = keywords[i];
        const kwB = keywords[j];

        const setA = keywordBrandMap.get(kwA)!;
        const setB = keywordBrandMap.get(kwB)!;

        // 교집합 및 합집합 산출
        const intersection = new Set([...setA].filter((b) => setB.has(b)));
        const union = new Set([...setA, ...setB]);

        if (union.size === 0) continue;

        const similarity = intersection.size / union.size; // 자카드 유사도 (0~1)

        // 임계값(Threshold) 이상이거나 공통 브랜드가 2개 이상일 때 Link 형성
        if (similarity >= SIMILARITY_THRESHOLD || intersection.size >= 2) {
          links.push({
            source: `kw_${kwA}`,
            target: `kw_${kwB}`,
            value: Number((similarity * 10).toFixed(1)), // 선 굵기 (0.1 ~ 10)
            // 유사도가 높을수록(1.0에 가까울수록) distance를 좁혀 가까이 배치
            distance: Math.max(50, 200 - similarity * 150),
          });
        }
      }
    }

    return { nodes, links };
  }
}