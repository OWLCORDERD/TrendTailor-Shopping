import { db } from '@/shared/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

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
  // **(2026.08.19.) 의류 데이터 수집 파이프라인 (네이버 Open API -> serpApi 개선)**
  // DB 저장 스키마 형태 변경으로 인한 컨설팅 챗봇 의류 필터링 모드 개선 예정
  // if (type === "consulting") {
  //   const selectType = {
  //     clothes_type: selectQAList[0].selectLabel ?? "", // 의류 종류
  //     clothes_style: selectQAList[1].selectLabel ?? "", // 의류 스타일
  //     gender: selectQAList[2].selectLabel ?? "", // 추천 스타일 대상 성별
  //     price: selectQAList[3].selectLabel ?? "", // 가격대
  //     prefer_standard: selectQAList[4].selectLabel ?? "", // 선호 기준
  //   };

  //   // 이번달 트랜드 의류 컬렉션 조회
  //   const collectionRef = collection(db, "clothes");

  //   const docs = await getDocs(collectionRef);

  //   if (docs.empty) {
  //     return NextResponse.json({
  //       err: "의류 데이터를 불러올 수 없습니다.",
  //       status: 500,
  //     });
  //   }

  //   try {
  //     const clothesData: trendClothes[] = [];

  //     docs.forEach((doc) => {
  //       const data = doc.data();
  //       clothesData.push({
  //         ...data,
  //       } as trendClothes);
  //     });

  //     // 사용자 선택 라벨 -> 각 의류 데이터 종류, 스타일 키워드 매칭 변환
  //     const selectValueFormatter = (keyword: string) => {
  //       switch (keyword) {
  //         case "top":
  //           return "상의";
  //         case "bottom":
  //           return "하의";
  //         case "outer":
  //           return "아우터";
  //         case "minimal":
  //           return "미니멀";
  //         case "sportify":
  //           return "스포츠";
  //         case "vintage":
  //           return "빈티지";
  //         case "street":
  //           return "스트릿";
  //         default:
  //           return "";
  //       }
  //     };

  //     // 1단계: 사용자 선택한 의류 종류 필터링
  //     const filterByType = clothesData.filter((item) => {
  //       return (
  //         item.category === selectValueFormatter(selectType.clothes_type)
  //       );
  //     });

  //     if (filterByType.length === 0) {
  //       return NextResponse.json({
  //         err: "선택하신 의류 종류에 맞는 의류가 없습니다.",
  //         status: 404,
  //       });
  //     }

  //     // 2단계: 사용자 선택한 선호 스타일 필터링
  //     const filterByStyle = filterByType.filter((item) => {
  //       return (
  //         item.keywordName === selectValueFormatter(selectType.clothes_style)
  //       );
  //     });

  //     if (filterByStyle.length === 0) {
  //       return NextResponse.json({
  //         err: "선택하신 스타일에 맞는 의류가 없습니다.",
  //         status: 404,
  //       });
  //     }

  //     // 3단계: 사용자가 선택한 성별 필터링
  //     let filterByGender;

  //     // 성별 '모두' 선택하지 않은 경우, 선택한 성별 필터링
  //     if (selectType.gender !== "default") {
  //       if (selectType.gender === "male") {
  //         // 중분류 카테고리 기준 남성/여성패션 필터링
  //         filterByGender = filterByStyle.filter((item) => {
  //           return item.genderCategory === "남성의류";
  //         });
  //       } else {
  //         filterByGender = filterByStyle.filter((item) => {
  //           return item.genderCategory === "여성의류";
  //         });
  //       }

  //       if (filterByGender.length === 0) {
  //         return NextResponse.json({
  //           err: "선택하신 성별에 맞는 의류가 없습니다.",
  //           status: 404,
  //         });
  //       }
  //     } else {
  //       // 모두 선택한 경우, 필터링 없이 다음 단계 이동
  //       filterByGender = filterByStyle;
  //     }

  //     // 4단계: 사용자가 선택한 가격과 비교하여 의류 필터링
  //     const priceComparison = filterByGender.filter((item) => {
  //       const productPrice = item.price

  //       if (Number(selectType.price) >= productPrice) {
  //         return item;
  //       }
  //     });

  //     if (priceComparison.length === 0) return;

  //     switch (selectType.prefer_standard) {
  //       case "popular":
  //         // 최종단계: 인기도 좋아요 기준 순으로 내림차순 정렬
  //         const sortByViewCount = priceComparison.sort(
  //           (a, b) => b.reviews - a.reviews
  //         );

  //         return NextResponse.json({
  //           clothesData: sortByViewCount.slice(0, 10),
  //           status: 200,
  //         });
  //       case "cheap":
  //         // 최종단계: 가격 낮은 순 상위 정렬
  //         const sortByLowerPrice = priceComparison.sort(
  //           (a, b) => a.price - b.price
  //         );

  //         return NextResponse.json({
  //           clothesData: sortByLowerPrice.slice(0, 10),
  //           status: 200,
  //         });
  //     }
  //   } catch (err) {
  //     return NextResponse.json({
  //       err: "의류 데이터 가공 중 오류가 발생했습니다.",
  //       status: 500,
  //     });
  //   }
  // }

  return NextResponse.json(
    {
      status: 400,
      err: '지원하지 않는 요청 유형입니다.',
    },
    { status: 400 }
  );
}
