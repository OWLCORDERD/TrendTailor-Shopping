import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface promptType {
  systemPrompt: string;
  userPrompt: string;
}

export async function POST(req: NextRequest) {
  // 클라이언트 상태관리에서 전달받은 답변 선택 배열 값 파싱
  const body = await req.json();
  const type: string = body.type; // 요청 타입 (consulting, keyword)
  const prompt: promptType = body.prompt;
  const functionSchema: any = body.functionSchema;

  // 프롬프트가 없는 경우 오류 반환 후 종료
  if (!prompt || !prompt.systemPrompt || !prompt.userPrompt) {
    return NextResponse.json({
      status: 400,
      err: "요청할 프롬프트 정보가 없습니다.",
    });
  }

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }); // OpenAI 생성자 객체 생성

  const defaultOptions: any = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: prompt.systemPrompt,
      },
      { role: "user", content: prompt.userPrompt },
    ],
    temperature: 0.6,
    max_tokens: 1800,
    top_p: 1,
  };

  
  // 전체 의류 데이터 중, 필터링된 컨설팅 트랜드 의류 필드별 추천 데이터 객체화 추출
  if (type === "consulting") {
    // function calling 스키마 넘겨받은 케이스에 따라 옵션 셋팅
    if (functionSchema) {
      defaultOptions.functions = [functionSchema];
      defaultOptions.function_call = {
        name: "keyword_recommendation",
      };
    }

    try {
      // 사용자가 선택한 답변들을 토대로 추천 키워드 추출하기 위한
      // openAI Chat Completion API 호출
      const completion = await openAI.chat.completions.create({
        ...defaultOptions,
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
      return NextResponse.error();
    }
  } else if (type === "trend_keyword") {
    // function calling 스키마 넘겨받은 케이스에 따라 옵션 셋팅
    if (functionSchema) {
      defaultOptions.functions = [functionSchema];
      defaultOptions.function_call = {
        name: "trend_keyword_collection",
      };
    }

    try {
      // 월별 트랜드 키워드 데이터 수집을 위한
      // openAI Chat Completion API 호출
      const completion = await openAI.chat.completions.create({
        ...defaultOptions,
      });
  
      // 응답 답변 데이터 추출
      const recommendInformation =
        completion.choices[0].message.function_call?.arguments ?? "{}";
  
      if (!recommendInformation) {
        return NextResponse.json({
          status: 404,
          err: "월별 트랜드 키워드 데이터 수집 실패",
        });
      }
  
      const trendKeywords = await JSON.parse(recommendInformation);
  
      return NextResponse.json({ recommend: trendKeywords, status: 200 });
    } catch (err) {
      return NextResponse.error();
    }
  }
}
