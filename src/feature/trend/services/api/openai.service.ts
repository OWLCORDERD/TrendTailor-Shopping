import OpenAI from 'openai';

// 2026.07.19:
// 월별 트랜드 키워드 데이터 수집을 위한 프롬프트

//------------------------- 시스템 프롬프트 -------------------------------------//
// 1. 8개~12개 트랜드 키워드 생성
// 2. 각 키워드는 패션 스타일을 나타내야 함 (브랜드나 제품X)
// 3. 공통된 한국어 명칭 사용
// 4. 중복 키워드 방지
// 5. 매달 동일한 명칭 사용
// 6. 다른 명칭으로 존재하는 경우 가장 일반적인 한국어 명칭 선택
// 7. 각 키워드는 aliases(영문 alias 필수), category, confidence, season, relatedStyles, children 포함
// 8. 하위 카테고리는 상의, 하의, 신발 3가지만 포함
// 9. function call로 정의한 JSON 형식으로 반환
//--------------------------------------------------------------//
// ** 사용자 프롬프트는 동적으로 생성된 문자열로 전달됨 **
const trendKeywordPrompt = {
    systemPrompt: `
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
    `,
    userPrompt: '',
};

export const generateOpenAI = async (userPrompt: string) => {
    if (!userPrompt || userPrompt.trim() === '') {
        return {
            success: false,
            err: "사용자 프롬프트가 비어있습니다.",
        }
    }
    trendKeywordPrompt.userPrompt = userPrompt;

    

    const openAI = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,        
    });

    try {
        // 사용자가 선택한 답변들을 토대로 추천 키워드 추출하기 위한
        // openAI Chat Completion API 호출
        const completion = await openAI.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: trendKeywordPrompt.systemPrompt,
            },
            { role: "user", content: trendKeywordPrompt.userPrompt },
          ],
          temperature: 0.6,
          max_tokens: 1800,
          top_p: 1,
          // 답변을 원하는 JSON 객체 형태로 셋팅 가능한 함수 선언
          functions: [
            {
              name: "trend_keyword_collection",
              description:
                "Generate fashion trend keywords for the current month",
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
            },
          ],
          // 답변 JSON 객체 형태 콜백 함수 선언
          function_call: {
            name: "trend_keyword_collection",
          },
        });
    
        // 응답 답변 데이터 추출
        const recommendInformation =
          completion.choices[0].message.function_call?.arguments ?? "{}";
    
        if (!recommendInformation) {
          return {
            success: false,
            err: "추천 키워드 정보를 불러오지 못했습니다.",
          };
        }
    
        const parsedRecommend = await JSON.parse(recommendInformation);
    
        return { 
            success: true,
            recommend: parsedRecommend, 
        };
      } catch (err) {
        return {
            success: false,
            err: "월별 트랜드 키워드 수집 실패",
        };
      }
}