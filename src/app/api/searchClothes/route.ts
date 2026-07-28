import { db } from "@/shared/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface selectType {
  step: number;
  selectLabel: string; // 선택한 답변 레이블
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const type = body.type; // 요청 유형 구분 변수
  // 챗봇 컨설팅 모드 설문 답변 목록
  const selectQAList = body?.select as selectType[];

  // CASE A. 챗봇 컨설팅 모드 > 사용자 컨설팅 추천 의류 필터링 요청 케이스
  if (type === "consulting") {
    const selectType = {
      clothes_type: selectQAList[0].selectLabel ?? "", // 의류 종류
      clothes_style: selectQAList[1].selectLabel ?? "", // 의류 스타일
      gender: selectQAList[2].selectLabel ?? "", // 추천 스타일 대상 성별
      price: selectQAList[3].selectLabel ?? "", // 가격대
      prefer_standard: selectQAList[4].selectLabel ?? "", // 선호 기준
    };

    // 이번달 트랜드 의류 컬렉션 조회
    const collectionRef = collection(db, "clothes");

    const docs = await getDocs(collectionRef);

    if (docs.empty) {
      return NextResponse.json({
        err: "의류 데이터를 불러올 수 없습니다.",
        status: 500,
      });
    }

    try {
      const clothesData: trendClothes[] = [];

      docs.forEach((doc) => {
        const data = doc.data();
        clothesData.push({
          productId: data.productId,
          title: data.title,
          image: data.image,
          link: data.link,
          price: data.price,
          brand: data.brand,
          category: data.category,
          createdAt: data.createdAt,
          viewCount: data.viewCount,
          likeCount: data.likeCount,
          updatedAt: data.updatedAt,
          keywordName: data.keywordName,
          genderCategory: data.genderCategory,
        });
      });

      // 사용자 선택 라벨 -> 각 의류 데이터 종류, 스타일 키워드 매칭 변환
      const selectValueFormatter = (keyword: string) => {
        switch (keyword) {
          case "top":
            return "상의";
          case "bottom":
            return "하의";
          case "outer":
            return "아우터";
          case "minimal":
            return "미니멀";
          case "sportify":
            return "스포츠";
          case "vintage":
            return "빈티지";
          case "street":
            return "스트릿";
          default:
            return "";
        }
      };

      // 1단계: 사용자 선택한 의류 종류 필터링
      const filterByType = clothesData.filter((item) => {
        return (
          item.category === selectValueFormatter(selectType.clothes_type)
        );
      });

      if (filterByType.length === 0) {
        return NextResponse.json({
          err: "선택하신 의류 종류에 맞는 의류가 없습니다.",
          status: 404,
        });
      }

      // 2단계: 사용자 선택한 선호 스타일 필터링
      const filterByStyle = filterByType.filter((item) => {
        return (
          item.keywordName === selectValueFormatter(selectType.clothes_style)
        );
      });

      if (filterByStyle.length === 0) {
        return NextResponse.json({
          err: "선택하신 스타일에 맞는 의류가 없습니다.",
          status: 404,
        });
      }

      // 3단계: 사용자가 선택한 성별 필터링
      let filterByGender;

      // 성별 '모두' 선택하지 않은 경우, 선택한 성별 필터링
      if (selectType.gender !== "default") {
        if (selectType.gender === "male") {
          // 중분류 카테고리 기준 남성/여성패션 필터링
          filterByGender = filterByStyle.filter((item) => {
            return item.genderCategory === "남성의류";
          });
        } else {
          filterByGender = filterByStyle.filter((item) => {
            return item.genderCategory === "여성의류";
          });
        }

        if (filterByGender.length === 0) {
          return NextResponse.json({
            err: "선택하신 성별에 맞는 의류가 없습니다.",
            status: 404,
          });
        }
      } else {
        // 모두 선택한 경우, 필터링 없이 다음 단계 이동
        filterByGender = filterByStyle;
      }

      // 4단계: 사용자가 선택한 가격과 비교하여 의류 필터링
      const priceComparison = filterByGender.filter((item) => {
        const productPrice = item.price

        if (Number(selectType.price) >= productPrice) {
          return item;
        }
      });

      if (priceComparison.length === 0) return;

      switch (selectType.prefer_standard) {
        case "popular":
          // 최종단계: 인기도 좋아요 기준 순으로 내림차순 정렬
          const sortByViewCount = priceComparison.sort(
            (a, b) => b.likeCount - a.likeCount
          );

          return NextResponse.json({
            clothesData: sortByViewCount.slice(0, 10),
            status: 200,
          });
        case "cheap":
          // 최종단계: 가격 낮은 순 상위 정렬
          const sortByLowerPrice = priceComparison.sort(
            (a, b) => a.price - b.price
          );

          return NextResponse.json({
            clothesData: sortByLowerPrice.slice(0, 10),
            status: 200,
          });
      }
    } catch (err) {
      return NextResponse.json({
        err: "의류 데이터 가공 중 오류가 발생했습니다.",
        status: 500,
      });
    }
  }

  // CASE B. 트랜드 의류 키워드 조합 쿼리로 의류 데이터 조회 요청 케이스
  if (type === "search") {
    const searchQuery = body?.query; // 의류 검색 키워드
    const display = body.display ? body.display : 10; // 검색 결과 노출 개수 (기본 10개)
  
    const naverOpenAPI: any = {
      endPoint: "https://openapi.naver.com/v1/search/shop.json",
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
        "X-Naver-Client-Secret":
          process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
      },
    };

    try {
      const searchRequest = await fetch(
        `${naverOpenAPI.endPoint}?query=${searchQuery}&display=${display}`,
        {
          headers: naverOpenAPI.headers,
        }
      );
    
      // 응답 데이터 파싱
      const res = await searchRequest.json();
      const clothesData: clothes[] = res.items; // 응답 객체 items 배열 추출
    
      // 조회 의류 데이터 존재 시, 필드별 title 태그 제거 후 응답 값 반환
      if (clothesData.length > 0) {
        return NextResponse.json({
          status: 200,
          clothesData: clothesData.map((clothes) => {
            return {
              ...clothes,
              title: clothes.title.replace(/<[^>]*>/g, ""),
            }
          })
        });
      } else {
        // 조회된 데이터가 없는 경우
        return NextResponse.json({
          status: 404,
          err: "검색 결과가 없습니다.",
        });
      }
    } catch (err) {
      // 조회 응답 실패 or 과정 중 파싱 오류 발생 시
      return NextResponse.json({
        status: 500,
        err: "검색 결과 조회 중 오류가 발생했습니다.",
      });
    }
  };
}
