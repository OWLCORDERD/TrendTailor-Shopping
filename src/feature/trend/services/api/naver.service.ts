const NAVER_SHOP_ENDPOINT = "https://openapi.naver.com/v1/search/shop.json";

type NaverSearchSuccess = {
  success: true;
  clothesData: clothes[];
};

type NaverSearchFailure = {
  success: false;
  status: number;
  err: string;
};

export type NaverSearchResult = NaverSearchSuccess | NaverSearchFailure;

/**
 * 네이버 쇼핑 검색 Open API 호출
 * - 서버 사이드에서만 사용 (Client ID / Secret 필요)
 */
export const searchNaverShop = async (
  query: string,
  display: number = 10
): Promise<NaverSearchResult> => {
  const clientId = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      success: false,
      status: 500,
      err: "네이버 Open API 인증 정보가 설정되지 않았습니다.",
    };
  }

  if (!query || !query.trim()) {
    return {
      success: false,
      status: 400,
      err: "검색 쿼리가 비어있습니다.",
    };
  }

  const safeDisplay = Math.min(Math.max(Number(display) || 10, 1), 100);
  const url = new URL(NAVER_SHOP_ENDPOINT);
  url.searchParams.set("query", query.trim());
  url.searchParams.set("display", String(safeDisplay));
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": clientId.trim(),
        "X-Naver-Client-Secret": clientSecret.trim(),
      },
      cache: "no-store",
    });

    const res = await response.json();

    if (!response.ok) {
      console.error("[Naver Shop API Error]", {
        pathname: url.pathname,
        httpStatus: response.status,
        errorCode: res?.errorCode,
        errorMessage: res?.errorMessage,
        query: query.trim(),
      });

      return {
        success: false,
        status: response.status,
        err:
          res?.errorMessage ||
          res?.errorCode ||
          `네이버 Open API 요청 실패 (HTTP ${response.status})`,
      };
    }

    const clothesData: clothes[] = Array.isArray(res.items) ? res.items : [];

    if (clothesData.length === 0) {
      return {
        success: false,
        status: 404,
        err: "검색 결과가 없습니다.",
      };
    }

    return {
      success: true,
      clothesData: clothesData.map((item) => ({
        ...item,
        title: item.title.replace(/<[^>]*>/g, ""),
      })),
    };
  } catch (err) {
    console.error("네이버 쇼핑 검색 중 오류:", err);
    return {
      success: false,
      status: 500,
      err: "검색 결과 조회 중 오류가 발생했습니다.",
    };
  }
};
