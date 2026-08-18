import { searchKeywordType } from "../repositories/trend.repository";
import { searchNaverShop } from "./api/naver.service";
import SerpApiService from "./api/serpApi.service";

export class ClothesService {
  /**
   * 2026.07.25 트랜드 의류 검색 키워드 조합 생성 함수
   * - 키워드의 children 데이터를 활용해 네이버 검색 쿼리 목록 생성
   * - (트랜드 키워드명 + 상의/하의/신발 검색 키워드) 최종 검색 키워드 조합하여 검색
   * - 검색 결과가 없을 경우, 기본 키워드 조합으로 재검색
   */
  // private generateSearchQueries(keyword: searchKeywordType) {
  //   const queries: { category: "tops" | "bottoms" | "shoes"; query: string }[] =
  //     [];

  //   const { top, bottom, shoes } = keyword.children;

  //   top.forEach((item) =>
  //     queries.push({ category: "tops", query: `${keyword.name} ${item}` })
  //   );
  //   bottom.forEach((item) =>
  //     queries.push({ category: "bottoms", query: `${keyword.name} ${item}` })
  //   );
  //   shoes.forEach((item) =>
  //     queries.push({ category: "shoes", query: `${keyword.name} ${item}` })
  //   );

  //   // 세부 아이템 목록이 없는 경우 대비 기본 키워드 추가
  //   if (queries.length === 0) {
  //     queries.push({ category: "tops", query: keyword.name });
  //   }

  //   return queries;
  // }

  /**
   * 단일 트렌드 키워드에 대한 의류 데이터 수집
   * - 서버 잡에서 실행되므로 내부 /api/searchClothes 재호출 없이 네이버 API 직접 호출
   */
  async collectClothesForKeyword(keyword: searchKeywordType) {
    try {
      const serpApi = new SerpApiService();
      const result = await serpApi.searchShopping(keyword);

      if (!result || !result.success) {
        console.error(`검색 요청 실패 [${keyword.name}]`);
        return [];
      }

      // 정상 응답이지만 조회된 의류 데이터가 없는 경우 빈배열 반환 후 종료
      if (result.clothesData.length === 0) {
        console.error(`검색 결과가 없습니다. [${keyword.name}]`);
        return [];
      }

      // 조회된 의류 데이터 스키마 > DB 저장 스키마 형태로 포맷팅하여 반환
      const formattedItems: trendClothes[] = result.clothesData.map(
        (item: any) => {
          return {
            title: item.title,
            productId: item.product_id,
            link: item.product_link,
            thumbnail: item.thumbnail,
            price: item.price || 0,
            brand: item.source,
            brandIcon: item.source_icon,
            category: item.subCategory,
            keywordName: keyword.name,
            rating: item.rating || 0,
            reviews: item.reviews || 0,
            createdAt: "",
            updatedAt: "",
          };
        });

      return formattedItems;
    } catch (err) {
      console.error(`검색 요청 중 오류 발생 [${keyword.name}]: ${err}`);
      return [];
    }
  }
}
