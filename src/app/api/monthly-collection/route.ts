import { NextRequest, NextResponse } from "next/server";
import { generateTrendKeywordJobs } from "@/feature/trend/jobs/generate-keyword.jobs";
import { searchClothesByTrendKeyword } from "@/feature/trend/jobs/collect-clothes.jobs";

interface jobType {
  query: string;
  brand: string;
  style: string;
  category: string;
}

export async function GET(req: NextRequest) {
  // vercel CI에서의 cron 요청 여부 체크 (cron 요청 헤더 및 vercel 환경 체크)
  const isCron = req.headers.get('x-vercel-cron') === '1' || process.env.VERCEL === '1';

  // 2025.12.31: 월별 데이터 수집 전, cron 요청에 대한 비밀 키 검증
  if (!isCron) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    // 첫번째 파이프라인. 현재 날짜 기반 트랜드 키워드 수집
    const generateTrendKeyword = await generateTrendKeywordJobs();

    // 트랜드 키워드 조회 / DB저장 성공 시, 트랜드 키워드별 의류 수집 파이프라인 호출
    if (generateTrendKeyword && generateTrendKeyword.success) {
      const searchClothes = await searchClothesByTrendKeyword();

      // 트랜드 키워드별 의류 수집 성공 시, 성공 응답 반환
      if (searchClothes && searchClothes.success) {
        return NextResponse.json({
          message: '성공적으로 트랜드 키워드 수집 및 의류 데이터 수집 완료하였습니다.',
          status: 200,
        });
      }
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "의류 데이터 수집 중에 오류가 발생하였습니다.",
      },
      { status: 500 }
    );
  }
}
