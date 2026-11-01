import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';

type optionItem = { label: string; value: string };
type optionCollectionType = Record<string, optionItem[]>;

// 2026.10.25. 마이홈 > 로그인 사용자 AI 컨설팅 이력 문서 타입
export interface ConsultingHistory {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  QA_select: { step: number; selectLabel: string }[];
  products: trendClothes[];
  recommendInfo: recommendClothes[];
}

export interface StyleProfile {
  keywords: { name: string; count: number }[]; // 컨설팅에서 고른 트렌드 키워드 빈도순
  category: string; // 가장 많이 고른 의류 종류
  budget: string; // 가장 많이 고른 예산 범위
  priority: string; // 가장 많이 고른 추천 기준
}

// 설문 단계별 선택 값 인덱스 (chatBubbleSlice QA_select 순서와 동일)
const STEP = {
  category: 0,
  keyword: 1,
  gender: 2,
  budget: 3,
  priority: 4,
} as const;

/**
 * 2026.10.25. 로그인 사용자 이메일 기준 컨설팅 이력 조회 (최신순)
 * - where + orderBy 복합 색인 생성을 피하기 위해 정렬은 클라이언트에서 처리
 */
export const getMyConsultingHistory = async (
  email: string
): Promise<ConsultingHistory[]> => {
  if (!email) return [];

  const snapshot = await getDocs(
    query(collection(db, 'recent-chats'), where('user.info.email', '==', email))
  );

  return snapshot.docs
    .map(docSnap => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        title: data.title ?? '제목 없음',
        type: data.type ?? 'consulting',
        createdAt: data.createAt ?? data.createdAt ?? '',
        QA_select: data.user?.QA_select ?? [],
        products: data.assistant?.products ?? [],
        recommendInfo: data.assistant?.recommendInfo ?? [],
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

// 설문 선택 값(value) > 화면 표시 라벨 변환 (옵션에 없으면 원본 값 그대로 노출)
export const toOptionLabel = (
  value: string,
  optionCollection: optionCollectionType
) => {
  if (!value) return '';

  const label = Object.values(optionCollection)
    .flat()
    .find(option => option.value === value)?.label;

  return label ?? value;
};

// 배열 내 최빈값 반환
const mostFrequent = (values: string[]) => {
  const counter = new Map<string, number>();
  values
    .filter(Boolean)
    .forEach(value => counter.set(value, (counter.get(value) ?? 0) + 1));

  return Array.from(counter.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
};

/**
 * 2026.10.25. 컨설팅 이력의 설문 답변을 집계해 사용자 스타일 프로필 생성
 */
export const buildStyleProfile = (
  history: ConsultingHistory[],
  optionCollection: optionCollectionType
): StyleProfile => {
  const pick = (step: number) =>
    history.map(item => item.QA_select[step]?.selectLabel ?? '');

  const keywordCounter = new Map<string, number>();
  pick(STEP.keyword)
    .filter(Boolean)
    .forEach(name =>
      keywordCounter.set(name, (keywordCounter.get(name) ?? 0) + 1)
    );

  return {
    keywords: Array.from(keywordCounter.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    category: toOptionLabel(mostFrequent(pick(STEP.category)), optionCollection),
    budget: toOptionLabel(mostFrequent(pick(STEP.budget)), optionCollection),
    priority: toOptionLabel(mostFrequent(pick(STEP.priority)), optionCollection),
  };
};

// 컨설팅 설문 조건 요약 라벨 목록 (키워드 · 종류 · 성별 · 예산 · 기준)
export const toConditionLabels = (
  QA_select: ConsultingHistory['QA_select'],
  optionCollection: optionCollectionType
) => {
  return [
    STEP.keyword,
    STEP.category,
    STEP.gender,
    STEP.budget,
    STEP.priority,
  ]
    .map(step => toOptionLabel(QA_select[step]?.selectLabel ?? '', optionCollection))
    .filter(Boolean);
};
