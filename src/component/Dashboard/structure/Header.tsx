'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Dashboard as CSS } from '@/styles';
import SystemLabel from '../ui/SystemLabel';
import dayjs from 'dayjs';
import {
  TrendClothesRepository,
  TrendKeywordRepository,
} from '@/feature/trend/repositories/trend.repository';

const DashboardHeader = () => {
  const newDate = dayjs().locale('ko').toDate();
  const keywordRepository = useMemo(() => new TrendKeywordRepository(), []);
  const clothesRepository = useMemo(() => new TrendClothesRepository(), []);

  const [lastUpdatedLabel, setLastUpdatedLabel] = useState('-');
  const [itemCount, setItemCount] = useState(0);
  const [keywordCount, setKeywordCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    let cancelled = false;

    const loadHeaderStats = async () => {
      setIsLoading(true);

      try {
        const [keywords, clothesCount] = await Promise.all([
          keywordRepository.getTrendKeywordDocs(),
          clothesRepository.getClothesCount(),
        ]);

        if (cancelled) return;

        const latestDate = keywordRepository.getLatestUpdatedAt(keywords);

        setLastUpdatedLabel(
          latestDate ? dayjs(latestDate).format('M월 D일 HH:mm') : '-'
        );
        setKeywordCount(keywords.length);
        setItemCount(clothesCount);
      } catch (error) {
        console.error('대시보드 헤더 통계 조회 실패:', error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadHeaderStats();

    return () => {
      cancelled = true;
    };
  }, [clothesRepository, keywordRepository]);

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
          subTxt_B={isLoading ? '—' : lastUpdatedLabel}
        />
        <div className="count">
          <div className="count-item">
            <div className="count-item__label">아이템</div>
            <div className="count-item__value">
              {isLoading ? '—' : itemCount.toLocaleString('ko-KR')}
            </div>
          </div>

          <div className="count-item">
            <div className="count-item__label">분석된 키워드</div>
            <div className="count-item__value">
              {isLoading ? '—' : keywordCount.toLocaleString('ko-KR')}
            </div>
          </div>
        </div>
      </div>
    </CSS.PageHeader>
  );
};

export default DashboardHeader;
