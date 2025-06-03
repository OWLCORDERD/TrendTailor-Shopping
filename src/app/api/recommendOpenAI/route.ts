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
            "사용자의 질문 텍스트를 받으면 패션 한국 유튜버 목록을 json 형태로 추출해야합니다.",
        },
        { role: "user", content: questionCommend },
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      response_format: { type: "json_object" },
    });

    const recommendData = completion.choices[0].message.content;

    return NextResponse.json({ recommend: recommendData, status: 200 });
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
