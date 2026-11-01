'use client';

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MyHome as CSS } from '@/styles';
import { AlertToast } from '@/hooks/useToastify';
import { ModalContext } from '../../../context/ModalContext';
import { generateTrendKeywordJobs } from '@/feature/trend/jobs/generate-keyword.jobs';
import {
  collectClothesByKeywordSteps,
  CollectStep,
  CollectStepStatus,
} from '@/feature/trend/jobs/collect-clothes.jobs';
import {
  TrendClothesRepository,
  TrendKeywordRepository,
} from '@/feature/trend/repositories/trend.repository';
import { revalidateDashboard } from '@/feature/trend/actions/revalidate-dashboard.action';
import { formatDate, revealGroup, revealItem, revealViewport } from './reveal';

type runningType = 'idle' | 'keyword' | 'clothes';
type logTone = 'running' | 'done' | 'failed';

interface pipelineMeta {
  keywordCount: number;
  clothesCount: number;
  latestUpdatedAt: Date | null;
}

const SERPAPI_MONTHLY_LIMIT = 250; // SerpApi 무료 플랜 월 검색 한도

const STATUS_LABEL: Record<CollectStepStatus, string> = {
  pending: '대기',
  running: '수집 중',
  done: '완료',
  empty: '결과 없음',
  failed: '저장 실패',
};

/**
 * 2026.10.25. 관리자 마이홈 > 월별 데이터 수집 파이프라인 수동 실행
 * - Vercel Hobby 플랜 함수 실행 시간 제한으로 cron 일괄 실행이 불가하여 클라이언트에서 단계별 호출
 * - 의류 수집은 키워드마다 짧은 요청(/api/serpApi)으로 나눠 실행하고 즉시 저장
 */
