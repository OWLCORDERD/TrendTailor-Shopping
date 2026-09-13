'use client';

import Intro from '@/component/trendlyAI/mode/Intro';
import Consultant from '@/component/trendlyAI/mode/Consultant/Consultant';
import Report from '@/component/trendlyAI/mode/Report';
import React, { useContext } from 'react';
import { useAppSelector } from '@/store/hooks';
import { IoChevronBack, IoClose } from 'react-icons/io5';
import { IoReturnUpForwardSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import {
  changeMode,
  chatClose,
  closeClothesDetail,
  closeReport,
} from '@/store/chatBubbleSlice';
import { TiHome } from 'react-icons/ti';
import { GoHistory } from 'react-icons/go';
import { ModalContext } from '../../../context/ModalContext';
import { useSession } from 'next-auth/react';

const Container = () => {
  const chatMode = useAppSelector(state => state.chatBubble.mode);
  const clothesDetailMode = useAppSelector(
    state => state.chatBubble.clothesDetailMode
  );
  const reportFrom = useAppSelector(state => state.chatBubble.reportFrom);
  const dispatch = useDispatch();
  const { modalOpen } = useContext(ModalContext);
  const { status } = useSession();

  const dynamicImport = () => {
    switch (chatMode) {
      case 'consultant':
        return <Consultant />;
      case 'report':
        return <Report />;
      default:
        return <Intro />;
    }
  };

  const introMode: any = {
    mode: 'intro',
  };

  const openRecentChatsModal = () => {
    if (status === 'authenticated') {
      modalOpen?.({
        title: 'User history',
        content: '이전에 진행했던 컨설팅·채팅 내역을 이어서 확인할 수 있어요.',
        type: 'recent-chats',
        dynamicComponent: 'RecentChats',
      });
    } else {
      modalOpen?.({
        title: '로그인 후 이용 가능합니다.',
        type: 'login',
        dynamicComponent: 'Login',
      });
    }
  };

  const handleReportBack = () => {
    const from = reportFrom;
    dispatch(closeReport());
    if (from === 'history') {
      openRecentChatsModal();
    }
  };

  return (
    <div
      className={`modal trendly${chatMode === 'report' ? ' is-report' : ''}`}
    >
      <div className="modal-header">
        {chatMode === 'report' ? (
          <>
            <button
              type="button"
              className="back-btn"
              onClick={handleReportBack}
            >
              <IoChevronBack />
              뒤로가기
            </button>
            <button
              type="button"
              className="close-btn is-pill"
              onClick={() => dispatch(chatClose())}
            >
              Close
            </button>
          </>
        ) : clothesDetailMode ? (
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(closeClothesDetail())}
            style={{ transform: 'rotate(180deg)' }}
          >
            <IoReturnUpForwardSharp />
          </button>
        ) : (
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(chatClose())}
          >
            <IoClose />
          </button>
        )}

        {chatMode !== 'report' && (
          <button
            type="button"
            className="chat-history"
            onClick={openRecentChatsModal}
          >
            <GoHistory fontSize={18} />
            <span className="txt">채팅 내역</span>
          </button>
        )}
      </div>

      {dynamicImport()}

      {chatMode === 'consultant' && (
        <div className="modal-footer">
          <button
            type="button"
            className="home-btn"
            onClick={() => dispatch(changeMode(introMode.mode))}
          >
            <TiHome />
          </button>
        </div>
      )}
    </div>
  );
};

export default Container;
