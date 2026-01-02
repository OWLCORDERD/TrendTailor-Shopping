import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { MONTHLY_TREND } from "@/data/MONTHLY_TREND";

interface jobType {
  query: string;
  brand: string;
  style: string;
  category: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const secretKey = searchParams.get("secret");

  // 2025.12.31: 월별 데이터 수집 전, cron 요청에 대한 비밀 키 검증
  if (secretKey !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    // 월간 트랜드 의류 데이터 저장소 DB 컬렉션 조회
    const collectionRef = collection(db, "clothes");

    const naverOpenAPI: any = {
      endPoint: "https://openapi.naver.com/v1/search/shop.json",
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
        "X-Naver-Client-Secret":
          process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
      },
    };

    // 스타일 키워드 한글 번역 변환
    const styleKeyword = (style: string) => {
      switch (style) {
        case "VINTAGE":
          return "빈티지";
        case "OFFICE":
          return "오피스";
        case "SPORTIFY":
          return "스포츠";
        case "STREET":
          return "스트릿";
        case "MINIMAL":
          return "미니멀";
        default:
          return "";
      }
    };

    const trendKeywords: jobType[] = []; // 네이버 쇼핑 API에 조회할 키워드 저장소
    const failedTrendKeywords: jobType[] = []; // 조회 실패한 키워드 저장소

    const getClothesNaverAPI = async (job: jobType) => {
      const searchRequest = await fetch(
        `${naverOpenAPI.endPoint}?query=${job.query}&display=30`,
        {
          headers: naverOpenAPI.headers,
        }
      );

      // 응답 데이터 파싱
      const res = await searchRequest.json();
      const clothesData: any = res.items; // 응답 객체 items 배열 추출

      // 조회 의류 데이터들을 파이어베이스 collection ref 문서들로 저장
      if (clothesData.length > 0) {
        /* Naver Open API 응답 값 가공
              1. title 속성 문자열 값에 포함된 태그 제거
              2. viewCount,  */
        clothesData.forEach(async (clothes: any) => {
          // 조회된 데이터에 조회성 컬럼 추가한 convert 객체로 저장
          await addDoc(collectionRef, {
            title: clothes.title.replace(/<[^>]*>/g, ""),
            link: clothes.link,
            image: clothes.image,
            lprice: clothes.lprice,
            hprice: clothes.hprice,
            mallName: clothes.mallName,
            productId: clothes.productId,
            productType: clothes.productType,
            brand: clothes.brand,
            maker: clothes.maker,
            category1: clothes.category1,
            category2: clothes.category2,
            category3: clothes.category3,
            category4: clothes.category4,
            viewCount: 0,
            likeCount: 0,
            collectedAt: MONTHLY_TREND.collectedAt,
            searchStyle: job.style,
            searchCategory: job.category,
          });
        });

        return true;
      } else {
        return false;
      }
    };

    const sleep = (ms: number) => {
      return new Promise((res) => setTimeout(res, ms));
    };

    MONTHLY_TREND.styles.forEach((item) => {
      item.brands.forEach((brand) => {
        item.categories.forEach(async (category) => {
          trendKeywords.push({
            query: `${brand}-${styleKeyword(item.style)}-${category}`,
            brand: brand,
            style: styleKeyword(item.style),
            category: category,
          });
        });
      });
    });

    const saveFailedJob = async (job: jobType) => {
      failedTrendKeywords.push(job);
    };

    // 수집된 트랜드 키워드들로 **1차 조회**
    for (const job of trendKeywords) {
      try {
        await sleep(500); // 500ms 간격으로 대기 텀을 두며 조회
        await getClothesNaverAPI(job);
      } catch (err) {
        // 재시도를 위한 실패 키워드들 저장
        await saveFailedJob(job);
      }
    }

    // 재시도 키워드들을 기반으로 **2차 재조회**
    for (const failedJob of failedTrendKeywords) {
      // 재시도는 Rate Limit exceed를 예측하여 5초 간격으로 대기 텀을 두며 조회
      await sleep(5000);
      await getClothesNaverAPI(failedJob);
    }

    return NextResponse.json({
      failedKeywords: failedTrendKeywords,
      message: "성공적으로 데이터베이스에 저장 완료하였습니다.",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "의류 데이터 수집 중에 오류가 발생하였습니다.",
      },
      { status: 500 }
    );
  }
}
