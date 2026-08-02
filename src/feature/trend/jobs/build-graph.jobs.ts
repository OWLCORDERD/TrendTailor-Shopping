import { db } from "@/shared/lib/firebase"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"

// 2026.08.03 트랜드 키워드/의류 데이터 기반
// -> d3 force directed 벡터 그래픽 통계 데이터 생성 작업
export const buildGraphJobs = async () => {
    // 트랜드 키워드 컬렉션 전체 문서 조회
    const trendKeywordsRef = collection(db, 'trend-keywords');
    const trendKeywordSnap = await getDocs(trendKeywordsRef);

    if (trendKeywordSnap.empty) {
        return {
            success: false,
            message: '조회된 트랜드 키워드가 없습니다.',
        }
    }

    // 트랜드 의류 컬렉션 전체 문서 조회
    const clothesRef = collection(db, 'clothes');
    const clothesList = await getDocs(clothesRef);

    if (clothesList.empty) {
        return {
            success: false,
            message: '조회된 트랜드 의류 데이터가 없습니다.',
        }
    }

    // 트랜드 의류 문서데이터 매핑 배열 생성
    const clothesData: trendClothes[] = clothesList.docs.map((doc) => {
        const data = doc.data();

        return {
            productId: data.productId,
            title: data.title,
            image: data.image,
            link: data.link,
            price: data.price,
            category: data.category,
            genderCategory: data.genderCategory,
            keywordName: data.keywordName,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            brand: data.brand,
            viewCount: data.viewCount,
            likeCount: data.likeCount,
        }
    });

    // 트랜드 키워드별 의류 카테고리 별 조회 수 매핑 객체 생성
    const clothesCountMap: Record<string, {tops: number; bottoms: number; shoes: number; totalCount: number;}> = {};

    clothesData.forEach((clothes: trendClothes) => {
        // 조회 트랜드 키워드명
        const slug = clothes.keywordName;
        // 조회 카테고리 분류
        const subCat = clothes.category as 'tops' | 'bottoms' | 'shoes';

        if (!clothesCountMap[slug]) {
            clothesCountMap[slug] = {
                tops: 0,
                bottoms: 0,
                shoes: 0,
                totalCount: 0,
            }
        }

        if (subCat && clothesCountMap[slug][subCat] !== undefined) {
            clothesCountMap[slug][subCat] += 1;
        }

        clothesCountMap[slug].totalCount += 1;
    });
    
    const nodes: any[] = [];
    const rawKeywords: any[] = [];

  // 3. Nodes 생성
  trendKeywordSnap.forEach((docSnap: any) => {
    const data = docSnap.data();
    const slug = docSnap.slug;
    rawKeywords.push({ slug, ...data });

    const counts = clothesCountMap[slug] || { tops: 0, bottoms: 0, shoes: 0, total: 0 };
    
    // Node Val 계산 (기본 10 + 수집 의류수 * confidence)
    const confidence = data.confidence || 0.5;
    const nodeVal = 10 + Math.round(counts.totalCount * 1.5 * confidence);

    nodes.push({
      id: slug,
      name: data.name,
      aliases: data.aliases || [],
      category: data.aliases?.[0] || 'General',
      val: nodeVal,
      confidence: confidence,
      season: data.season || [],
      itemCounts: counts,
    });
  });

  // 4. Links(Edges) 산출 - children 태그 및 aliases 교집합 기반
  const links = [];
  for (let i = 0; i < rawKeywords.length; i++) {
    for (let j = i + 1; j < rawKeywords.length; j++) {
      const k1 = rawKeywords[i];
      const k2 = rawKeywords[j];

      // children 내 세부 키워드들의 교집합 계산
      const k1Children = [...(k1.children?.tops || []), ...(k1.children?.bottoms || []), ...(k1.children?.shoes || [])];
      const k2Children = [...(k2.children?.tops || []), ...(k2.children?.bottoms || []), ...(k2.children?.shoes || [])];
      
      const intersection = k1Children.filter((item) => k2Children.includes(item));
      
      // 공통 분모가 있거나 aliases가 일치할 때 Link 연결
      if (intersection.length > 0) {
        const similarityScore = Number((intersection.length / Math.min(k1Children.length, k2Children.length)).toFixed(2));
        
        links.push({
          source: k1.slug,
          target: k2.slug,
          value: similarityScore || 0.1,
          commonKeywords: intersection,
        });
      }
    }
  }

  const yearMonth = new Date().toISOString().split('T')[0];

  // 5. 최종 시각화 통계 문서 1개에 저장
  await setDoc(doc(db, 'trend_graph_stats', yearMonth), {
    nodes,
    links,
    totalKeywords: nodes.length,
    totalClothes: clothesData.length,
    updatedAt: new Date(),
  });
}