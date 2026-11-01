import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 2026.10.25: 월별 트렌드 키워드 생성(약 4000 토큰 응답)은 기본 실행 시간(10초)을 넘길 수 있어 상향
// Vercel Hobby 플랜 상한은 Fluid compute 설정에 따라 다르므로 프로젝트 설정에서 확인 필요
export const maxDuration = 60;

interface createOptionsType {
  model: string;
  messages: any[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  functions?: any[];
  function_call?: {
    name: string;
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // 1. OpenAI Chat Completion API 호출 답변 유형 (함수형 스키마 or SSE 스트리밍)
  const type: string = body.type;
  // 2. OpenAI Chat Completion API 호출 옵션 정보
  const options: createOptionsType = body.options;

  // 프롬프트가 없는 경우 오류 반환 후 종료
  if (!options || !options.model || !options.messages) {
    return NextResponse.json({
      status: 400,
      err: '요청할 OpenAI Chat Completion API 옵션 정보가 없습니다.',
    });
  }

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }); // OpenAI 생성자 객체 생성

  try {
    // 사용자가 선택한 답변들을 토대로 추천 키워드 추출하기 위한
    // openAI Chat Completion API 호출
    const completion = await openAI.chat.completions.create(options);

    if (type === 'function_call') {
      // 응답 답변 데이터 추출
      const recommendInformation =
        completion.choices[0].message.function_call?.arguments ?? '{}';

      if (!recommendInformation) {
        return NextResponse.json({
          status: 404,
          err: 'OpenAI Chat Completion API 호출 중 오류가 발생했습니다.',
        });
      }

      const parsedRecommend = await JSON.parse(recommendInformation);

      return NextResponse.json({ recommend: parsedRecommend, status: 200 });
    }
  } catch (err) {
    return NextResponse.error();
  }
}
