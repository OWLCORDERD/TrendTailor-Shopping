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
    title: string;
    link: string;
    image: string;
    lprice: string;
    hprice: string;
    mallName: string;
    productId: string;
    productType: string;
    brand: string;
    maker: string;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
  }

  // 대화 세션 메시지 타입 정의
  interface messagesType {
    role: string; // 사용자 & 챗봇 답변 메시지 분류
    message: messageType; // 답변 메시지 json
  }

  interface messageType {
    type: string;
    content: string;
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
