'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pagenation from 'component/Pagenation/Pagenation';
import { NoticeType } from '@/feature/notice/notice.service';

interface NoticeTablePropsType {
  noticeList: NoticeType[];
}

const postMaxLength = 6;

// 2026.10.18: 서버에서 조회한 공지사항 목록을 받아 페이지네이션, 조회수 처리만 담당하는 클라이언트 컴포넌트
const NoticeTable = ({ noticeList }: NoticeTablePropsType) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentPageDB = useMemo(() => {
    const indexOfLast = currentPage * postMaxLength;
    const indexOfFirst = indexOfLast - postMaxLength;

    return noticeList.slice(indexOfFirst, indexOfLast);
  }, [noticeList, currentPage]);

  const viewNotice = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    viewCount: number,
    currentIdx: string
  ) => {
    // 새 탭 열기 등 보조 클릭은 브라우저 기본 동작 유지
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    e.preventDefault();

    try {
      await fetch('/api/viewCount', {
        method: 'POST',
        body: JSON.stringify({
          id: currentIdx,
          count: viewCount + 1,
        }),
      });
    } catch (err) {
      console.log(err);
    }

    router.push(`/notice/${currentIdx}`);
  };

  return (
    <>
      <div className="notice-table">
        <div className="border-table">
          <table>
            <thead>
              <tr>
                <th>
                  <span>제목</span>
                </th>
                <th>
                  <span>날짜</span>
                </th>
                <th>
                  <span>조회수</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPageDB.map(item => {
                return (
                  <tr key={item.id}>
                    <td>
                      <Link
                        href={`/notice/${item.id}`}
                        onClick={e => viewNotice(e, item.view_cnt, item.id)}
                      >
                        <span>{item.title}</span>
                      </Link>
                    </td>
                    <td>
                      <span>{item.date}</span>
                    </td>
                    <td>
                      <span>{item.view_cnt}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {noticeList.length > 0 ? (
        <Pagenation
          setCurrentPage={setCurrentPage}
          postMaxLength={postMaxLength}
          totalDBlength={noticeList.length}
          currentPage={currentPage}
          setLoading={() => {}}
        />
      ) : null}
    </>
  );
};

export default NoticeTable;
