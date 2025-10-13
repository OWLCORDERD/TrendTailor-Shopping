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
  const body: surveyForm = await req.json();
  const selectQAList: selectType[] = body.selectList;

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }); // OpenAI 생성자 객체 생성

  // 답변 성별 / 연령대 분리
  const genderAge = selectQAList[3].selectLabel.split(", ");

  // (채널 검색어 키워드 추천용) System/User 프롬프트
  const keywordPrompt = {
    systemPrompt: `너는 의류 유튜버 검색에 필요한 키워드를 추천해주는 AI 어시스턴트야.
  사용자가 선택한 아래 답변들을 **검색 키워드 3개로 축약**해서 추천해줘.`,

    userPrompt: `사용자 선택 항목:
  - 스타일 : ${
    selectQAList[1].selectLabel + "한 " + selectQAList[0].selectLabel
  }
  - 계절: ${selectQAList[2].selectLabel}
  - 성별: ${genderAge[0]}
  - 연령대: ${genderAge[1]}
  ${
    selectQAList[4].selectLabel !== "no-brand" &&
    `- 선호 브랜드: ${selectQAList[4].selectLabel}`
  }

  위의 조건들을 반영해서 패션 관련 유튜버를 검색할 수 있는 키워드 최대 3개만 추천해줘.
  스타일, 계절 내용이 하나라도 빠져선 안돼. 그리고 선호 브랜드는 있으면 꼭 포함해야해.
  모든 키워드마다 반드시 ${genderAge[1] + " " + genderAge[0]}이 포함되어야 해.
  키워드는 **searchKeyword 속성**에 배열 형태로 추가해줘야해.
  `,
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
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      // 답변을 원하는 JSON 객체 형태로 셋팅 가능한 함수 선언
      functions: [
        {
          name: "keyword_recommendation",
          description:
            "사용자가 선택한 답변들을 3개의 키워드로 축약하여 JSON으로 반환",
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
                  searchKeyword: {
                    type: "array",
                    items: {
                      type: "string",
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
                  "searchKeyword",
                ],
              },
            },
            required: ["role", "content"],
          },
        },
      ],
      // 답변 JSON 객체 형태 콜백 함수 선언
      function_call: {
        name: "keyword_recommendation",
      },
    });

    // 응답 답변 데이터 추출
    const responseAI =
      completion.choices[0].message.function_call?.arguments ?? "{}";

    // 응답 답변 데이터 문자열 JSON 파싱
    const parsed = JSON.parse(responseAI);

    const searchAPI = "https://www.googleapis.com/youtube/v3/search"; // 채널명 아이디 검색 API
    const channelAPI = "https://www.googleapis.com/youtube/v3/channels"; // 채널 정보 조회 API

    try {
      const searchChannels = [];

      // 추출된 검색 키워드별로 추천 유튜브 채널 검색
      for (const keyword of parsed.content.searchKeyword) {
        const res = await fetch(
          `${searchAPI}?type=channel&q=${keyword}&order=relevance&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );

        const data = await res.json();

        if (data.items && data.items.length > 0) {
          data.items.forEach((item: any) => {
            item.keyword = keyword; // 채널마다 검색 키워드 정보 추가
          });
          searchChannels.push(...data.items);
        }
      }

      if (searchChannels.length === 0) {
        return NextResponse.json({
          status: 404,
          err: "채널을 찾을 수 없습니다.",
        });
      }

      const uniqueChannels = [
        ...new Map(
          searchChannels.map((item) => [item.channelId, item])
        ).values(),
      ];

      // 추천 유튜버 채널 목록
      const recommendChannelList = [];

      // 검색된 채널별 고유 아이디별로 상세 정보 조회하여 저장
      for (const channel of uniqueChannels) {
        const res = await fetch(
          `${channelAPI}?part=snippet,statistics&id=${channel.id.channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );

        const data = await res.json();

        if (data.items && data.items.length > 0) {
          recommendChannelList.push({
            snippet: data.items[0].snippet,
            statistics: data.items[0].statistics,
            keyword: channel.keyword,
          });
        }
      }

      if (recommendChannelList.length === 0) {
        return NextResponse.json({
          status: 404,
          err: "채널 정보를 찾을 수 없습니다.",
        });
      }

      const responsePayload = {
        ...parsed,
        content: {
          ...parsed.content,
          searchKeyword: {
            ...parsed.content.searchKeyword,
          },
          channelList: recommendChannelList,
        },
      };

      return NextResponse.json({ recommend: responsePayload, status: 200 });
    } catch (err) {
      return NextResponse.json({
        status: 404,
        err: `파싱에 실패하였습니다. + ${err}`,
      });
    }
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
