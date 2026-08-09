"use client";

import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Dashboard as CSS } from "@/styles";
import SystemLabel from "./ui/SystemLabel";

const Section = ({
  type,
  header = {
    title: "",
    children: null,
  },
  section = {
    title: "",
    desc: "",
    children: null,
  },
  hero = {
    title: "",
    desc: "",
    children: null,
  }
}: {
  type: string; // 문단 타입 (header, basic section, hero 등 디자인 유형에 따른 템플릿화)
  // 상단 헤더 컴포넌트 타입 - header
  header?: {
    title?: string; // 제목 (필수 값이 아님)
    children: React.ReactNode; // *필수* 문단 컨텐츠
    // 시스템 라벨 설정
    label?: {
      type?: "eyebrow" | "dot";
      labelTxt?: string; // 헤더 라벨 > 오늘 날짜 기반 생성 텍스트 or 커스텀
      subTxt_B?: string;
    }
  },
  // 문단 컴포넌트 타입 - section
  section?: {
    title: string; // *필수* 제목
    desc: string; // *필수* 설명
    children: React.ReactNode; // *필수* 문단 컨텐츠
    // 시스템 라벨 설정
    label?: {
      type?: "eyebrow" | "dot";
      labelTxt?: string;
      subTxt_B?: string;
    }
  },
  // 메인 영역 컴포넌트 타입 - hero
  hero?: {
    title: string; // *필수* 제목
    desc: string; // *필수* 설명
    children: React.ReactNode; // *필수* 문단 컨텐츠
    // 시스템 라벨 설정
    label?: {
      type?: "eyebrow" | "dot";
      labelTxt?: string;
      subTxt_B?: string;
    }
  }
}) => {
  const hasTitleYn = useMemo(() => {
    return header.title !== "" || section.title !== "" || hero.title !== "";
  }, [header.title, section.title, hero.title]);

  const newDate = dayjs().locale("ko").toDate();

  const currentDate = useMemo(() => {
    return dayjs(newDate).format("YYYY년 MM월");
  }, [newDate]);

  const dashboardTitle = useMemo(() => {
    if (header.title && header.title !== "") {
      return { __html: header.title as any };
    }

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
  }, [newDate, header.title]);

  const dummyData = [
    {
      type: "top-keyword",
      data: {
        title: "블록코어",
        value: "+ 14",
      },
    },
    {
      type: "new-clothes",
      data: {
        title: "7월 신상 의류",
        value: "+ 700",
      },
    },
    {
      type: "new-keyword",
      data: {
        title: "블록코어 외",
        value: "+ 7",
      },
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "top-keyword":
        return "TOP 인기상승 키워드";
      case "new-clothes":
        return "신규 등록 아이템";
      case "new-keyword":
        return "신규 등록 키워드";
    }
  };

  return (
    <>
      {/* 랜딩 페이지 상단 헤더 유형 */}
      {type === "header" && (
        <CSS.PageHeader>
          <div className='index'>
            {header.label && (
              <SystemLabel
                type={header.label.type || "eyebrow"}
                labelTxt={header.label.labelTxt || currentDate}
                subTxt_B={header.label.subTxt_B}
              />
            )}
            <h1
              className='index__title'
              dangerouslySetInnerHTML={dashboardTitle}
            ></h1>
          </div>

          <div className='page-sub'>{header.children}</div>
        </CSS.PageHeader>
      )}

      {/* kpi 통계 그래프 유형 */}
      {type === "kpi" && (
          <CSS.KPIGraph>
          {dummyData.map((item, index) => (
            <CSS.KPIGraphItem key={index}>
              <div className='kpi__label'>{getTypeLabel(item.type)}</div>
              <div className='kpi__value'>{item.data.title}</div>
              <div className='kpi__delta'>{item.data.value}</div>
            </CSS.KPIGraphItem>
          ))}
        </CSS.KPIGraph>
      )}

      {/* 랜딩 페이지 본문 인트로 영역 */}
      {type === "hero" && (
        <section className='hero'>
          <CSS.Hero>
            <div className='hero-inner'>
              <div className='hero-left'>
                {hero.label && (
                  <SystemLabel
                    type={hero.label.type || "eyebrow"}
                    labelTxt={hero.label.labelTxt}
                    subTxt_B={hero.label.subTxt_B}
                  />
                )}

                {hasTitleYn && <p className='hero-title'>{hero.title}</p>}

                <span className='description'>
                  {hero.desc}
                </span>
              </div>
              {hero.children}
            </div>
          </CSS.Hero>
        </section>
      )}

      {type === "section" && (
        <CSS.Section>
          <div className='section-inner'>
            <div className='section-left'>
              <div className='section-left__label'>
                {section.label && (
                  <SystemLabel
                    type={section.label.type || "eyebrow"}
                    labelTxt={section.label.labelTxt}
                    subTxt_B={section.label.subTxt_B}
                  />
                )}
              </div>
              <div className='section-left__title'>
                <h2>쿠팡 파트너스와 함께하는 <br/>
                  <strong>TrendTailor</strong>
                </h2>
              </div>
              <div className='section-left__desc'>
                <p dangerouslySetInnerHTML={{ __html: section.desc }} />
              </div>
            </div>  

            <div className='section-right'>
              {section.children}
            </div>
          </div>
        </CSS.Section>
      )}
    </>
  );
};

export default Section;
