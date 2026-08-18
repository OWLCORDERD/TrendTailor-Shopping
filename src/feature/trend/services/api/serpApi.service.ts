// services/api/serpapi.service.ts
import { getJson } from 'serpapi';

export interface TrendKeywordItem {
  name: string;      // 예: "블록코어"
  aliases: string[]; // 예: ["Blockcore", "Sportism"]
  // ... 기타 필드
}

export interface SerpApiShoppingItem {
  productId: string;
  title: string;
  link: string;
  image: string;
  price: number;
  brand: string;
  subCategory: 'tops' | 'bottoms' | 'shoes';
}

export default class SerpApiService {
  /**
  * 영문 및 한글 상품명 대응 카테고리(tops, bottoms, shoes) 자동 분류
  */
  private classifySubCategory(title: string): 'tops' | 'bottoms' | 'shoes' {
    const t = title.toLowerCase();
  
    // 신발 (Shoes)
    if (/(shoes|sneakers|boots|loafers|sandals|mules|slides|신발|운동화|스니커즈|부츠|로퍼)/.test(t)) {
      return 'shoes';
    }
    // 하의 (Bottoms)
    if (/(pants|trousers|denim|jeans|skirt|shorts|slacks|sweatpants|팬츠|바지|데님|스커트|치마|쇼츠)/.test(t)) {
      return 'bottoms';
    }
    // 기본값: 상의 (Tops - jacket, shirt, hoodie, tee, coat 등)
    return 'tops';
  }
  /**
   * 키워드별 영문 alias를 우선 활용한 SerpApi Google Shopping 수집
   */
  async searchShopping(keyword: TrendKeywordItem) {
    // 1. 영문 Alias 우선 선택 (없을 경우 한글 name 사용)
    const englishAlias = keyword.aliases?.find((a) => /^[A-Za-z0-9\s-]+$/.test(a));
    const searchQuery = englishAlias ? `${englishAlias} fashion` : `${keyword.name} 패션`;

    console.log(`🔍 [SerpApi] 검색 쿼리 실행: "${searchQuery}" (원래 키워드: ${keyword.name})`);

    try {
      const getJsonResponse = await fetch(`/api/serpApi?q=${searchQuery}`);

      const data = await getJsonResponse.json();

      if (data.success) {
        const results = data.clothesData || [];

        if (results.length === 0) {
          return {
            success: false,
            clothesData: [],
          };
        }
  
        const formattedItems = results.map((item: any, index: number) => {
          const title = item.title || '';
          
          // 영문/한글 혼용 타이틀 대응 서브 카테고리 분류
          const subCategory = this.classifySubCategory(title);

          return {
            title,
            product_id: item.product_id || `serp_${Date.now()}_${index}`,
            product_link: item.product_link,
            thumbnail: item.thumbnail,
            price: item.extracted_price ?? 0,
            source: item.source || 'Global Fashion',
            source_icon: item.source_icon,
            rating: item.rating || 0,
            reviews: item.reviews || 0,
            subCategory,
          } as unknown as SerpApiClothes;
        });

        return {
          success: true,
          clothesData: formattedItems,
        };
      }
    } catch (err) {
      console.error(`검색 요청 중 오류 발생 [${keyword.name}]: ${err}`);
      return {
        success: false,
        clothesData: [],
      };
    }
  }
}