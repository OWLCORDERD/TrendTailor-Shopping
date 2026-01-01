declare global {
  interface responseMenuActiveType {
    setResponsiveMenuActive: React.Dispatch<SetStateAction<boolean>>;
  }

  // 뷰포트 리사이징 시 업데이트되는 뷰포트 사이즈 값
  interface windowSize {
    width: number;
    height: number;
  }

  // 유튜브 API에서 받아오는 채널 데이터 타입
  interface channelDataType {
    etag: string;
    id: string;
    kind: string;
    snippet: {
      country: string;
      customUrl: string;
      defaultLanguage: string;
      description: string;
      thumbnails: {
        default: {
          height: number;
          url: string;
          width: number;
        };
        high: {
          height: number;
          url: string;
          width: number;
        };
        medium: {
          height: number;
          url: string;
          width: number;
        };
      };
      title: string;
      publishedAt: string;
    };
  }

  interface consultantChannelType {
    snippet: {
      title: string;
      description: string;
      customUrl: string;
      thumbnails: {
        default: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        high: { url: string; width: number; height: number };
      };
      localized: { title: string; description: string };
    };
    statistics: {
      viewCount: string;
      subscriberCount: string;
      hiddenSubscriberCount: boolean;
      videoCount: string;
    };
    keyword: string;
  }

  // 유튜브 API에서 받아오는 비디오 데이터 타입
  interface videoType {
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      channelId: string;
      channelTitle: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      title: string;
    };
  }

  // 네이버 쇼핑 API 의류 데이터 타입
  interface clothes {
    doc_id: string;
    title: string;
    link: string;
    image: string;
    lprice: string;
    hprice?: string;
    mallName: string;
    productId: string;
    productType: string;
    brand: string;
    maker: string;
    category1?: string;
    category2?: string;
    category3?: string;
    category4?: string;
    viewCount: number; // 조회 수 (인기 순 필터링에 활용)
    likeCount: number; // 좋아요 수 (인기 순 필터링에 활용)
    collectedAt: string; // 추천 일시
    searchStyle: string; // 검색 스타일 키워드
    searchCategory: string; // 검색 카테고리 키워드
  }

  // 대화 세션 메시지 타입 정의
  interface messagesType {
    role: string; // 사용자 & 챗봇 답변 메시지 분류
    message: messageType; // 답변 메시지 json
  }

  interface messageType {
    type: string;
    content: any; // 질문 타입은 questionType, 챗봇 답변은 string
  }

  interface questionType {
    title: string; // 질문 제목
    step: number; // 현 질문 단계
    placeholder: string; // 답변 직접입력 플레이스홀더
    options: defaultOptions[]; // 선택 가능한 옵션 목록
  }

  interface defaultOptions {
    label: string; // 옵션
    // 레이블
    value: string; // 옵션 값
  }

  interface genderBodyOption {
    gender: [
      {
        label: string; // 성별 레이블
        value: string; // 성별 값
      }
    ];
    body: [
      {
        label: string; // 체형 레이블
        value: string; // 체형 값
      }
    ];
  }

  interface bodyGenderSelect {
    gender: {
      label: string; // 성별 레이블
    };
    body: {
      label: string; // 체형 레이블
    };
  }

  // 추천 의류 아이템 타입
  interface recommendItem {
    itemType: string;
    productName: string;
    brand: string;
    price: number;
    imageUrl: string;
    purchaseUrl: string;
  }

  // 결과 답변 타입
  interface assistantAnswerType {
    stylePurpose: string; // 스타일 목적
    styleTone: string[]; // 스타일 톤은 여러개 선택 가능
    season: string; // 계절
    // 예시: "봄", "여름", "가을", "겨울", "간절기"
    gender: string; // 성별
    bodyType: string; // 체형
    budget: string; // 가격대
    preferredBrands: string[]; // 선호 브랜드는 여러개 선택 가능
    recommendations: recommendItem[]; // 추천 아이템 목록
    aiComment: string; // 챗봇 멘트
  }
}

export {};
