import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/firebase';
import { ref } from "firebase/storage";
import { collection } from "firebase/firestore";
import { MONTHLY_TREND } from "@/data/MONTHLY_TREND";

export default async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const secretKey = searchParams.get("secret");

    // 2025.12.31: 월별 데이터 수집 전, cron 요청에 대한 비밀 키 검증
    if (secretKey !== process.env.CRON_SECRET_KEY) {
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: 401 })
    }

    try {
        // 월간 트랜드 의류 데이터 저장소 DB 컬렉션 조회
        const collectionRef = collection(db, "clothes-collection"); 
        
        const naverOpenAPI: any = {
            endPoint: "https://openapi.naver.com/v1/search/shop.json",
            headers: {
                "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID,
                "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET,
            }
        }

        const styleKeyword = (style: string) => {
            switch (style) {
                case 'VINTAGE':
                    return '빈티지룩';
                case 'OFFICE':
                    return '오피스룩';
                case 'SPORTIFY':
                    return '스포츠룩';
                case 'STREET':
                    return '스트릿룩';
                case 'MINIMAL':
                    return '미니멀룩';
                default:
                    return '';
            }
        }

        const totalMonthlyCollection: clothes[] = [];

        MONTHLY_TREND.styles.forEach((item) => {
            item.brands.forEach((brand) => {
                item.categories.forEach(async (category) => {
                    const searchQuery = `${brand} ${styleKeyword(item.style)} ${category}`
                    const searchRequest = await fetch(
                        `${naverOpenAPI.endPoint}?query=${searchQuery}&display=100`,
                        {
                            headers: naverOpenAPI.headers,
                        }
                    )

                    if (searchRequest.ok) {
                        const resData = await searchRequest.json();
                        const clothesData: clothes[] = resData.items;

                        if (clothesData.length > 0) {
                            /* Naver Open API 응답 값 가공
                            1. title 속성 문자열 값에 포함된 태그 제거
                            2. viewCount,  */
                            const clothesConversion: clothes[] = clothesData.map((clothes) => {
                                return {
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
                                    searchStyle: styleKeyword(item.style),
                                    searchCategory: category,
                                };
                            });
                        
                            totalMonthlyCollection.push(...clothesConversion);
                        }
                    }
                })
            })
        })

        return NextResponse.json({
            totalMonthlyCollection: totalMonthlyCollection,
            status: 200
        })

    } catch (err) {
        return NextResponse.json({
            error: '의류 데이터 수집 중에 오류가 발생하였습니다.'
        }, { status: 500 })
    }
}