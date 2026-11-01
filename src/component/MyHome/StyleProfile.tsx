'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MyHome as CSS } from '@/styles';
import { StyleProfile as StyleProfileType } from '@/feature/mypage/mypage.service';
import { revealGroup, revealItem, revealViewport } from './reveal';

interface propsType {
  profile: StyleProfileType;
  loading: boolean;
}

// 2026.10.25. 마이홈 > 컨설팅 설문 답변 집계 기반 스타일 프로필
const StyleProfile = ({ profile, loading }: propsType) => {
  const reduce = useReducedMotion();
  const maxCount = profile.keywords[0]?.count ?? 1;
  const hasProfile = profile.keywords.length > 0;

  return (
    <CSS.Style id='style' aria-labelledby='style-title'>
      <motion.div
        variants={revealGroup(reduce)}
        initial='hidden'
        whileInView='show'
        viewport={revealViewport}
      >
        <motion.div className='section-head' variants={revealItem(reduce)}>
          <div>
            <h2 id='style-title'>내 스타일 프로필</h2>
            <p>컨설팅에서 고른 답변을 모아 자주 찾는 트렌드를 정리했어요.</p>
          </div>
        </motion.div>

        {loading && (
          <motion.div className='skeleton-block' style={{ height: 320 }} variants={revealItem(reduce)} />
        )}

        {!loading && (
          <motion.div className='style-sheet' variants={revealItem(reduce)}>
            {!hasProfile && (
              <p className='style-empty'>
                컨설팅을 받으면 자주 고른 트렌드 키워드와 선호 조건이 여기에 쌓여요.
              </p>
            )}

            {hasProfile && (
              <>
                <ul className='keyword-bars' aria-label='자주 고른 트렌드 키워드'>
                  {profile.keywords.map(keyword => (
                    <li key={keyword.name}>
                      <div className='bar-label'>
                        <span>{keyword.name}</span>
                        <span>{keyword.count}회</span>
                      </div>
                      <div className='bar-track'>
                        <motion.div
                          className='bar-fill'
                          initial={{ scaleX: reduce ? keyword.count / maxCount : 0 }}
                          whileInView={{ scaleX: keyword.count / maxCount }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className='style-facts'>
                  <div>
                    <dt>자주 찾는 의류</dt>
                    <dd>{profile.category || '-'}</dd>
                  </div>
                  <div>
                    <dt>주로 고른 예산</dt>
                    <dd>{profile.budget || '-'}</dd>
                  </div>
                  <div>
                    <dt>추천 기준</dt>
                    <dd>{profile.priority || '-'}</dd>
                  </div>
                </dl>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </CSS.Style>
  );
};

export default StyleProfile;
