import { createTrendSlug } from '@/feature/slug/keyword-slug';
import { db } from '@/shared/lib/firebase';
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

export interface trendKeywordsType {
  name: string;
  description: string;
  aliases: string[];
  category: string;
  confidence: number;
  season: string[];
  slug: string;
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
  updatedAt?: Date; // 트랜드 키워드 수정일 (월별 수집 갱신)
  children: {
    top: string[];
    bottom: string[];
    shoes: string[];
  };
}

const toJsDate = (value: unknown): Date | null => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === 'object') {
    const maybeTimestamp = value as {
      toDate?: () => Date;
      seconds?: number;
    };

    if (typeof maybeTimestamp.toDate === 'function') {
      const parsed = maybeTimestamp.toDate();
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    if (typeof maybeTimestamp.seconds === 'number') {
      return new Date(maybeTimestamp.seconds * 1000);
    }
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
};

type ExistingKeyword = {
  ref: DocumentReference;
  slug: string;
};

/**
 * 2026.07.25 트랜드 키워드 컬렉션 관리 리포지토리
 */
export class TrendKeywordRepository {
  private readonly collection = 'trend-keywords';

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
      query(colRef, where('name', '==', trendKeyword.name), limit(1))
    );
    if (!nameSnap.empty) {
      const found = nameSnap.docs[0];
      return { ref: found.ref, slug: found.data().slug ?? found.id };
    }

    // 3. aliases / name으로 교차 조회 (alias 드리프트·표기 차이 대응)
    const candidates = Array.from(
      new Set(
        [trendKeyword.name, ...trendKeyword.aliases]
          .map(v => v.trim())
          .filter(Boolean)
      )
    ).slice(0, 10);

    if (candidates.length === 0) {
      return null;
    }

    const nameInSnap = await getDocs(
      query(colRef, where('name', 'in', candidates), limit(1))
    );
    if (!nameInSnap.empty) {
      const found = nameInSnap.docs[0];
      return { ref: found.ref, slug: found.data().slug ?? found.id };
    }

    const aliasesSnap = await getDocs(
      query(
        colRef,
        where('aliases', 'array-contains-any', candidates),
        limit(1)
      )
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
        const payload = this.buildKeywordPayload(
          trendKeyword,
          existing?.slug ?? slug
        );

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
  }

  // 트랜드 키워드 컬렉션에 저장된 문서 전체 조회하여 검색 쿼리 반환
  async getTrendKeywordDocs() {
    const colRef = collection(db, this.collection);

    const getColRefDocs = await getDocs(colRef);

    if (getColRefDocs.empty) {
      return [];
    }

    return getColRefDocs.docs.map(doc => {
      const data = doc.data();
      const createdAt =
        toJsDate(data.createdAt) ?? toJsDate(data.updatedAt) ?? new Date(0);
      const updatedAt = toJsDate(data.updatedAt) ?? undefined;

      return {
        name: data.name,
        aliases: data.aliases,
        createdAt,
        updatedAt,
        children: {
          top: data.children?.tops ?? [],
          bottom: data.children?.bottoms ?? [],
          shoes: data.children?.shoes ?? [],
        },
      };
    }) as searchKeywordType[];
  }

  /** 키워드 문서 중 updatedAt(없으면 createdAt) 최신순 1건의 날짜 */
  getLatestUpdatedAt(keywords: searchKeywordType[]): Date | null {
    const sorted = [...keywords].sort((a, b) => {
      const aTime = (a.updatedAt ?? a.createdAt)?.getTime() ?? 0;
      const bTime = (b.updatedAt ?? b.createdAt)?.getTime() ?? 0;
      return bTime - aTime;
    });

    const latest = sorted[0];
    if (!latest) return null;

    const date = latest.updatedAt ?? latest.createdAt;
    return date?.getTime() ? date : null;
  }
}

/**
 * 2026.07.25 트랜드 의류 컬렉션 관리 리포지토리
 */
export class TrendClothesRepository {
  private readonly collection = 'clothes';
  // Firestore writeBatch 최대 500건. 여유를 두고 400건씩 커밋
  private readonly batchSize = 400;

  private dedupeByProductId(clothesList: trendClothes[]) {
    const unique = new Map<string, trendClothes>();

    for (const clothes of clothesList) {
      const productId = clothes.productId?.trim();
      if (!productId) continue;
      unique.set(productId, clothes);
    }

    return Array.from(unique.values());
  }

  private buildClothesPayload(clothes: trendClothes) {
    const { createdAt: _createdAt, updatedAt: _updatedAt, ...data } = clothes;

    return {
      ...data,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    };
  }

  /**
   * productId를 문서 ID로 사용해 메모리 중복 제거 후 batch upsert.
   * 건당 조회 2회 + 쓰기 1회 대신 쓰기만 수행한다.
   */
  async save(clothesList: trendClothes[]) {
    try {
      const uniqueClothes = this.dedupeByProductId(clothesList);
      const skipped = clothesList.length - uniqueClothes.length;
      let upserted = 0;

      for (let i = 0; i < uniqueClothes.length; i += this.batchSize) {
        const chunk = uniqueClothes.slice(i, i + this.batchSize);
        const batch = writeBatch(db);

        for (const clothes of chunk) {
          const ref = doc(db, this.collection, clothes.productId);
          batch.set(ref, this.buildClothesPayload(clothes), { merge: true });
        }

        await batch.commit();
        upserted += chunk.length;
      }

      return {
        success: true as const,
        created: upserted,
        updated: 0,
        skipped,
      };
    } catch (err) {
      console.error(err);
      return { success: false as const, err };
    }
  }

  // 트랜드 키워드 컬렉션에 저장된 문서 전체 조회하여 검색 쿼리 반환
  async getClothesDocs() {
    const colRef = collection(db, this.collection);

    const getColRefDocs = await getDocs(colRef);

    if (getColRefDocs.empty) {
      return [];
    }

    return getColRefDocs.docs.map(doc => {
      return {
        ...doc.data(),
      };
    }) as trendClothes[];
  }

  async getClothesCount() {
    const snap = await getCountFromServer(collection(db, this.collection));
    return snap.data().count;
  }
}
