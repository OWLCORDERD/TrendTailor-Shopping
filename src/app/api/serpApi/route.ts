import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getJson } from "serpapi";

// serpApi getJson 요청 payload 필드 타입
interface serpApiPayloadType {
  engine: string;
  q: string;
  location: string;
  hl: string;
  gl: string;
  api_key: string;
}

export async function GET(req: NextRequest) {
  // 2026.10.25: 클라이언트(관리자 마이홈)에서 수집 파이프라인을 호출하므로
  // SerpApi 월 검색 한도 보호를 위해 서버에서 관리자 세션을 다시 검증
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token?.role !== 'admin') {
    return NextResponse.json({ success: false, message: '관리자 권한이 필요합니다.' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const keywordQuery = searchParams.get('q') ?? '';
  const serpApiKey = process.env.SERPAPI_KEY ?? '';

  if (keywordQuery === '' || serpApiKey === '') {
    return NextResponse.json({ success: false, message: '키워드 검색 쿼리 또는 SerpApi 키는 필수입니다.' }, { status: 400 });
  }

  const payload: serpApiPayloadType = {
    engine: 'google_shopping',
    q: keywordQuery,
    location: 'South Korea',
    hl: 'en',
    gl: 'kr',
    api_key: serpApiKey,
  }

  try {
    const response = await getJson(payload);

    // 구글 쇼핑 검색 엔진 결과 값 존재 시 성공 응답
    if (response['shopping_results']) {
      return NextResponse.json({ success: true, clothesData: response.shopping_results });
    }

    // 검색 결과가 없는 경우에도 응답 반환 (미반환 시 라우트 핸들러 오류)
    return NextResponse.json({ success: true, clothesData: [] });
  } catch (err) {
    return NextResponse.json({ success: false, clothesData: [] });
  }
}
