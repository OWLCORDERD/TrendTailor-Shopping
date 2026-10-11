interface openAIPromptType {
  systemPrompt: string; // 시스템 프롬프트
  userPrompt: string; // 사용자 프롬프트
  functionSchemaYn?: boolean; //  함수 스키마 사용 여부 (기본값: false)
  functionSchema?: any; // 함수 스키마
}

export const generateOpenAI = async (
  prompt: openAIPromptType = {
    systemPrompt: '',
    userPrompt: '',
    functionSchemaYn: false,
    functionSchema: null,
  }
) => {
  // 시스템, 사용자 프롬프트 중 하나라도 비어있을 경우
  if (
    !prompt.userPrompt ||
    prompt.userPrompt.trim() === '' ||
    !prompt.systemPrompt ||
    prompt.systemPrompt.trim() === ''
  ) {
    return {
      success: false,
      err: 'OPEN AI API 요청 프롬프트가 비어있습니다.',
    };
  }

  try {
    // openAI Chat Completion API 생성 파라미터 초기 설정 값
    const createOptions: any = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: prompt.systemPrompt,
        },
        { role: 'user', content: prompt.userPrompt },
      ],
      temperature: 0.6,
      max_tokens: 1800,
      top_p: 1,
    };

    // CASE1. 함수 스키마 사용 여부 체크
    // - 원하는 JSON 객체 형태로 답변 가능한 LLM 함수 스키마 선언
    if (prompt.functionSchemaYn) {
      createOptions.functions = prompt.functionSchema;
      // 답변 JSON 객체 형태 콜백 함수 선언
      createOptions.function_call = {
        name: 'trend_keyword_collection',
      };
    }

    // 사용자가 선택한 답변들을 토대로 추천 키워드 추출하기 위한
    // openAI Chat Completion API 호출
    const generateOpenAIResponse = await fetch('/api/recommendOpenAI', {
      method: 'POST',
      body: JSON.stringify({
        type: prompt.functionSchemaYn ? 'function_call' : 'streaming',
        options: createOptions,
      }),
    });

    if (generateOpenAIResponse.status !== 200) {
      return {
        success: false,
        err: '추천 키워드 정보를 불러오지 못했습니다.',
      };
    }

    const parsedRecommend = await generateOpenAIResponse.json();

    return {
      success: true,
      recommend: parsedRecommend.recommend,
    };
  } catch (err) {
    return {
      success: false,
      err: '월별 트랜드 키워드 수집 실패',
    };
  }
};
