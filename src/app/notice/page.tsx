import type { Metadata } from 'next';
import 'styles/notice.scss';
import NoticeTable from '@/component/Notice/NoticeTable';
import { getNoticeList } from '@/feature/notice/notice.service';

// 2026.10.18: 조회수가 즉시 반영되도록 요청마다 서버에서 렌더링
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '공지사항',
  description:
    'TrendTailor의 서비스 업데이트, 월간 트렌드 키워드 수집 소식 등 공지사항을 확인하세요.',
  alternates: { canonical: '/notice' },
};

// 2026.10.18: 검색엔진이 게시글 목록과 링크를 읽을 수 있도록 서버 컴포넌트로 전환
export default async function Notice() {
  const noticeList = await getNoticeList();

  return (
    <div className="wrap">
      <section className="notice-container">
        <NoticeTable noticeList={noticeList} />
      </section>
    </div>
  );
}
