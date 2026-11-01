'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay } from 'swiper/modules';
import 'styles/swiper/swiper.css';
import { MyHome as CSS } from '@/styles';
import NextImage from '@/component/common/NextImage';
import { ConsultingHistory } from '@/feature/mypage/mypage.service';
import { formatDate, revealGroup, revealItem, revealViewport, useReveal } from './reveal';

interface propsType {
  latest: ConsultingHistory | null;
  conditions: string[]; // 최근 컨설팅 설문 조건 라벨
  loading: boolean;
}

// 2026.10.25. 마이홈 > 가장 최근 AI 컨설팅 결과 (추천 의류 + Trendly 코멘트)
const ConsultingFeature = ({ latest, conditions, loading }: propsType) => {
  const reduce = useReducedMotion();
  const comment = latest?.recommendInfo?.[0];
  const reveal = useReveal();

  return (
    <CSS.Consulting id='consulting' aria-labelledby='consulting-title'>
      <motion.div
        {...reveal}
        variants={revealGroup(reduce)}
        initial='hidden'
        whileInView='show'
        viewport={revealViewport}
      >
        <motion.div className='section-head' variants={revealItem(reduce)}>
          <div>
            <h2 id='consulting-title'>최근 AI 컨설팅 결과</h2>
            <p>Trendly가 내 설문 답변과 이번 달 트렌드 의류를 맞춰 고른 추천 목록이에요.</p>
          </div>
        </motion.div>

        {loading && (
          <motion.div
            className='skeleton-block'
            style={{ height: 420 }}
            variants={revealItem(reduce)}
          />
        )}

        {!loading && !latest && (
          <motion.div className='consulting-empty' variants={revealItem(reduce)}>
            <p>아직 받은 컨설팅이 없어요. 설문 다섯 개로 이번 달 트렌드에 맞는 옷을 추천받아 보세요.</p>
            <Link href='/trendly' className='text-link'>
              Trendly에게 컨설팅 받기
            </Link>
          </motion.div>
        )}

        {!loading && latest && (
          <motion.div className='consulting-sheet' variants={revealItem(reduce)}>
            <div className='consulting-summary'>
              <h3>{latest.title}</h3>
              <time dateTime={latest.createdAt}>{formatDate(latest.createdAt)} 컨설팅</time>
              {conditions.length > 0 && (
                <p className='conditions'>{conditions.join(' · ')}</p>
              )}
              {comment?.summary && (
                <blockquote>
                  {comment.summary}
                  <cite>Trendly 추천 코멘트</cite>
                </blockquote>
              )}
            </div>

            {/* 2026.10.25. 추천 의류 슬라이드
            - 초기 렌더링 시 3.5초 간격 자동 슬라이드, loop 없이 마지막 슬라이드에서 정지
            - 모션 최소화 설정 시 자동 슬라이드 비활성화 */}
            <motion.div className='product-strip' variants={revealGroup(reduce)}>
              <Swiper
                modules={[Autoplay, A11y]}
                loop={false}
                autoplay={
                  reduce
                    ? false
                    : {
                        delay: 3500,
                        stopOnLastSlide: true,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }
                }
                slidesPerView={1.6}
                spaceBetween={16}
                speed={reduce ? 0 : 600}
                breakpoints={{
                  768: { slidesPerView: 2.5 },
                  1250: { slidesPerView: 3.2 },
                }}
                a11y={{
                  containerMessage: '추천 의류 목록',
                  prevSlideMessage: '이전 의류',
                  nextSlideMessage: '다음 의류',
                }}
              >
                {latest.products.map(product => (
                  <SwiperSlide key={product.productId}>
                    <motion.div variants={revealItem(reduce)}>
                      <a
                        className='product'
                        href={product.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <div className='product__thumb'>
                          <NextImage src={product.thumbnail} alt={product.title} width={320} height={400} />
                        </div>
                        <span className='product__brand'>{product.brand}</span>
                        <span className='product__title'>{product.title}</span>
                        <span className='product__price'>
                          {Number(product.price).toLocaleString('ko-KR')}원
                        </span>
                      </a>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </CSS.Consulting>
  );
};

export default ConsultingFeature;
