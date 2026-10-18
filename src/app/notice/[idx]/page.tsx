import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import 'styles/currentNotice.scss';
import { getNoticeById } from '@/feature/notice/notice.service';

// 2026.10.18: 조회수가 즉시 반영되도록 요청마다 서버에서 렌더링
export const dynamic = 'force-dynamic';

interface NoticePageProps {
  params: Promise<{ idx: string }>;
}

// 2026.10.18: 게시글 제목, 본문 앞부분을 페이지 제목, 설명으로 사용
export async function generateMetadata({
  params,
}: NoticePageProps): Promise<Metadata> {
  const { idx } = await params;
  const post = await getNoticeById(idx);

  if (!post) {
    notFound();
  }

  const description = post.text.replace(/\s+/g, ' ').trim().slice(0, 120);

  return {
    title: `${post.title} - 공지사항`,
    description,
    alternates: { canonical: `/notice/${post.id}` },
    openGraph: {
      type: 'article',
      siteName: 'TrendTailor',
      locale: 'ko_KR',
      title: post.title,
      description,
      url: `/notice/${post.id}`,
      publishedTime: post.isoDate,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

// 2026.10.18: useEffect 클라이언트 조회 → 서버 컴포넌트 조회로 전환 (검색엔진에 본문 노출)
const CurrentNotice = async ({ params }: NoticePageProps) => {
  const { idx } = await params;
  const currentPost = await getNoticeById(idx);

  if (!currentPost) {
    notFound();
  }

  return (
    <div className="wrap">
      <article className="current-NoticeBoard">
        <div className="currentBoard-header">
          <span className="static">공지사항</span>
          <h1 className="title">{currentPost.title}</h1>
        </div>

        <div className="currentBoard-info">
          <div className="view-count">
            <p>조회수</p>
            <span>{currentPost.view_cnt}</span>
          </div>
          <div className="upload-date">
            <time dateTime={currentPost.isoDate}>{currentPost.date}</time>
          </div>
        </div>

        <div className="currentBoard-text">
          {currentPost.text.split('\n').map((keyword, index) => {
            return (
              <p key={index}>
                {keyword}
                <br />
              </p>
            );
          })}
        </div>

        {currentPost.image ? (
          <div className="upload-imageBox">
            <div className="upload-image">
              <Image
                src={currentPost.image}
                alt={`${currentPost.title} 첨부 이미지`}
                width="400"
                height="500"
              />
            </div>
          </div>
        ) : null}

        <div className="currentNotice-button">
          <div className="NoticeList-button">
            <Link href="/notice">목록으로</Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CurrentNotice;
