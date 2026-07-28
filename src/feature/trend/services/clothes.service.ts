import { searchKeywordType } from "../repositories/trend.repository";

export class ClothesService {
  /**
   * 2026.07.25 트랜드 의류 검색 키워드 조합 생성 함수
   * - 키워드의 children 데이터를 활용해 네이버 검색 쿼리 목록 생성
   * - (트랜드 키워드명 + 상의/하의/신발 검색 키워드) 최종 검색 키워드 조합하여 검색
   * - 검색 결과가 없을 경우, 기본 키워드 조합으로 재검색
   * 
   */
  private generateSearchQueries(keyword: searchKeywordType) {
    const queries: { category: 'tops' | 'bottoms' | 'shoes'; query: string }[] = [];

    const { top, bottom, shoes } = keyword.children;

    top.forEach(item => queries.push({ category: 'tops', query: `${keyword.name} ${item}` }));
    bottom.forEach(item => queries.push({ category: 'bottoms', query: `${keyword.name} ${item}` }));
    shoes.forEach(item => queries.push({ category: 'shoes', query: `${keyword.name} ${item}` }));

    // 세부 아이템 목록이 없는 경우 대비 기본 키워드 추가
    if (queries.length === 0) {
      queries.push({ category: 'tops', query: keyword.name });
    }

    return queries;
  }

  /**
   * 단일 트렌드 키워드에 대한 의류 데이터 수집
   */
  async collectClothesForKeyword(keyword: searchKeywordType) {
    const searchTasks = this.generateSearchQueries(keyword);
    const collectedClothes = [];

    for (const task of searchTasks) {
      // API Rate Limit 방지를 위해 100ms 지연
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/searchClothes`, {
            method: 'POST',
            body: JSON.stringify({
              type: 'search',
              query: task.query,
              display: 5,
            })
        });

        const data = await response.json();

        if (data.status === 200) {
            if (data.clothesData.length > 0) {
                const clothesData = data.clothesData;

                const formattedItems: trendClothes[] = clothesData.map((item: clothes) => ({
                    productId: item.productId,
                    title: item.title,
                    image: item.image,
                    price: parseInt(item.lprice, 10),
                    brand: item.brand || item.mallName,
                    link: item.link,
                    category: task.category, // tops | bottoms | shoes
                    genderCategory: item.category2 || '',
                    keywordName: keyword.name,
                    viewCount: 0,
                    likeCount: 0,
                  }));
            
                collectedClothes.push(...formattedItems);
            }
        } else {
            console.error(`검색 요청 실패: ${data.err}`);
            continue;
        }
      } catch (err) {
        console.error(`검색 요청 중 오류 발생: ${err}`);
        break;
      }
    }

    return collectedClothes;
  }
}