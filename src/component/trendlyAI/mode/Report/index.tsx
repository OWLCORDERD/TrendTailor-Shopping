'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { HiSparkles } from 'react-icons/hi2';
import Image from 'next/image';
import { Trendly as CSS } from '@/styles';
import { db } from '@/shared/lib/firebase';
import { useAppSelector } from '@/store/hooks';
import chatbotCharacter from '@/assets/images/chatbot.png';
import NextImage from '@/component/common/NextImage';

interface ReportDoc {
  title?: string;
  assistant?: {
    recommendInfo?: recommendClothes[];
    products?: trendClothes[];
  };
  user?: {
    QA_select?: {
      selectLabel: string;
      step: number | string;
    }[];
  };
}

interface ReportProduct extends trendClothes {
  summary?: string;
  keyPoints?: string[];
  stylingTip?: string;
}

const VALUE_LABEL: Record<string, string> = {
  tops: '상의',
  top: '상의',
  bottoms: '하의',
  bottom: '하의',
  shoes: '신발/잡화',
  outer: '아우터',
  male: '남성',
  female: '여성',
  unisex: '상관없음',
  default: '남녀공용',
  '50000': '5만원 이하',
  '100000': '10만원 이하',
  '200000': '20만원 이하',
  whatever: '상관없음',
  popular: '트렌드/인기도',
  cheap: '가성비',
  rating: '실구매자 만족도 (평점 4.5점 이상)',
  office: '오피스룩',
  sportify: '스포티/운동룩',
  street: '스트릿룩',
  minimal: '미니멀룩',
  vintage: '빈티지룩',
};

const toConditionLabel = (
  value: string,
  optionCollection: Record<string, { label: string; value: string }[]>
) => {
  const fromOptions = (
    Object.values(optionCollection) as { label: string; value: string }[][]
  )
    .flat()
    .find(option => option.value === value)?.label;

  if (fromOptions) return fromOptions;
  if (VALUE_LABEL[value]) return VALUE_LABEL[value];
  if (/^\d+$/.test(value))
    return `${Math.floor(Number(value) / 10000)}만원 이하`;
  return value;
};

const toHashTag = (label: string) => `#${label.replace(/\s+/g, '')}`;

const Report = () => {
  const reportId = useAppSelector(state => state.chatBubble.reportId);
  const optionCollection = useAppSelector(
    state => state.chatBubble.optionCollection
  );

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ReportDoc | null>(null);

  useEffect(() => {
    if (!reportId) {
      setReport(null);
      return;
    }

    let cancelled = false;

    const loadReport = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(
          doc(collection(db, 'recent-chats'), reportId)
        );
        if (!cancelled) {
          setReport(snap.exists() ? (snap.data() as ReportDoc) : null);
        }
      } catch (error) {
        console.error('컨설팅 리포트 조회 오류:', error);
        if (!cancelled) setReport(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadReport();
    return () => {
      cancelled = true;
    };
  }, [reportId]);

  const conditionTags = useMemo(() => {
    const answers = report?.user?.QA_select ?? [];
    return answers
      .filter(item => item.selectLabel)
      .map(item =>
        toHashTag(toConditionLabel(item.selectLabel, optionCollection))
      );
  }, [report, optionCollection]);

  const products = useMemo<ReportProduct[]>(() => {
    const list = report?.assistant?.products ?? [];
    const infos = report?.assistant?.recommendInfo ?? [];

    return list.map(product => {
      const info = infos.find(item => item.productId === product.productId);
      return {
        ...product,
        summary: info?.summary,
        keyPoints: info?.keyPoints ?? [],
        stylingTip: info?.stylingTip,
      };
    });
  }, [report]);

  return (
    <CSS.ReportView>
      <div className="report-hero">
        <h1 className="report-hero__title">Trendly AI 컨설팅 리포트</h1>
        <div className="report-hero__mascot">
          <Image
            src={chatbotCharacter}
            alt=""
            width={168}
            height={64}
            priority
          />
        </div>
      </div>

      <section className="report-section">
        <h2 className="report-section__title">선택 스타일 조건</h2>
        <ul className="report-tags">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <li
                  key={`tag-skel-${index}`}
                  className="report-tag is-skeleton"
                />
              ))
            : conditionTags.map(tag => (
                <li key={tag} className="report-tag">
                  {tag}
                </li>
              ))}
        </ul>
      </section>

      <section className="report-section">
        <h2 className="report-section__title">추천 상품 목록</h2>

        {loading && (
          <ul className="report-products">
            {Array.from({ length: 2 }).map((_, index) => (
              <li key={`product-skel-${index}`} className="report-product">
                <div className="report-product__thumb is-skeleton" />
                <div className="report-product__body">
                  <span className="skel-line" />
                  <span className="skel-line is-short" />
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && products.length === 0 && (
          <p className="report-empty">저장된 추천 상품이 없습니다.</p>
        )}

        {!loading && products.length > 0 && (
          <ul className="report-products">
            {products.map(item => (
              <li key={item.productId} className="report-product">
                <button
                  type="button"
                  className="report-product__main"
                  onClick={() => item.link && window.open(item.link, '_blank')}
                >
                  <div className="report-product__thumb">
                    <NextImage
                      src={item.thumbnail}
                      width={132}
                      height={176}
                      alt={item.title || '추천 의류'}
                    />
                  </div>

                  <div className="report-product__body">
                    <h3 className="report-product__title" title={item.title}>
                      {item.title}
                    </h3>
                    <span className="report-product__brand">{item.brand}</span>

                    {item.keyPoints && item.keyPoints.length > 0 && (
                      <div className="report-keypoints">
                        <span className="report-keypoints__label">
                          <HiSparkles />
                          의류 키포인트
                        </span>
                        <ul className="report-keypoints__list">
                          {item.keyPoints.map(point => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </button>

                {(item.stylingTip || item.summary) && (
                  <div className="report-tip">
                    {item.stylingTip && (
                      <p className="report-tip__lead">
                        <HiOutlineLightBulb />
                        {item.stylingTip}
                      </p>
                    )}
                    {item.summary && (
                      <p className="report-tip__desc">{item.summary}</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </CSS.ReportView>
  );
};

export default Report;
