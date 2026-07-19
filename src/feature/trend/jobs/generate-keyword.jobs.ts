import dayjs from "dayjs";
import * as openAIService from "../services/api/openai.service";
import * as trendKeywordRepository from "../repositories/trend.repository";

// (월별 트랜드 키워드 데이터 수집 및 저장) 비즈니스 플로우 파이프라인 함수
export const generateTrendKeywordJobs = async () => {
    // 월별 트랜드 키워드 데이터 수집을 위한 사용자 프롬프트 생성

    // 요청 날짜 기반 프롬프트 정규화 포맷 생성
    const date = dayjs().format("MMMM D, YYYY.");

    // 요청 날짜 기반 사용자 프롬프트 생성
    const currentDateUserPrompt = `
        Today is ${date}.

        Analyze Korean fashion trends from the last 30 days.

        Select only fashion style keywords that are currently meaningful in South Korea.

        Exclude:

        - Brands
        - Celebrities
        - Individual products
        - Shopping malls
        - Events

        Return the top 10 styles ordered by popularity.
    `;


    // 월별 트랜드 키워드 데이터 수집을 위한 OpenAI 호출
    const trendKeyword = await openAIService.generateOpenAI(currentDateUserPrompt);

    if (!trendKeyword.success) {
        console.error(`월별 트랜드 키워드 수집 실패: ${trendKeyword.err}`);
        return;
    }

    if (trendKeyword.recommend.trendKeywords.length > 0) {
        const result = await trendKeywordRepository.save(
            trendKeyword.recommend.trendKeywords
        );

        if (!result.success) {
            console.error("월별 트랜드 키워드 저장 실패", result.err);
            return;
        }

        console.log(
            `트랜드 키워드 저장 완료: created=${result.created}, updated=${result.updated}, skipped=${result.skipped}`
        );
    }
};
