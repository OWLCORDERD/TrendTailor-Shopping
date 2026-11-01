'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';
import { MyHome as CSS } from '@/styles';
import { ConsultingHistory } from '@/feature/mypage/mypage.service';
import { formatDate, revealGroup, revealItem, revealViewport } from './reveal';

const VISIBLE_COUNT = 8;

interface propsType {
  history: ConsultingHistory[];
  conditionsOf: (item: ConsultingHistory) => string[];
  loading: boolean;
}

// 2026.10.25. 마이홈 > 최근 활동 (컨설팅 이력 타임라인)
const ActivityList = ({ history, conditionsOf, loading }: propsType) => {
  const reduce = useReducedMotion();
  const visible = history.slice(0, VISIBLE_COUNT);

  return (
    <CSS.Activity id='activity' aria-labelledby='activity-title'>
      <motion.div
        variants={revealGroup(reduce)}
        initial='hidden'
        whileInView='show'
        viewport={revealViewport}
      >
        <motion.div className='section-head' variants={revealItem(reduce)}>
          <div>
            <h2 id='activity-title'>최근 활동</h2>
            <p>지난 컨설팅을 다시 열어 추천 의류와 리포트를 확인할 수 있어요.</p>
          </div>
        </motion.div>

        {loading && (
          <motion.div className='skeleton-block' style={{ height: 320 }} variants={revealItem(reduce)} />
        )}

        {!loading && history.length === 0 && (
          <motion.p className='activity-note' variants={revealItem(reduce)}>
            기록된 활동이 없습니다.
          </motion.p>
        )}

        {!loading && history.length > 0 && (
          <motion.ol variants={revealGroup(reduce)}>
            {visible.map(item => (
              <motion.li key={item.id} variants={revealItem(reduce)}>
                <Link href={'/mypage'} className='activity-item'>
                  <time dateTime={item.createdAt}>{formatDate(item.createdAt).slice(5)}</time>
                  <div>
                    <p className='activity-item__title'>{item.title}</p>
                    <p className='activity-item__sub'>
                      추천 의류 {item.products.length}벌 · {conditionsOf(item).slice(1).join(' · ')}
                    </p>
                  </div>
                  <IoArrowForward className='activity-item__go' aria-hidden='true' />
                </Link>
              </motion.li>
            ))}
          </motion.ol>
        )}

        {history.length > VISIBLE_COUNT && (
          <p className='activity-note'>
            전체 {history.length}건 중 최근 {VISIBLE_COUNT}건을 보여드려요.
          </p>
        )}
      </motion.div>
    </CSS.Activity>
  );
};

export default ActivityList;
