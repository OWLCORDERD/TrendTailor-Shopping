'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { ModalContext } from '../../../../../context/ModalContext';
import chatbotCharacter from '@/assets/images/chatbot.png';
import { db } from '@/shared/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Loading from '../../Loading';
import { openReport } from '@/store/chatBubbleSlice';

const RecentChats = () => {
  // 로그인 사용자만 접근 가능 > 사용자 정보 조회
  const { data: session } = useSession();
  const { contents, modalClose } = useContext(ModalContext);
  const dispatch = useDispatch();

  const [recentData, setRecentData] = useState<recentChatsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    if (!id) return;
    dispatch(openReport({ id, from: 'history' }));
    modalClose?.();
  };

  const { data } = useSession();

  // 2026.01.14: 현재 로그인 사용자 최근 채팅 내역 조회
  const currentUserRecentListLoad = async () => {
    setLoading(true);

    try {
      // 조회 컬렉션 경로
      const collectionRef = collection(db, 'recent-chats');

      // 조회 조건 쿼리
      const selectQuery = query(
        collectionRef,
        where('user.info.email', '==', data?.user?.email)
      );

      // 쿼리 참조하여 컬렉션 내부 문서 조회
      const querySnapshot = await getDocs(selectQuery);

      if (querySnapshot.empty) {
        setLoading(false);
        throw new Error('최근 채팅 내역이 없습니다.');
      }

      const snapShotData: any = [];
      querySnapshot.forEach(doc => {
        const data = doc.data(); // 문서 데이터

        // 조회 문서 아이디와 데이터 함께 저장 처리
        snapShotData.push({
          id: doc.id,
          ...data,
        });
      });

      setRecentData(snapShotData);
    } catch (err) {
      console.error('최근 채팅 내역 불러오기 오류', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    currentUserRecentListLoad();
  }, [session]);

  const dateFormat = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };

  return (
    <div className="recent-chats">
      <div className="recent-chats__intro">
        <div className="recent-chats__intro-box">
          <h2 className="recent-chats__greeting">
            반갑습니다, <strong>{session?.user?.name}님</strong>
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
        <h3 className="recent-chats__section-title">최근 대화 내역</h3>
        <button type="button" className="recent-chats__mute">
          Mute all
        </button>
      </div>

      {loading && <Loading />}

      <ul className="recent-chats__grid">
        {recentData.map(item => (
          <li key={item.id} className="recent-chats__card">
            <button
              type="button"
              className="recent-chats__card-btn"
              onClick={() => handleSelect(item.id?.toString() ?? '')}
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
                <span className="recent-chats__card-desc">{item.priority}</span>
                <time className="recent-chats__card-date">
                  {item.createdAt}
                </time>
              </div>

              <div className="recent-chats__thumb">
                <div className="recent-chats__thumb-fallback">
                  <Image
                    src={item.assistant.products[0].thumbnail}
                    alt=""
                    width={40}
                    height={40}
                  />
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