const AdminPipeline = () => {
  const reduce = useReducedMotion();
  const { modalOpen } = useContext(ModalContext);

  const [meta, setMeta] = useState<pipelineMeta>({
    keywordCount: 0,
    clothesCount: 0,
    latestUpdatedAt: null,
  });
  const [running, setRunning] = useState<runningType>('idle');
  const [steps, setSteps] = useState<CollectStep[]>([]);
  const [logs, setLogs] = useState<{ time: string; text: string; tone: logTone }[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const pushLog = (text: string, tone: logTone) => {
    const time = new Date().toLocaleTimeString('ko-KR', { hour12: false });
    setLogs(prev => [{ time, text, tone }, ...prev].slice(0, 20));
  };

  // 저장된 키워드 · 의류 현황 조회
  const loadMeta = useCallback(async () => {
    try {
      const keywordRepository = new TrendKeywordRepository();
      const [keywords, clothesCount] = await Promise.all([
        keywordRepository.getTrendKeywordDocs(),
        new TrendClothesRepository().getClothesCount(),
      ]);

      setMeta({
        keywordCount: keywords.length,
        clothesCount,
        latestUpdatedAt: keywordRepository.getLatestUpdatedAt(keywords),
      });
    } catch (err) {
      console.error('수집 현황 조회 오류', err);
    }
  }, []);

  useEffect(() => {
    loadMeta();
  }, [loadMeta]);

  // 2026.11.01 수집 결과를 메인 대시보드(ISR)에 반영하기 위해 캐시 무효화 요청
  const refreshDashboard = async () => {
    try {
      const result = await revalidateDashboard();
      pushLog(result.message, result.success ? 'done' : 'failed');
    } catch (err) {
      console.error('메인 대시보드 갱신 요청 오류', err);
      pushLog('메인 대시보드 갱신 요청에 실패했습니다.', 'failed');
    }
  };

  // 수집 중 페이지 이탈 시 경고 (클라이언트에서 순차 호출하므로 이탈하면 중단됨)
  useEffect(() => {
    if (running === 'idle') return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [running]);

  // 1단계. 트렌드 키워드 생성 (OpenAI)
  const runKeywords = async () => {
    setRunning('keyword');
    pushLog('트렌드 키워드 생성 요청 (OpenAI)', 'running');

    const result = await generateTrendKeywordJobs();
    const success = Boolean(result?.success);

    pushLog(result?.message ?? '트렌드 키워드 생성 실패', success ? 'done' : 'failed');
    if (success) await refreshDashboard();
    await loadMeta();
    setRunning('idle');

    return success;
  };

  // 2단계. 키워드별 의류 수집 (SerpApi)
  const runClothes = async () => {
    const controller = new AbortController();
    abortRef.current = controller;

    setRunning('clothes');
    setSteps([]);
    pushLog('키워드별 의류 수집 시작 (SerpApi)', 'running');

    try {
      const result = await collectClothesByKeywordSteps({
        onReady: setSteps,
        onStep: (index, step) =>
          setSteps(prev => prev.map((item, idx) => (idx === index ? step : item))),
        signal: controller.signal,
      });

      pushLog(result.message, result.success ? 'done' : 'failed');
      AlertToast({
        str: result.message,
        type: result.success ? 'success' : 'warning',
        theme: 'dark',
      });
    } catch (err) {
      console.error(err);
      pushLog('의류 수집 파이프라인 내부 오류가 발생하였습니다.', 'failed');
    }

    abortRef.current = null;
    // 중단 · 일부 실패여도 완료된 키워드 데이터는 저장되어 있으므로 항상 갱신
    await refreshDashboard();
    await loadMeta();
    setRunning('idle');
  };

  const runAll = async () => {
    const keywordSuccess = await runKeywords();
    if (keywordSuccess) await runClothes();
  };

  // 실행 전 확인 모달 (확인 즉시 모달을 닫고 진행 상황은 화면에서 표시)
  const confirmRun = (target: 'keyword' | 'clothes' | 'all') => {
    const contents = {
      keyword: {
        title: '트렌드 키워드 생성',
        content: 'OpenAI로 이번 달 트렌드 키워드를 생성해 저장합니다. 같은 키워드는 갱신됩니다. 진행하시겠습니까?',
        run: runKeywords,
      },
      clothes: {
        title: '키워드별 의류 수집',
        content: `저장된 키워드 ${meta.keywordCount}개로 SerpApi 검색을 ${meta.keywordCount}회 실행합니다. (무료 플랜 월 ${SERPAPI_MONTHLY_LIMIT}회) 진행하시겠습니까?`,
        run: runClothes,
      },
      all: {
        title: '월별 데이터 전체 수집',
        content: '키워드 생성 후 이어서 키워드별 의류 수집을 실행합니다. 완료될 때까지 페이지를 닫지 마세요. 진행하시겠습니까?',
        run: runAll,
      },
    }[target];

    modalOpen?.({
      title: contents.title,
      content: contents.content,
      type: 'code',
      fn: () => {
        void contents.run();
      },
    });
  };

  const finished = steps.filter(step => step.status !== 'pending' && step.status !== 'running').length;
  const progress = steps.length > 0 ? finished / steps.length : 0;
  const isBusy = running !== 'idle';

  return (
    <CSS.Admin id='admin' aria-labelledby='admin-title'>
      <motion.div
        variants={revealGroup(reduce)}
        initial='hidden'
        whileInView='show'
        viewport={revealViewport}
      >
        <motion.div className='section-head' variants={revealItem(reduce)}>
          <div>
            <h2 id='admin-title'>데이터 수집 관리</h2>
            <p>관리자에게만 보이는 영역이에요. 매월 1일 이후 한 번 실행해 주세요.</p>
          </div>
        </motion.div>

        <motion.div className='admin-sheet' variants={revealItem(reduce)}>
          <p className='admin-intro'>
            Vercel Hobby 플랜에서는 cron 함수가 실행 시간 제한을 넘겨 중단되기 때문에, 키워드 생성과 의류 수집을 나눠서 이
            화면에서 직접 실행합니다. 의류 수집은 키워드마다 짧은 요청으로 나눠 보내고 바로 저장하므로, 도중에 멈춰도 끝난
            키워드의 데이터는 남습니다.
          </p>

          <dl className='admin-meta'>
            <div>
              <dt>저장된 키워드</dt>
              <dd>{meta.keywordCount}개</dd>
            </div>
            <div>
              <dt>저장된 의류</dt>
              <dd>{meta.clothesCount.toLocaleString('ko-KR')}벌</dd>
            </div>
            <div>
              <dt>키워드 최종 갱신</dt>
              <dd>{meta.latestUpdatedAt ? formatDate(meta.latestUpdatedAt.toISOString()) : '-'}</dd>
            </div>
            <div>
              <dt>1회 수집 시 SerpApi 사용</dt>
              <dd>
                {meta.keywordCount} / {SERPAPI_MONTHLY_LIMIT}회
              </dd>
            </div>
          </dl>

          <div className='admin-step'>
            <h3>트렌드 키워드 생성</h3>
            <p>OpenAI가 패션 트렌드 키워드 수집 전문가 페르소나 프롬프트를 통해 최근 30일 한국 패션 트렌드 키워드 8~12개를 만들고, slug 기준으로 중복을 걸러 정해진 스키마 구조 형태로 저장합니다.</p>
            <button
              type='button'
              className='admin-button is-secondary'
              disabled={isBusy}
              onClick={() => confirmRun('keyword')}
            >
              {running === 'keyword' ? '생성 중...' : '키워드만 생성'}
            </button>
          </div>

          <div className='admin-step'>
            <h3>키워드별 의류 수집</h3>
            <p>저장된 키워드별 검색 쿼리 및 payload 자동 구성하여 Google Shopping 검색 엔진 스크래핑 서비스 API를 통해 검색해 의류 데이터별로 검색 키워드 메타데이터를 포함하여 정해진 스키마 구조로 저장합니다.</p>
            <button
              type='button'
              className='admin-button is-secondary'
              disabled={isBusy || meta.keywordCount === 0}
              onClick={() => confirmRun('clothes')}
            >
              {running === 'clothes' ? '수집 중...' : '의류만 수집'}
            </button>
          </div>

          <div className='admin-actions'>
            <button type='button' className='admin-button' disabled={isBusy} onClick={() => confirmRun('all')}>
              전체 수집 실행
            </button>
            {running === 'clothes' && (
              <button type='button' className='admin-button is-stop' onClick={() => abortRef.current?.abort()}>
                다음 키워드부터 중단
              </button>
            )}
          </div>

          {steps.length > 0 && (
            <div className='admin-progress'>
              <div className='admin-progress__head'>
                <span>의류 수집 진행</span>
                <span>
                  {finished} / {steps.length} 키워드
                </span>
              </div>
              <div
                className='admin-progress__track'
                role='progressbar'
                aria-valuemin={0}
                aria-valuemax={steps.length}
                aria-valuenow={finished}
              >
                <motion.div
                  className='admin-progress__fill'
                  initial={false}
                  animate={{ scaleX: progress }}
                  transition={{ duration: reduce ? 0 : 0.4 }}
                />
              </div>
              <ul className='keyword-queue'>
                {steps.map(step => (
                  <li key={step.keyword}>
                    <span>{step.keyword}</span>
                    <span className='queue-status' data-status={step.status}>
                      {step.status === 'done' ? `${step.count}벌` : STATUS_LABEL[step.status]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {logs.length > 0 && (
            <ol className='admin-log' aria-live='polite' aria-label='실행 기록'>
              {logs.map((log, index) => (
                <li key={`${log.time}-${index}`} data-status={log.tone}>
                  <time>{log.time}</time>
                  <span>{log.text}</span>
                </li>
              ))}
            </ol>
          )}
        </motion.div>
      </motion.div>
    </CSS.Admin>
  );
};

export default AdminPipeline;
