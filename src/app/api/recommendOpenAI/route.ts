import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface surveyForm {
  question: string;
}

export async function POST(req: NextRequest) {
  const body: surveyForm = await req.json();
  const questionCommend: string = body.question;

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openAI.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "너는 스타일링 AI 어시스턴트야. 사용자가 요청한 스타일링에 어울리는 유튜버 1명을 소개시켜주고 유튜버에 대해 간략히 설명해줘. ",
        },
        { role: "user", content: questionCommend },
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
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
                  aiReason: { type: "string" },
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
      function_call: {
        name: "styling_recommendation",
      },
    });

    // 응답 답변 데이터 추출
    const responseAI =
      completion.choices[0].message.function_call?.arguments ?? "{}";

    // 응답 답변 데이터 문자열 JSON 파싱
    const parsed = JSON.parse(responseAI);

    // 추천 컨설턴트(유튜버) 채널 아이디 추출
    const channelId = parsed.content.recommendationYoutuber.channelId;

    const getChannelPath = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

    const channelResponse = await fetch(getChannelPath, {
      method: "GET",
    });
    const channelData = await channelResponse.json();

    const responsePayload = {
      ...parsed,
      content: {
        ...parsed.content,
        recommendationYoutuber: {
          ...parsed.content.recommendationYoutuber,
          channelInfo: {
            channelDesc: channelData.items[0].snippet.description,
            channelThumbnail: channelData.items[0].snippet.thumbnails.high?.url,
            subscriberCount: channelData.items[0].statistics.subscriberCount,
          },
        },
      },
    };

    return NextResponse.json({ recommend: responsePayload, status: 200 });
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
