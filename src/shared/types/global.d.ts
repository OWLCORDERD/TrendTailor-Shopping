declare global {
  interface responseMenuActiveType {
    setResponsiveMenuActive: React.Dispatch<SetStateAction<boolean>>;
  }

  // ---------------커스텀 훅 타입 지정---------------//
  // 뷰포트 리사이징 시 업데이트되는 뷰포트 사이즈 값
  interface windowSize {
    width: number;
    height: number;
  }

  // ---------------API 응답 타입 지정---------------//

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

  // 컨설턴트 채널 데이터 타입
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

  // SerpApi 구글 쇼핑 검색엔진 API 조회 의류 타입
  interface SerpApiClothes {
    title: string; // 상품명
    product_id: string; // 상품 아이디
    product_link: string; // 상품 링크
    source: string; // 브랜드명
    source_icon: string; // 브랜드 아이콘
    thumbnail: string; // 상품 이미지
    price: string; // 상품 가격
    rating?: number; // 상품 공식 평점
    reviews?: number; // 상품 리뷰 수
    subCategory: 'tops' | 'bottoms' | 'shoes'; // 검색 카테고리 (상의/하의/신발)
  }

  // 트랜드 키워드 검색 의류 데이터 타입
  interface trendClothes {
    title: string; // 의류 제목
    productId: string; // 상품 ID
    thumbnail: string; // 상품 썸네일 이미지 경로
    link: string; // 상품 판매 경로
    price: number; // 가격
    brand: string; // 브랜드명
    brandIcon: string; // 브랜드 아이콘 경로
    category: string; // 검색 카테고리 (상의/하의/신발)
    keywordName: string; // 검색 트랜드 키워드명
    rating: number; // 공식 평점 (인기 순 필터링에 활용)
    reviews: number; // 공식 리뷰 수 (인기 순 필터링에 활용)
    createdAt: string; // 생성 일시
    updatedAt: string; // 수정 일시
  }

  interface trendNode {
    id: string;
    name: string;
    aliases: string[];
    category: string;
    val: number;
    confidence: number;
    season: string[];
    itemCounts: {
      tops: number;
      bottoms: number;
      shoes: number;
      totalCount: number;
    };
  }

  interface trendGraphStats {
    nodes: trendNode[];
    links: {
      source: string;
      target: string;
      value: number;
      commonKeywords: string[];
    };
    totalKeywords: number;
    totalClothes: number;
    updatedAt: Date;
  }

  interface recommendClothes {
    productId: string;
    summary: string;
    keyPoints: string[];
    stylingTip: string;
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
