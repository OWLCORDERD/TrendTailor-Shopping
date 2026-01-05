import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface surveyForm {
  selectList: selectType[]; // 선택한 답변 리스트
}

interface selectType {
  step: number;
  selectLabel: string; // 선택한 답변 레이블
}

export async function POST(req: NextRequest) {
  // 클라이언트 상태관리에서 전달받은 답변 선택 배열 값 파싱
  const body = await req.json();
  const selectClothes: clothes[] = body.selectClothes;

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }); // OpenAI 생성자 객체 생성

  // (채널 검색어 키워드 추천용) System/User 프롬프트
  const keywordPrompt = {
    systemPrompt: `You are a professional fashion store staff
    
    Rules:
    - Only use the provided product information
    - Do not invent materials or technical details
    - Keep explanations natural and concise
    - Focus on mood, usage, and styling
    - Respond only using the provided function schema`,

    userPrompt: `For each product below:

1. Infer key fashion characteristics from the title, brand, category, and style
2. Introduce the product naturally as a clothing store staff
3. Keep it concise and practical

products: ${JSON.stringify(selectClothes)}`,
  };

  try {
    // 사용자가 선택한 답변들을 토대로 추천 키워드 추출하기 위한
    // openAI Chat Completion API 호출
    const completion = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: keywordPrompt.systemPrompt,
        },
        { role: "user", content: keywordPrompt.userPrompt },
      ],
      temperature: 0.6,
      max_tokens: 1800,
      top_p: 1,
      // 답변을 원하는 JSON 객체 형태로 셋팅 가능한 함수 선언
      functions: [
        {
          name: "keyword_recommendation",
          description:
            "Generate fashion staff style descriptions for multiple clothing products",
          parameters: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    productId: { type: "string" },
                    summary: {
                      type: "string",
                      description:
                        "One sentence summary as a clothing store staff",
                    },
                    keyPoints: {
                      type: "array",
                      items: { type: "string" },
                      description: "2~3 key selling points",
                    },
                    stylingTip: {
                      type: "string",
                      description: "Simple styling suggestion",
                    },
                  },
                  required: [
                    "productId",
                    "summary",
                    "keyPoints",
                    "stylingTip",
                  ],
                },
              },
            },
            required: ["products"],
          },
        },
      ],
      // 답변 JSON 객체 형태 콜백 함수 선언
      function_call: {
        name: "keyword_recommendation",
      },
    });

    // 응답 답변 데이터 추출
    const recommendInformation =
      completion.choices[0].message.function_call?.arguments ?? "{}";

    if (!recommendInformation) {
      return NextResponse.json({
        status: 404,
        err: "추천 키워드 정보를 불러오지 못했습니다.",
      });
    }

    const parsedRecommend = await JSON.parse(recommendInformation);

    return NextResponse.json({ recommend: parsedRecommend, status: 200 });
  } catch (err) {
    return NextResponse.json({
      status: 404,
      err: `파싱에 실패하였습니다. + ${err}`,
    });
  }
}
