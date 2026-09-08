'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ModalContext } from '../../../../../context/ModalContext';
import chatbotCharacter from '@/assets/images/chatbot.png';

/** 초안 퍼블리싱용 더미 데이터 (추후 Firestore recent-chats 연동) */
const DRAFT_HISTORY = [
  {
    id: 'draft-1',
    title: '한갈라소 재발보님,',
    description: '스포티 룩 컨설팅 · 아우터 추천',
    type: 'consulting',
    createdAt: '2026.03.12',
    thumbnail: null,
  },
  {
    id: 'draft-2',
    title: '미니멀 오피스룩',
    description: '가성비 중심 · 상의 추천',
    type: 'consulting',
    createdAt: '2026.03.08',
    thumbnail: null,
  },
  {
    id: 'draft-3',
    title: '스트릿 캐주얼',
    description: '인기 브랜드 · 하의 매칭',
    type: 'consulting',
    createdAt: '2026.02.27',
    thumbnail: null,
  },
  {
    id: 'draft-4',
    title: '빈티지 데일리',
    description: '웜톤 키워드 · 아우터',
    type: 'chat',
    createdAt: '2026.02.20',
    thumbnail: null,
  },
  {
    id: 'draft-5',
    title: '여름 레이어드',
    description: '쿨톤 · 상의 추천',
    type: 'consulting',
    createdAt: '2026.02.14',
    thumbnail: null,
  },
  {
    id: 'draft-6',
    title: '주말 아웃핏',
    description: '캐주얼 · 세트 매칭',
    type: 'chat',
    createdAt: '2026.02.01',
    thumbnail: null,
  },
];

const RecentChats = () => {
  const { data: session } = useSession();
  const { contents, modalClose } = useContext(ModalContext);
  const router = useRouter();

  const userName = session?.user?.name ?? '회원';

  const handleSelect = (id: string) => {
    // modalClose?.();
    alert('준비 중입니다.');
    // router.push(`/trendly/${id}`);
  };

  return (
    <div className="recent-chats">
      <div className="recent-chats__intro">
        <div className="recent-chats__intro-box">
          <h2 className="recent-chats__greeting">
            반갑습니다, <strong>{userName}님</strong>
          </h2>
          <p className="recent-chats__sub">
            {contents?.description ||
              '이전에 진행했던 컨설팅·채팅 내역을 이어서 확인할 수 있어요.'}
          </p>
        </div>

        <div className="recent-chats_intro-icon">
          <Image src={chatbotCharacter} alt="" width={210} height={80} />
        </div>
      </div>

      <div className="recent-chats__section-head">
        <h3 className="recent-chats__section-title">User history</h3>
        <button type="button" className="recent-chats__mute">
          Mute all
        </button>
      </div>

      <ul className="recent-chats__grid">
        {DRAFT_HISTORY.map(item => (
          <li key={item.id} className="recent-chats__card">
            <button
              type="button"
              className="recent-chats__card-btn"
              onClick={() => handleSelect(item.id)}
            >
              <div className="recent-chats__card-body">
                <span
                  className={`recent-chats__badge ${
                    item.type === 'consulting' ? 'is-consult' : 'is-chat'
                  }`}
                >
                  {item.type === 'consulting' ? '컨설팅' : '채팅'}
                </span>
                <strong className="recent-chats__card-title">
                  {item.title}
                </strong>
                <span className="recent-chats__card-desc">
                  {item.description}
                </span>
                <time className="recent-chats__card-date">
                  {item.createdAt}
                </time>
              </div>

              <div className="recent-chats__thumb">
                <div className="recent-chats__thumb-fallback">
                  <Image src={chatbotCharacter} alt="" width={40} height={40} />
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentChats;
