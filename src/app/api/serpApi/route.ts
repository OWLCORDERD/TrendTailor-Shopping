import { db } from "@/shared/lib/firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
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
  } catch (err) {
    return NextResponse.json({ success: false, clothesData: [] });
  }
}
