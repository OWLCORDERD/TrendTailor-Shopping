'use client';

import Intro from '@/component/trendlyAI/mode/Intro';
import Consultant from '@/component/trendlyAI/mode/Consultant/Consultant';
import React, { useContext } from 'react';
import { useAppSelector } from '@/store/hooks';
import { IoClose, IoReturnUpForwardSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import {
  changeMode,
  chatClose,
  closeClothesDetail,
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
  const dispatch = useDispatch();
  const { modalOpen } = useContext(ModalContext);
  const { status, data: session } = useSession();
  const dynamicImport = () => {
    switch (chatMode) {
      case 'consultant':
        return <Consultant />;
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

  return (
    <div className="modal trendly">
      <div className="modal-header">
        {clothesDetailMode ? (
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

        <button
          type="button"
          className="chat-history"
          onClick={openRecentChatsModal}
        >
          <GoHistory fontSize={18} />
          <span className="txt">채팅 내역</span>
        </button>
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
