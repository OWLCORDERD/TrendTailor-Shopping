import Container from '@/component/trendlyAI/Container';
import { Component } from 'react';
import { styled, StyledObject } from 'styled-components';
import { motion } from 'framer-motion';

const styleOptions = {
  ContainerStyle: {
    padding: '3rem 0',
  } as StyledObject, // 컨테이너 wrapper

  Intro: {
    marginBottom: '6.25rem',
    '.title': {
      display: 'block',
      maxWidth: '30rem',
      wordBreak: 'keep-all',
      fontFamily: 'Raleway, sans-serif',
      fontSize: '32px',
      color: '#fff',
      textTransform: 'uppercase',
      margin: '2rem 0 5rem 0',
    },

    '.description': {
      display: 'block',
      maxWidth: '30rem',
      wordBreak: 'keep-all',
      fontSize: '16px',
      fontWeight: '400',
      color: '#fff',
    },
  } as StyledObject, // 인트로 대제목, 내용

  Contents: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    '@media screen and (max-width: 1250px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '6.25rem',
    },
  } as StyledObject, // 샘플 채팅 및 결과 UI wrapper

  SampleChat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    width: 'calc(100% - 750px)',

    '@media screen and (max-width: 1250px)': {
      width: '100%',
    },
  } as StyledObject, // 샘플 채팅 UI wrapper

  UserBubble: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',

    '.profile': {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '.bubble': {
      width: 'calc(100% - 120px)',
      padding: '1.5rem 2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '20px',
      fontSize: '16px',
      color: '#fff',
    },
  } as StyledObject, // 사용자 채팅 버블

  GenerateBubble: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6rem',
    backgroundColor: '#fff',
    borderRadius: '20px',
    fontSize: '16px',
  } as StyledObject, // 생성 중인 채팅 버블

  AgentBubble: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '.profile': {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '.bubble': {
      width: 'calc(100% - 120px)',
      padding: '1.5rem 2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: '20px',
      fontSize: '16px',
      color: '#fff',
      wordBreak: 'keep-all',
    },
  } as StyledObject, // 에이전트 채팅 버블

  SampleResult: {
    position: 'relative',
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '700px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '0 1.5rem',
    overflow: 'hidden',

    '& > img': {
      height: 'auto',
    },

    '@media screen and (max-width: 1250px)': {
      width: '100%',
    },
  } as StyledObject, // 샘플 결과 UI wrapper
};

const TrendTailorAI = {
  Container: styled(motion.section)(styleOptions.ContainerStyle),
  Intro: styled.div(styleOptions.Intro),
  Contents: styled.div(styleOptions.Contents),
  SampleChat: styled(motion.div)(styleOptions.SampleChat),
  UserBubble: styled(motion.div)(styleOptions.UserBubble),
  AgentBubble: styled(motion.div)(styleOptions.AgentBubble),
  GenerateBubble: styled(motion.div)(styleOptions.GenerateBubble),
  SampleResult: styled(motion.div)(styleOptions.SampleResult),
};

export { TrendTailorAI };
