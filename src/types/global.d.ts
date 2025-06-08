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
}

export {};
