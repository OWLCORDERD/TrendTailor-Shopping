import { selectType } from '@/store/chatBubbleSlice';
import {
  searchKeywordType,
  TrendClothesRepository,
  TrendKeywordRepository,
} from '../repositories/trend.repository';
import { ClothesService } from '../services/clothes.service';

// 2026.07.25 트랜드 의류 검색 키워드를 통한 의류 데이터 조회
export const searchClothesByTrendKeyword = async () => {
  // 검색쿼리 가공 및 순차 네이버 OpenAPI 요청 수행 서비스 객체 생성
  const clothesService = new ClothesService();
  const trendClothesRepository = new TrendClothesRepository();
  const trendKeywordRepository = new TrendKeywordRepository();
  // 최신 트랜드 키워드 데이터 조회
  const allTrendKeywords: searchKeywordType[] =
    await trendKeywordRepository.getTrendKeywordDocs();

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
      const currentKeywordClothes =
        await clothesService.collectClothesForKeyword(trendKeyword);

      // 키워드 검색 결과가 없는 경우 다음 키워드 검색 처리
      if (currentKeywordClothes.length === 0) {
        continue;
      }

      // 키워드별로 검색된 의류들을 DB에 순차 저장
      collectedClothes.push(...currentKeywordClothes);
    } catch (err) {
      // 트랜드 키워드 의류 데이터 수집 중 하나라도 오류 발생 시, 강제 종료
      console.error(err);
      return {
        success: false,
        message: `특정 키워드 의류 데이터 수집 중 오류가 발생하여 종료되었습니다: ${trendKeyword.name}`,
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
        message: `트랜드 키워드 의류 데이터 저장 중 오류가 발생하여 종료되었습니다: ${err}`,
      };
    }
  }

  return {
    success: true,
    message: '트랜드 키워드 의류 데이터 수집 완료',
  };
};

// 2026.09.06. 챗봇 컨설팅 모드 > 사용자 설문 답변 기반 추천 의류 필터링
export const searchClothesByConsulting = async (QASelect: selectType[]) => {
  const clothesService = new TrendClothesRepository();

  try {
    const allTrendClothes: trendClothes[] =
      await clothesService.getClothesDocs();

    if (allTrendClothes.length === 0) {
      return {
        success: false,
        data: [],
        message: '조회된 트랜드 의류 데이터가 없습니다.',
      };
    }

    const filteredClothes = filterTrendClothes(allTrendClothes, QASelect);

    return {
      success: true,
      data: filteredClothes,
    };
  } catch {
    return {
      success: false,
      data: [],
      message: '트랜드 의류 데이터 조회 중 오류가 발생하여 종료되었습니다.',
    };
  }
};

interface answerSchemaType {
  category: string;
  keywordName: string;
  gender: string;
  maxPrice: number;
  priority: string;
}

/**
 * 2026.09.06. 전체 트렌드 의류 목록 기반 사용자 설문 답변별 추천 의류 필터링 함수
 * 점수 계산 알고리즘을 적용한 상위 10개 추천 의류 목록 반환
 * @param clothesList 트랜드 의류 데이터 목록
 * @param answers 사용자 설문 답변 목록
 * @returns 필터링된 트랜드 의류 데이터 목록
 */
export function filterTrendClothes(
  clothesList: trendClothes[],
  answers: selectType[]
) {
  const answerSchema: answerSchemaType = {
    category: answers[0].selectLabel, // 1번 문항 - 의류 종류
    keywordName: answers[1].selectLabel, // 2번 문항 - 트랜드 키워드
    gender: answers[2].selectLabel, // 3번 문항 - 성별
    maxPrice: parseInt(answers[3].selectLabel), // 4번 문항 - 예산 범위
    priority: answers[4].selectLabel, // 5번 문항 - 추천 상품 선별 요소
  };

  return (
    clothesList
      // 1. Hard Filtering (카테고리, 가격대 범위)
      .filter(item => {
        const matchCategory =
          !answerSchema.category || item.category === answerSchema.category;
        const matchGender =
          !answerSchema.gender ||
          inferGender(item.title) === answerSchema.gender;

        // 예산 범위 상관없음 선택 케이스 처리
        if (typeof answerSchema.maxPrice !== 'number') {
          return matchCategory && matchGender;
        }

        // 예산 범위 선택 케이스 처리
        const matchPrice = item.price <= answerSchema.maxPrice;
        return matchCategory && matchPrice && matchGender;
      })
      // 2. Score Calculation (가중치 점수 산출)
      .map(item => {
        let score = 0;

        // 키워드 일치 우대
        if (item.keywordName === answerSchema.keywordName) score += 50;

        // 우선순위 옵션에 따른 점수 산정 (Step 5 반영)
        if (answerSchema.priority === 'popular') {
          // 인기도: log(리뷰수) + 평점
          score += Math.log10(item.reviews + 1) * 20 + item.rating * 10;
        } else if (answerSchema.priority === 'value') {
          // 가성비: 가격이 낮을수록 높은 점수
          score +=
            (1 - item.price / answerSchema.maxPrice) * 50 + item.rating * 5;
        } else if (answerSchema.priority === 'rating') {
          // 평점 중심
          score += item.rating * 20 + Math.log10(item.reviews + 1) * 5;
        }

        return { ...item, matchScore: score };
      })
      // 3. 점수 내림차순 정렬 후 Top 5~10개 노출
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10)
  );
}

// 2026.09.06. 의류 제목 기반 성별 정규식 기반 추론 함수
function inferGender(title: string): 'female' | 'male' | 'unisex' {
  if (/(여성|여아|우먼|women|ladys)/i.test(title)) return 'female';
  if (/(남성|남아|맨|men|mens)/i.test(title)) return 'male';
  return 'unisex'; // 키워드가 없으면 공용으로 간주
}
