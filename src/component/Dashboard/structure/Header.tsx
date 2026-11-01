'use client';

import React, { useContext, useMemo } from 'react';
import { Dashboard as CSS } from '@/styles';
import SystemLabel from '../ui/SystemLabel';
import dayjs from 'dayjs';
import useCountUp from '@/hooks/useCountUp';
import { DashboardContext } from '../../../../context/DashboardContext';

const DashboardHeader = () => {
  const newDate = dayjs().locale('ko').toDate();
  // 2026.11.01 브라우저 Firestore 직접 조회 > 서버(ISR) 집계 헤더 통계 컨텍스트로 변경
  const {
    headerStats: { keywordCount, itemCount, latestUpdatedAt },
  } = useContext(DashboardContext);
  // ISR 재생성 서버(UTC)와 브라우저 시간대가 달라 하이드레이션 불일치가 나지 않도록 KST 고정 포맷
  const lastUpdatedLabel = useMemo(() => {
    if (!latestUpdatedAt) return '-';

    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      })
        .formatToParts(new Date(latestUpdatedAt))
        .map(part => [part.type, part.value])
    );

    return `${parts.month}월 ${parts.day}일 ${parts.hour}:${parts.minute}`;
  }, [latestUpdatedAt]);
  const displayItemCount = useCountUp(itemCount);
  const displayKeywordCount = useCountUp(keywordCount);

  const currentDate = useMemo(() => {
    return dayjs(newDate).format('YYYY년 MM월');
  }, [newDate]);

  const dashboardTitle = useMemo(() => {
    const monthlySeasonCollection: Record<string, string> = {
      '01': '겨울',
      '02': '겨울',
      '03': '봄',
      '04': '봄',
      '05': '봄',
      '06': '여름',
      '07': '여름',
      '08': '여름',
      '09': '가을',
      '10': '가을',
      '11': '겨울',
      '12': '겨울',
    };

    const currentMonth = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const season = monthlySeasonCollection[currentMonth];

    if (!season)
      return { __html: '올해 사람들이 가장 <strong>주목한 스타일</strong>' };

    return {
      __html: `올해 ${season}, 사람들이 가장 <strong>주목한 스타일</strong>`,
    };
  }, [newDate]);

  return (
    <CSS.PageHeader>
      <div className="index">
        <SystemLabel
          type={'eyebrow'}
          labelTxt={currentDate}
          subTxt_B={'트렌드 스타일 대시보드'}
        />
        <h1
          className="index__title"
          dangerouslySetInnerHTML={dashboardTitle}
        ></h1>
      </div>

      <div className="page-sub">
        <SystemLabel
          type="dot"
          labelTxt="실시간 업데이트"
          subTxt_B={lastUpdatedLabel}
        />
        <div className="count">
          <div className="count-item">
            <div className="count-item__label">아이템</div>
            <div className="count-item__value">
              {displayItemCount.toLocaleString('ko-KR')}
            </div>
          </div>

          <div className="count-item">
            <div className="count-item__label">분석된 키워드</div>
            <div className="count-item__value">
              {displayKeywordCount.toLocaleString('ko-KR')}
            </div>
          </div>
        </div>
      </div>
    </CSS.PageHeader>
  );
};

export default DashboardHeader;
