'use client';

import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { Dashboard as CSS } from '@/styles';
import SystemLabel from './ui/SystemLabel';
import { IoArrowRedoSharp } from 'react-icons/io5';
import TrendKpiStats from './structure/TrendKpiStats';
import DashboardHeader from './structure/Header';

const Section = ({
  type,
  header = {
    title: '',
    children: null,
  },
  section = {
    title: '',
    desc: '',
    children: null,
  },
  hero = {
    title: '',
    desc: '',
    children: null,
  },
}: {
  type: string; // 문단 타입 (header, basic section, hero 등 디자인 유형에 따른 템플릿화)
  // 상단 헤더 컴포넌트 타입 - header
  header?: {
    title?: string; // 제목 (필수 값이 아님)
    children: React.ReactNode; // *필수* 문단 컨텐츠
    // 시스템 라벨 설정
    label?: {
      type?: 'eyebrow' | 'dot';
      labelTxt?: string; // 헤더 라벨 > 오늘 날짜 기반 생성 텍스트 or 커스텀
      subTxt_B?: string;
    };
  };
  // 문단 컴포넌트 타입 - section
  section?: {
    title: string; // 제목
    desc: string; // 설명
    type?: string; // 문단 타입 (banner, section 등)
    children: React.ReactNode; // *필수* 문단 컨텐츠
    // 시스템 라벨 설정
    label?: {
      type?: 'eyebrow' | 'dot';
      labelTxt?: string;
      subTxt_B?: string;
    };
  };
  // 메인 영역 컴포넌트 타입 - hero
  hero?: {
    title: string; // *필수* 제목
    desc: string; // *필수* 설명
    children: React.ReactNode; // *필수* 문단 컨텐츠
    // 시스템 라벨 설정
    label?: {
      type?: 'eyebrow' | 'dot';
      labelTxt?: string;
      subTxt_B?: string;
    };
    href?: string;
    buttonText?: string;
  };
}) => {
  const hasTitleYn = useMemo(() => {
    return header.title !== '' || section.title !== '' || hero.title !== '';
  }, [section.title, hero.title])

  return (
    <>
      {/* 랜딩 페이지 상단 헤더 유형 */}
      {type === 'header' && (
        <DashboardHeader />
      )}

      {/* kpi 통계 — 의류/키워드 풀에서 렌더 시점 집계 */}
      {type === 'kpi' && <TrendKpiStats />}

      {/* 랜딩 페이지 본문 인트로 영역 */}
      {type === 'hero' && (
        <section className="hero">
          <CSS.Hero>
            <div className="hero-inner">
              <div className="hero-left">
                {hero.label && (
                  <SystemLabel
                    type={hero.label.type || 'eyebrow'}
                    labelTxt={hero.label.labelTxt}
                    subTxt_B={hero.label.subTxt_B}
                  />
                )}

                {hasTitleYn && <p className="hero-title">{hero.title}</p>}

                <span className="description">{hero.desc}</span>

                {hero.href ? (
                  <Link href={hero.href} className="hero-button">
                    {hero.buttonText || '자세히 보기'}
                    <IoArrowRedoSharp fontSize={20} />
                  </Link>
                ) : null}
              </div>
              {hero.children}
            </div>
          </CSS.Hero>
        </section>
      )}

      {type === 'section' && (
        <CSS.Section>
          <div className="section-inner">
            {section.type === 'banner' ? (
              <>
                <div className="banner">
                  {section.label && (
                    <SystemLabel
                      type={section.label.type || 'eyebrow'}
                      labelTxt={section.label.labelTxt}
                      subTxt_B={section.label.subTxt_B}
                    />
                  )}

                  <div className="banner-index">
                    <div className="banner-index__title">
                      <h2 dangerouslySetInnerHTML={{ __html: section.title }} />
                    </div>
                    <p
                      className="banner-index__desc"
                      dangerouslySetInnerHTML={{ __html: section.desc }}
                    />
                  </div>

                  <div className="banner-link">{section.children}</div>
                </div>
              </>
            ) : (
              <div className="section-content">{section.children}</div>
            )}
          </div>
        </CSS.Section>
      )}
    </>
  );
};

export default Section;
