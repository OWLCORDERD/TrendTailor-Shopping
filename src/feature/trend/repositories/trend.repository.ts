import { createTrendSlug } from "@/feature/slug/keyword-slug";
import { db } from "@/shared/lib/firebase";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export interface trendKeywordsType {
  name: string;
  description: string;
  aliases: string[];
  category: string;
  confidence: number;
  season: string[];
  relatedStyles: {
    name: string;
    score: number;
  }[];
  children: {
    tops: string[];
    bottoms: string[];
    shoes: string[];
  };
}

export interface searchKeywordType {
  name: string; // 트랜드 키워드명
  aliases: string[]; // 트랜드 키워드 별칭
  createdAt: Date; // 트랜드 키워드 생성일
  children: {
    top: string[];
    bottom: string[];
    shoes: string[];
  };
}

type ExistingKeyword = {
  ref: DocumentReference;
  slug: string;
};

type ExistingClothes = {
  ref: DocumentReference;
  keywordName: string;
};

/**
 * 2026.07.25 트랜드 키워드 컬렉션 관리 리포지토리
 */
export class TrendKeywordRepository {
  private readonly collection = "trend-keywords";

  // 1. 조회된 트랜드 키워드 중복체크 함수
  // - 트랜드 키워드 컬렉션 내부 조회된 키워드 slug명과 일치하는 키워드 문서 체크
  async findExistingKeyword(
    trendKeyword: trendKeywordsType,
    slug: string
  ): Promise<ExistingKeyword | null> {
    const colRef = collection(db, this.collection);

    // 1. slug 문서 ID로 조회
    const slugRef = doc(db, this.collection, slug);
    const slugSnap = await getDoc(slugRef);
    if (slugSnap.exists()) {
      return { ref: slugRef, slug: slugSnap.data().slug ?? slug };
    }

    // 2. 키워드명(name) 일치 조회
    const nameSnap = await getDocs(
      query(colRef, where("name", "==", trendKeyword.name), limit(1))
    );
    if (!nameSnap.empty) {
      const found = nameSnap.docs[0];
      return { ref: found.ref, slug: found.data().slug ?? found.id };
    }

    // 3. aliases / name으로 교차 조회 (alias 드리프트·표기 차이 대응)
    const candidates = Array.from(
      new Set(
        [trendKeyword.name, ...trendKeyword.aliases]
          .map((v) => v.trim())
          .filter(Boolean)
      )
    ).slice(0, 10);

    if (candidates.length === 0) {
      return null;
    }

    const nameInSnap = await getDocs(
      query(colRef, where("name", "in", candidates), limit(1))
    );
    if (!nameInSnap.empty) {
      const found = nameInSnap.docs[0];
      return { ref: found.ref, slug: found.data().slug ?? found.id };
    }

    const aliasesSnap = await getDocs(
      query(colRef, where("aliases", "array-contains-any", candidates), limit(1))
    );
    if (!aliasesSnap.empty) {
      const found = aliasesSnap.docs[0];
      return { ref: found.ref, slug: found.data().slug ?? found.id };
    }

    return null;
  }

  // 2. 트랜드 키워드 컬렉션 문서 생성 페이로드 구조화
  buildKeywordPayload(trendKeyword: trendKeywordsType, slug: string) {
    return {
      slug,
      name: trendKeyword.name,
      aliases: trendKeyword.aliases,
      description: trendKeyword.description,
      category: trendKeyword.category,
      confidence: trendKeyword.confidence,
      season: trendKeyword.season,
      relatedStyles: trendKeyword.relatedStyles,
      children: trendKeyword.children,
      updatedAt: serverTimestamp(),
    };
  }

  async save(trendKeywords: trendKeywordsType[]) {
    try {
      let created = 0;
      let updated = 0;
      let skipped = 0;
  
      for (const trendKeyword of trendKeywords) {
        const slug = createTrendSlug(trendKeyword);
  
        if (!slug) {
          console.error(
            `영문 alias가 없어 slug를 생성할 수 없습니다. name=${trendKeyword.name}`
          );
          skipped += 1;
          continue;
        }
  
        const existing = await this.findExistingKeyword(trendKeyword, slug);
        const payload = this.buildKeywordPayload(trendKeyword, existing?.slug ?? slug);
  
        if (existing) {
          await updateDoc(existing.ref, payload);
          updated += 1;
        } else {
          await setDoc(doc(db, this.collection, slug), {
            ...payload,
            createdAt: serverTimestamp(),
          });
          created += 1;
        }
      }
  
      return { success: true as const, created, updated, skipped };
    } catch (err) {
      console.error(err);
      return { success: false as const, err };
    }
  };

  // 트랜드 키워드 컬렉션에 저장된 문서 전체 조회하여 검색 쿼리 반환
  async getTrendKeywordDocs() {
    const colRef = collection(db, this.collection);

    const getColRefDocs = await getDocs(colRef);

    if (getColRefDocs.empty) {
      return [];
    }

    return getColRefDocs.docs.map((doc) => {
      return {
        name: doc.data().name,
        aliases: doc.data().aliases,
        createdAt: doc.data().createdAt.toDate(),
        children: {
          top: doc.data().children.tops,
          bottom: doc.data().children.bottoms,
          shoes: doc.data().children.shoes,
        },
      };
    }) as searchKeywordType[];
  };
}

/**
 * 2026.07.25 트랜드 의류 컬렉션 관리 리포지토리
 */
export class TrendClothesRepository {
  private readonly collection = "clothes";

  // 1. 조회된 트랜드 키워드 중복체크 함수
  // - 의류 컬렉션 내부 조회된 상품 아이디(productId) 또는 상품명(title) 일치하는 의류 문서 체크
  async findExistingClothes(
    clothes: trendClothes
  ): Promise<ExistingClothes | null> {
    const colRef = collection(db, this.collection);

    // 1. 상품 아이디(productId) 일치 조회
    const productIdSnap = await getDocs(
      query(colRef, where("productId", "==", clothes.productId), limit(1))
    );
    if (!productIdSnap.empty) {
      const found = productIdSnap.docs[0];
      return { ref: found.ref, keywordName: found.data().keywordName ?? found.id };
    }

    // 2. 키워드명(name) 일치 조회
    const nameSnap = await getDocs(
      query(colRef, where("title", "==", clothes.title), limit(1))
    );
    if (!nameSnap.empty) {
      const found = nameSnap.docs[0];
      return { ref: found.ref, keywordName: found.data().keywordName ?? found.id };
    }

    return null;
  }

  async save(clothesList: trendClothes[]) {
    try {
      let created = 0;
      let updated = 0;
      let skipped = 0;
  
      for (const clothes of clothesList) {
        // 중복 의류 조회
        const existing = await this.findExistingClothes(clothes);
  
        if (existing) {
          await updateDoc(existing.ref, {
            ...clothes,
            updatedAt: serverTimestamp(),
          });
          updated += 1;
        } else {
          await setDoc(doc(db, this.collection, clothes.productId), {
            ...clothes,
            createdAt: serverTimestamp(),
          });
          created += 1;
        }
      }
  
      return { success: true as const, created, updated, skipped };
    } catch (err) {
      console.error(err);
      return { success: false as const, err };
    }
  };

  // 트랜드 키워드 컬렉션에 저장된 문서 전체 조회하여 검색 쿼리 반환
  async getClothesDocs() {
    const colRef = collection(db, this.collection);

    const getColRefDocs = await getDocs(colRef);

    if (getColRefDocs.empty) {
      return [];
    }

    return getColRefDocs.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    }) as clothes[];
  };
}