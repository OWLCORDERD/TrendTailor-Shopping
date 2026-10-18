import { cache } from 'react';
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/shared/lib/firebase';

export interface NoticeType {
  id: string;
  title: string;
  image: string;
  date: any;
  text: string;
  view_cnt: number;
  writer?: string;
  // 구조화 데이터, 사이트맵 lastModified 용 ISO 8601 날짜 문자열
  isoDate?: string;
}

// Firestore Timestamp → 0000-00-00 형식 문자열
const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

const toNotice = (id: string, data: DocumentData): NoticeType => {
  const date: Date = data['date'].toDate();

  return {
    id,
    title: data['title'],
    writer: data['writer'],
    image: data['image'] ?? '',
    date: formatDate(date),
    isoDate: date.toISOString(),
    text: data['text'],
    view_cnt: data['view_cnt'],
  };
};

// 2026.10.18: 공지사항 서버 렌더링을 위한 목록 조회 (최신순)
export const getNoticeList = cache(async (): Promise<NoticeType[]> => {
  const querySnapShot = await getDocs(
    query(collection(db, 'notice'), orderBy('date', 'desc'))
  );

  return querySnapShot.docs.map(doc => toNotice(doc.id, doc.data()));
});

// 2026.10.18: generateMetadata와 페이지 렌더링에서 같은 요청으로 중복 제거되도록 cache 적용
export const getNoticeById = cache(
  async (id: string): Promise<NoticeType | null> => {
    const docSnapshot = await getDoc(doc(db, 'notice', id));

    if (!docSnapshot.exists()) {
      return null;
    }

    return toNotice(docSnapshot.id, docSnapshot.data());
  }
);
