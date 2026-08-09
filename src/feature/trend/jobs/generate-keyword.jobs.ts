import dayjs from "dayjs";
import { TrendKeywordRepository } from "../repositories/trend.repository";

// 2026.07.19:
// 월별 트랜드 키워드 데이터 수집을 위한 프롬프트

//------------------------- 시스템 프롬프트 -------------------------------------//
// 1. 8개~12개 트랜드 키워드 생성
// 2. 각 키워드는 패션 스타일을 나타내야 함 (브랜드나 제품X)
// 3. 대중적으로 통용되는 한국 패션 용어 사용
// 4. 중복 키워드 생성 방지
// 5. 매달 동일한 명칭 사용
// 6. 다른 명칭으로 존재하는 경우 가장 일반적인 한국 패션 용어 선택
// 7. 각 키워드는 aliases(영문 alias 필수), category, confidence, season, relatedStyles, children 포함
// 8. 하위 카테고리는 상의, 하의, 신발 3가지만 포함
// 9. function call로 정의한 JSON 형식으로 반환
//--------------------------------------------------------------//
// ** 사용자 프롬프트는 동적으로 생성된 문자열로 전달됨 **
const trendKeywordSystemPrompt = `
    You are a Korean fashion trend analyst.

    Your job is to analyze current fashion trends in South Korea and return ONLY structured JSON using the provided schema.

    Rules:

    1. Return between 8 and 12 fashion style keywords.

    2. Each keyword must represent a fashion STYLE, not a brand or product.

    3. Prefer widely recognized Korean fashion terms.

    4. Never generate duplicate styles.

    5. Use Korean names.

    6. Keep the same naming convention every month.

    7. If a style already exists under another name, always choose the most common Korean spelling.

    8. Each style must include:
    - aliases (REQUIRED: at least one English Latin-alphabet alias, e.g. "Sportism", "Minimalism")
    - category
    - confidence
    - season
    - relatedStyles
    - children

    9. aliases MUST contain at least one English alias using only A-Z, a-z, digits, spaces, or hyphens.
    Keep the same English alias spelling every month for the same style.

    10. children must contain only three categories:
    - tops
    - bottoms
    - shoes

    Each category returns an array of Korean product/item keyword strings.

    Return ONLY valid JSON.
`;

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

  const functionSchema = {
    name: "trend_keyword_collection",
    description: "Generate fashion trend keywords for the current month",
    parameters: {
      type: "object",
      properties: {
        trendKeywords: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Primary Korean fashion style keyword",
              },
              description: {
                type: "string",
                description:
                  "One sentence Korean language description of the fashion trend keyword",
              },
              aliases: {
                type: "array",
                minItems: 1,
                items: { type: "string" },
                description:
                  "Must include at least one English Latin-alphabet alias (A-Z, a-z, digits, spaces, hyphens only), e.g. Sportism. Optional Korean variants may follow.",
              },
              category: {
                type: "string",
                description:
                  "Broad fashion category (e.g. Sports, Street, Casual)",
              },
              confidence: {
                type: "number",
                description: "Confidence score between 0 and 1",
              },
              season: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["SS", "FW"],
                },
                description: "Applicable seasons",
              },
              relatedStyles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    score: {
                      type: "number",
                      description: "Relatedness score between 0 and 1",
                    },
                  },
                  required: ["name", "score"],
                },
              },
              children: {
                type: "object",
                properties: {
                  tops: {
                    type: "array",
                    items: { type: "string" },
                  },
                  bottoms: {
                    type: "array",
                    items: { type: "string" },
                  },
                  shoes: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["tops", "bottoms", "shoes"],
              },
            },
            required: [
              "name",
              "description",
              "aliases",
              "category",
              "confidence",
              "season",
              "relatedStyles",
              "children",
            ],
          },
        },
      },
      required: ["trendKeywords"],
    },
  };

  try {
    // 월별 트랜드 키워드 데이터 수집을 위한 OpenAI 호출
    const trendKeywordResponse: any = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_DOMAIN}/api/recommendOpenAI`,
      {
        method: "POST",
        body: JSON.stringify({
          type: "trend_keyword",
          prompt: {
            systemPrompt: trendKeywordSystemPrompt,
            userPrompt: currentDateUserPrompt,
          },
          functionSchema: functionSchema,
        }),
      }
    );

    const data = await trendKeywordResponse.json();

    if (data.status !== 200) {
      console.error("월별 트랜드 키워드 수집 실패");
      return {
        success: false,
        message: "조회된 월별 트랜드 키워드가 없습니다.",
      };
    }

    if (data.recommend.trendKeywords.length > 0) {
      const trendKeywordRepository = new TrendKeywordRepository();
      const result = await trendKeywordRepository.save(
        data.recommend.trendKeywords
      );

      if (!result.success) {
        console.error("월별 트랜드 키워드 저장 실패", result.err);
        return {
          success: false,
          message:
            "조회된 월별 트랜드 키워드를 DB에 저장하는데 실패하였습니다.",
        };
      }

      return {
        success: true,
        message: "조회된 월별 트랜드 키워드를 DB에 저장 완료하였습니다.",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "월별 트랜드 키워드 수집 실패",
    };
  }
};
