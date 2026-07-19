"use client";

import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Dashboard as CSS } from "@/styles";
import SystemLabel from "./ui/SystemLabel";

const Section = ({
  children,
  type = "section",
  title = "",
}: {
  children: React.ReactNode; // 문단 컨텐츠
  type: string; // 문단 타입 (header, basic section, hero 등 디자인 유형에 따른 템플릿화)
  title?: string; // 문단 제목
}) => {
  const hasTitleYn = useMemo(() => {
    return title !== "";
  }, [title]);

  const newDate = dayjs().locale("ko").toDate();

  const currentDate = useMemo(() => {
    return dayjs(newDate).format("YYYY년 MM월");
  }, [newDate]);

  const dashboardTitle = useMemo(() => {
    const monthlySeasonCollection: any = {
      "01": "겨울",
      "02": "겨울",
      "03": "봄",
      "04": "봄",
      "05": "봄",
      "06": "여름",
      "07": "여름",
      "08": "여름",
      "09": "가을",
      "10": "가을",
      "11": "겨울",
      "12": "겨울",
    };

    // 현재 날짜의 월(MM) 형태 추출
    const currentMonth = (newDate.getMonth() + 1).toString().padStart(2, "0");

    // 컬렉션에서 월에 해당하는 시즌 텍스트 출력하여 대시보드 제목 생성
    if (monthlySeasonCollection[currentMonth]) {
      const fullTxt = `올해 ${monthlySeasonCollection[currentMonth]}, 사람들이 가장 <strong>주목한 스타일</strong>`;

      return { __html: fullTxt };
    }
  }, [newDate]);

  return (
    <>
      {/* 랜딩 페이지 상단 헤더 유형 */}
      {type === "header" && (
        <CSS.PageHeader>
          <div className='index'>
            <SystemLabel
              type='eyebrow'
              labelTxt={currentDate}
              subTxt_B='트랜드 스타일 대시보드'
            />
            <h1
              className='index__title'
              dangerouslySetInnerHTML={dashboardTitle}
            ></h1>
          </div>

          <div className='page-sub'>{children}</div>
        </CSS.PageHeader>
      )}

      {/* 랜딩 페이지 본문 문단 유형 */}
      {type === "section" && (
        <section className='dashboard-section'>
          {hasTitleYn && <h2 className='dashboard-section__title'>{title}</h2>}
          {children}
        </section>
      )}

      {/* 랜딩 페이지 본문 인트로 영역 */}
      {type === "hero" && (
        <section className='hero'>
          {hasTitleYn && <h2 className='hero__title'>{title}</h2>}
          {children}
        </section>
      )}
    </>
  );
};

export default Section;
