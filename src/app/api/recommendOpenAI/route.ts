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
    // const completion = await openAI.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "사용자의 질문 텍스트를 받으면 패션 한국 유튜버 목록을 json 형태로 추출해야합니다.",
    //     },
    //     { role: "user", content: questionCommend },
    //   ],
    //   temperature: 0.5,
    //   max_tokens: 256,
    //   top_p: 1,
    //   response_format: { type: "json_object" },
    // });

    // const recommendData = completion.choices[0].message.content;

    const assistantData = await new Promise((resolve, reject) => {
      const data = {
        role: "assistant",
        content: {
          stylePurpose: "데이트룩",
          styleTone: ["페미닌", "클래식"],
          season: "간절기",
          gender: "여성",
          bodyType: "보통",
          budget: "6만원 이하",
          preferredBrands: ["W Concept"],
          recommendationType: "전체 스타일링",
          recommendations: [
            {
              itemType: "상의",
              productName: "퍼프 소매 블라우스",
              brand: "Studio Tomboy",
              price: 52000,
              imageUrl: "https://example.com/image1.jpg",
              purchaseUrl: "https://example.com/product1",
            },
            {
              itemType: "하의",
              productName: "하이웨이스트 슬랙스",
              brand: "앤더슨벨",
              price: 59000,
              imageUrl: "https://example.com/image2.jpg",
              purchaseUrl: "https://example.com/product2",
            },
            {
              itemType: "신발",
              productName: "로퍼 스타일 구두",
              brand: "YUSE",
              price: 64000,
              imageUrl: "https://example.com/image3.jpg",
              purchaseUrl: "https://example.com/product3",
            },
          ],
          aiComment:
            "페미닌하고 클래식한 무드로 출근이나 데이트에 잘 어울리는 간절기 룩이에요. 퍼프 소매 블라우스와 슬랙스 조합은 단정하면서도 여성스러운 느낌을 줍니다. W Concept 기준으로 추천했어요.",
        },
      };

      resolve(data);
    });

    return NextResponse.json({ recommend: assistantData, status: 200 });
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
