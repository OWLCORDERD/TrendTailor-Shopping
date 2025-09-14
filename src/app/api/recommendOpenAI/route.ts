import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface surveyForm {
  question: string;
}

export async function POST(req: NextRequest) {
  const body: surveyForm = await req.json(); // 클라이언트에서 전송받은 body 파라미터 파싱
  const questionCommend: string = body.question;

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }); // OpenAI 생성자 객체 생성

  try {
    // Chat Completion API 호출
    const completion = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "너는 스타일링 유튜버 추천 AI 어시스턴트야. 사용자가 요청한 스타일링에 어울리는 유튜버 1명을 소개시켜주고 aiComment 영역에 summary 요약 설명과 함께 reason 추천 이유를 3가지 이상 작성해줘. ",
        },
        { role: "user", content: questionCommend },
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      // 공통 답변 형식에 맞게 가공하는 콜백 함수 호출
      functions: [
        {
          name: "styling_recommendation",
          description: "사용자에게 추천할 스타일링 유튜버 결과를 JSON으로 반환",
          parameters: {
            type: "object",
            properties: {
              role: { type: "string" },
              content: {
                type: "object",
                properties: {
                  stylePurpose: { type: "string" },
                  styleTone: { type: "string" },
                  season: { type: "string" },
                  gender: { type: "string" },
                  bodyType: { type: "string" },
                  preferredBrands: { type: "string" },
                  recommendationYoutuber: {
                    type: "object",
                    properties: {
                      channelName: { type: "string" },
                      channelId: { type: "string" },
                    },
                    required: ["channelName", "channelId"],
                  },
                  aiComment: {
                    type: "object",
                    properties: {
                      summary: { type: "string", maxLength: 50 },
                      reason: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        minItems: 3,
                      },
                    },
                  },
                },
                required: [
                  "stylePurpose",
                  "styleTone",
                  "season",
                  "gender",
                  "bodyType",
                  "preferredBrands",
                  "recommendationYoutuber",
                  "aiReason",
                ],
              },
            },
            required: ["role", "content"],
          },
        },
      ],
      // 콜백 함수 선언
      function_call: {
        name: "styling_recommendation",
      },
    });

    // 응답 답변 데이터 추출
    const responseAI =
      completion.choices[0].message.function_call?.arguments ?? "{}";

    // 응답 답변 데이터 문자열 JSON 파싱
    const parsed = JSON.parse(responseAI);

    // // 추천 컨설턴트(유튜버) 채널 아이디 추출
    const channelName = parsed.content.recommendationYoutuber.channelName;

    const searchAPI = "https://www.googleapis.com/youtube/v3/search"; // 채널명 아이디 검색 API
    const channelAPI = "https://www.googleapis.com/youtube/v3/channels"; // 채널 정보 조회 API

    try {
      const getChannelId = await fetch(
        `${searchAPI}?type=channel&q=${channelName}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );

      const channelId = await getChannelId.json();

      if (!channelId.items || channelId.items.length === 0) {
        return NextResponse.json({ err: "채널을 찾을 수 없습니다." });
      }

      const getChannelData = await fetch(
        `${channelAPI}?part=snippet,statistics&id=${channelId.items[0].id.channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );

      const channelData = await getChannelData.json();

      if (!channelData.items || channelData.items.length === 0) {
        return NextResponse.json({ err: "채널 정보를 찾을 수 없습니다." });
      }

      const responsePayload = {
        ...parsed,
        content: {
          ...parsed.content,
          recommendationYoutuber: {
            ...parsed.content.recommendationYoutuber,
            channelInfo: {
              channelDesc: channelData.items[0].snippet.description,
              channelThumbnail:
                channelData.items[0].snippet.thumbnails.high?.url,
              subscriberCount: channelData.items[0].statistics.subscriberCount,
            },
          },
        },
      };

      return NextResponse.json({ recommend: responsePayload, status: 200 });
    } catch (err) {
      return NextResponse.json({ err: `파싱에 실패하였습니다. + ${err}` });
    }
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
