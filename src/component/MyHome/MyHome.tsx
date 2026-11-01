'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MyHome as CSS } from '@/styles';
import { useAppSelector } from '@/feature/store/hooks';
import {
  buildStyleProfile,
  ConsultingHistory,
  getMyConsultingHistory,
  toConditionLabels,
} from '@/feature/mypage/mypage.service';
import ProfileHero from './ProfileHero';
import ConsultingFeature from './ConsultingFeature';
import ActivityList from './ActivityList';
import StyleProfile from './StyleProfile';
import AdminPipeline from './AdminPipeline';

// 2026.10.25. 마이홈 페이지 (내 정보 · AI 컨설팅 결과 · 최근 활동 · 스타일 프로필 · 관리자 수집)
const MyHome = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const optionCollection = useAppSelector(state => state.chatBubble.optionCollection);

  const [history, setHistory] = useState<ConsultingHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('consulting');

  const isAdmin = session?.user?.role === 'admin';

  // 비로그인 사용자는 로그인 페이지로 이동
  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.email) return;

    let cancelled = false;

    const loadHistory = async () => {
      setLoading(true);
      try {
        const result = await getMyConsultingHistory(session.user.email);
        if (!cancelled) setHistory(result);
      } catch (err) {
        console.error('컨설팅 이력 조회 오류', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadHistory();
    return () => {
      cancelled = true;
    };
  }, [status, session?.user?.email]);

  const sections = useMemo(
    () => [
      { id: 'consulting', label: 'AI 컨설팅 결과' },
      { id: 'activity', label: '최근 활동' },
      { id: 'style', label: '스타일 프로필' },
      ...(isAdmin ? [{ id: 'admin', label: '데이터 수집 관리' }] : []),
    ],
    [isAdmin]
  );

  // 화면에 들어온 섹션을 바로가기 메뉴에 활성 표시
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, status]);

  const conditionsOf = useCallback(
    (item: ConsultingHistory) => toConditionLabels(item.QA_select, optionCollection),
    [optionCollection]
  );

  const latest = history[0] ?? null;
  const styleProfile = useMemo(
    () => buildStyleProfile(history, optionCollection),
    [history, optionCollection]
  );
  const productCount = useMemo(
    () => history.reduce((sum, item) => sum + item.products.length, 0),
    [history]
  );

  if (status !== 'authenticated') {
    return (
      <CSS.Page>
        <div className='skeleton-block' style={{ height: 360 }} />
      </CSS.Page>
    );
  }

  return (
    <CSS.Page className='myhome-container'>
      <ProfileHero
        name={session.user.name ?? '회원'}
        email={session.user.email}
        image={session.user.image}
        isAdmin={isAdmin}
        consultingCount={history.length}
        productCount={productCount}
        lastConsultingAt={latest?.createdAt ?? ''}
        loading={loading}
      />

      <div className='myhome-body'>
        <CSS.Rail aria-label='마이홈 바로가기'>
          <ul>
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={activeSection === section.id ? 'is-active' : ''}
                  aria-current={activeSection === section.id ? 'true' : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </CSS.Rail>

        <div className='myhome-content'>
          <ConsultingFeature
            latest={latest}
            conditions={latest ? conditionsOf(latest) : []}
            loading={loading}
          />

          <div className='myhome-split'>
            <ActivityList history={history} conditionsOf={conditionsOf} loading={loading} />
            <StyleProfile profile={styleProfile} loading={loading} />
          </div>

          {isAdmin && <AdminPipeline />}
        </div>
      </div>
    </CSS.Page>
  );
};

export default MyHome;
