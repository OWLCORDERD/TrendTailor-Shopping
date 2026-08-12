import { searchKeywordType, TrendClothesRepository, TrendKeywordRepository } from "../repositories/trend.repository";
import { ClothesService } from "../services/clothes.service";

// 2026.07.25 트랜드 의류 검색 키워드를 통한 의류 데이터 조회
export const searchClothesByTrendKeyword = async () => {
    // 검색쿼리 가공 및 순차 네이버 OpenAPI 요청 수행 서비스 객체 생성
    const clothesService = new ClothesService();
    const trendClothesRepository = new TrendClothesRepository();
    const trendKeywordRepository = new TrendKeywordRepository();
    // 최신 트랜드 키워드 데이터 조회
    const allTrendKeywords: searchKeywordType[] = await trendKeywordRepository.getTrendKeywordDocs();

    // 최신 트랜드 키워드 데이터가 없는 경우 종료
    if (allTrendKeywords.length === 0) {
        return {
            success: false,
            message: '트랜드 키워드 데이터가 없습니다.',
        };
    }

    const collectedClothes: trendClothes[] = [];

    for (const trendKeyword of allTrendKeywords) {
        try {
            // 키워드별 순차 네이버 OPEN API 트랜드 의류 검색 수행
            const currentKeywordClothes = await clothesService.collectClothesForKeyword(trendKeyword);

            // 키워드별로 검색된 의류들을 DB에 순차 저장
            if (currentKeywordClothes.length > 0) {
                collectedClothes.push(...currentKeywordClothes);
            }
        } catch (err) {
            // 트랜드 키워드 의류 데이터 수집 중 하나라도 오류 발생 시, 강제 종료
            console.error(err);
            return {
                success: false,
                message: `특정 키워드 의류 데이터 수집 중 오류가 발생하여 종료되었습니다: ${trendKeyword.name}`
            };
        }
    }

    if (collectedClothes.length > 0) {
        try {
            await trendClothesRepository.save(collectedClothes);
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: `트랜드 키워드 의류 데이터 저장 중 오류가 발생하여 종료되었습니다: ${err}`
            };
        }
    }

    return {
        success: true,
        message: '트랜드 키워드 의류 데이터 수집 완료',
    }
}