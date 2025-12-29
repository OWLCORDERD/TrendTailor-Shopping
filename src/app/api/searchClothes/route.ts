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
  const searchQuery = body?.query; // 의류 검색 키워드
  const display = body?.display; // 검색 결과 노출 개수

  // 네이버 쇼핑 검색 Open API 기본 URL
  const baseURL = "https://openapi.naver.com/v1/search/shop.json";

  const naverOpenAPIHeaders: any = {
    "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
  };

  // 2025.12.29: 챗봇 컨설팅 모드에서 요청한 케이스
  if (type === "consulting") {
    try {
      const gender = selectQAList[3].selectLabel === 'female' ? '여성' : '남성';
      const standard = selectQAList[0].selectLabel; // 사용자가 선택한 기준

      // (브랜드 기준 선택 큐레이션) 각 스타일별 브랜드 화이트리스트
      const BRAND_WHITELIST: any = {
        office: [
          '무신사 스탠다드',
          'LAFUDGESTORE',
          '폴로 랄프로렌'
        ],
        sports: [
          '나이키',
          '아디다스',
          '뉴발란스',
        ],
        street: [
          'COVERNAT',
          '디스이즈네버댓',
          'LMC'
        ],
        minimal: [
          'ZARA',
          '무신사 스탠다드',
          'cos',
        ],
        casual: [
          'H&M',
          'UNIQLO',
          'SPAO',
        ],
      };

      // 최종 데이터 배열
      let totalData = [];

      switch (standard) {
        case "popular":
          // 현재 사용자가 선택한 스타일의 브랜드 화이트리스트 목록 조회
          const brandList: any = BRAND_WHITELIST[selectQAList[2].selectLabel];

          console.log(brandList);
          // 브랜드마다 100개씩 데이터 조회
          for (let i = 0; i < brandList.length; i++) {
            // 검색 키워드 [브랜드 + 성별 + 종류]
            const keyword = brandList[i] + " " + gender + " " + selectQAList[1].selectLabel;
            const searchRequest = await fetch(
              `${baseURL}?query=${keyword}&display=100`,
              {
                headers: naverOpenAPIHeaders,
              }
            );
            const res = await searchRequest.json();
            totalData.push(...res.items);
          }

          // 사용자가 선택한 가격과 비교하여 의류 필터링
          const brandPriceComparison = totalData.filter((item) => {
            const productPrice = item.hprice
              ? parseInt(item.hprice)
              : parseInt(item.lprice);
    
            if (Number(price) >= productPrice) {
              return item;
            }
          });
          // 브랜드 없는 의류 필터링
          totalData = brandPriceComparison.filter((item) => item.brand !== '');
          break;
        case "cheap":
          // [성별 + 스타일 + 종류] 검색 카테고리 조합 문자열
          const category =
          gender +
          " " +
          selectQAList[2].selectLabel +
          " " +
          selectQAList[1].selectLabel;

          // 조회 페이지네이션 시작 위치값
          let start = 1;

          // 총 노출 개수에 따른 반복 요청 횟수
          const displayCount = Math.floor(display / 100);

          const price = selectQAList[4].selectLabel; // 사용자가 선택한 가격대
          for (let i = 0; i < displayCount; i++) {
            const searchRequest = await fetch(
              `${baseURL}?query=${category}&display=100&start=${start}`,
              {
                headers: naverOpenAPIHeaders,
              }
            );
    
            const res = await searchRequest.json();
            totalData.push(...res.items);
            start += 100;
          }
    
          // 사용자가 선택한 가격과 비교하여 의류 필터링
          const priceComparison = totalData.filter((item) => {
            const productPrice = item.hprice
              ? parseInt(item.hprice)
              : parseInt(item.lprice);
    
            if (Number(price) >= productPrice) {
              return item;
            }
          });

          // 가격 낮은 순 상위 정렬
          totalData = priceComparison.sort((a, b) => a.lprice - b.lprice);
          break;
      }

      return NextResponse.json({
        clothesData: totalData,
        status: 200,
      });
    } catch (err) {
      return NextResponse.json({
        err: "의류 검색 중 오류가 발생했습니다.",
        status: 500,
      });
    }
  }
}
