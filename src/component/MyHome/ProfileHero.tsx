'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { IoArrowForward } from 'react-icons/io5';
import { MyHome as CSS } from '@/styles';
import useCountUp from '@/hooks/useCountUp';
import { formatDate, revealGroup, revealItem } from './reveal';
import {chatOpen, changeMode } from '@/feature/store/chatBubbleSlice';
import { useAppDispatch } from '@/feature/store/hooks';
import { PayloadAction } from '@reduxjs/toolkit';

interface propsType {
  name: string;
  email: string;
  image?: string;
  isAdmin: boolean;
  consultingCount: number;
  productCount: number;
  lastConsultingAt: string;
  loading: boolean;
}

// 2026.10.25. 마이홈 상단 > 내 정보 및 컨설팅 요약 지표
const ProfileHero = ({
  name,
  email,
  image,
  isAdmin,
  consultingCount,
  productCount,
  lastConsultingAt,
  loading,
}: propsType) => {
  const reduce = useReducedMotion();
  const consultingValue = useCountUp(loading ? 0 : consultingCount);
  const productValue = useCountUp(loading ? 0 : productCount);

  const dispatch = useAppDispatch();

  const chatPopupOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await dispatch(chatOpen());

    requestAnimationFrame(() => {
      dispatch(changeMode({ mode: 'consultant', user: name } as any));
    });
  }

  return (
    <CSS.Profile aria-labelledby='myhome-title'>
      <motion.div
        className='profile-who'
        variants={revealGroup(reduce)}
        initial='hidden'
        animate='show'
      >
        <motion.div className='profile-avatar' variants={revealItem(reduce)}>
          {image ? (
            <Image src={image} alt={`${name} 프로필 이미지`} width={88} height={88} />
          ) : (
            <span aria-hidden='true'>{name.slice(0, 1)}</span>
          )}
        </motion.div>

        <motion.h1 id='myhome-title' variants={revealItem(reduce)}>
          {name}님의 마이홈
        </motion.h1>

        <motion.p className='profile-meta' variants={revealItem(reduce)}>
          {email}
          <br />
          <strong>{isAdmin ? '관리자' : '일반 회원'}</strong> 계정으로 로그인했어요.
        </motion.p>

        <motion.div variants={revealItem(reduce)}>
          <button type="button" className='profile-action' onClick={(e) => chatPopupOpen(e)}>
            새 AI 컨설팅 받기
            <IoArrowForward aria-hidden='true' />
          </button>
        </motion.div>
      </motion.div>

      <motion.dl
        className='profile-stats'
        variants={revealGroup(reduce)}
        initial='hidden'
        animate='show'
      >
        <motion.div variants={revealItem(reduce)}>
          <dt>AI 컨설팅</dt>
          <dd>
            {consultingValue}
            <small>회</small>
          </dd>
        </motion.div>
        <motion.div variants={revealItem(reduce)}>
          <dt>추천받은 의류</dt>
          <dd>
            {productValue}
            <small>벌</small>
          </dd>
        </motion.div>
        <motion.div variants={revealItem(reduce)}>
          <dt>마지막 컨설팅</dt>
          <dd>
            {loading || !lastConsultingAt ? '-' : formatDate(lastConsultingAt).slice(2)}
          </dd>
        </motion.div>
      </motion.dl>
    </CSS.Profile>
  );
};

export default ProfileHero;
