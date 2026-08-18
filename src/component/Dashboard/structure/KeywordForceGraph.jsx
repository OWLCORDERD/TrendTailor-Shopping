'use client';

import { BuildGraphJob } from '@/feature/trend/jobs/build-graph.jobs';
import { AlertToast } from '@/hooks/useToastify';
import { db } from '@/shared/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { PiGraph } from 'react-icons/pi';
import { ModalContext } from '../../../../context/ModalContext';
import { D3TrendGraphManager } from '@/shared/lib/d3-graph-manager';

const KeywordForceGraph = () => {
  const { status, data: session } = useSession();

  const { modalOpen, modalClose } = useContext(ModalContext);

  const [pipelineStart, setPipelineStart] = useState(false);
  const [generateComplete, setGenerateComplete] = useState(false);

  const managerRef = useRef(null);

  const svgRef = useRef(null);

  const handleGenerateGraph = async () => {
    setPipelineStart(true);
    if (session?.user?.role !== 'admin') {
      AlertToast({
        str: '관리자 권한이 없습니다.',
        type: 'error',
        theme: 'dark',
      });
      return;
    }

    // 파이프라인 실행 컨펌 모달 호출
    if (modalOpen) {
      modalOpen({
        title: '트랜드 분석 그래프 데이터 생성 안내',
        content: `d3 Force Directed 그래프 런타임 데이터 생성 후 DB 저장까지 수행합니다. <br/>
        진행하시겠습니까?`,
        type: 'code',
        fn: async () => {
          // 모달 푸터 코드 실행 버튼 이벤트 핸들러
          try {
            // 그래프 런타임 데이터 생성 서비스 객체 생성
            const buildGraphJob = new BuildGraphJob();

            // 트렌드 의류 컬렉션 문서 전체 조회
            const clothesRef = collection(db, 'clothes');
            const clothesSnapShot = await getDocs(clothesRef);

            // 트렌드 의류 데이터 목록 초기화
            const clothesList = [];

            // 트렌드 의류 데이터가 없으면 오류 메시지 표시 후 종료
            if (clothesSnapShot.empty) {
              AlertToast({
                str: '트랜드 의류 데이터가 없습니다.',
                type: 'error',
                theme: 'dark',
              });

              modalClose?.(); // 파이프라인 실행 완료 후 모달 닫기
              return;
            }

            clothesSnapShot.forEach(doc => {
              clothesList.push(doc.data());
            });

            // 트랜드 의류 데이터 목록을 파이프라인 작업에 전달
            const graphData = buildGraphJob.process(clothesList);

            // 기존 그래프 생성 매니저가 있다면 정리
            if (managerRef.current) {
              managerRef.current.destroy();
            }

            // 3. D3 클래스 객체 인스턴스화 및 렌더링
            const width = svgRef.current.clientWidth || 678;
            const height = svgRef.current.clientHeight || 678;

            const manager = new D3TrendGraphManager(
              svgRef.current,
              width,
              height
            );
            manager.render(graphData, node => {
              alert('현재 키워드 의류 상세 팝업 서비스 구현중입니다.'); // 노드 클릭 시 콘솔 로깅
            });

            managerRef.current = manager;

            AlertToast({
              str: '트랜드 분석 그래프 데이터 생성 완료',
              type: 'success',
              theme: 'dark',
            });

            setGenerateComplete(true);
          } catch (err) {
            console.error(err);
            AlertToast({
              str: '트랜드 분석 그래프 데이터 생성 실패',
              type: 'error',
              theme: 'dark',
            });
          }

          modalClose?.(); // 파이프라인 실행 완료 후 모달 닫기
        },
      });
    }
  };

  const buildGraphRender = async () => {
    // 모달 푸터 코드 실행 버튼 이벤트 핸들러
    try {
      // 그래프 런타임 데이터 생성 서비스 객체 생성
      const buildGraphJob = new BuildGraphJob();

      // 트렌드 의류 컬렉션 문서 전체 조회
      const clothesRef = collection(db, 'clothes');
      const clothesSnapShot = await getDocs(clothesRef);

      // 트렌드 의류 데이터 목록 초기화
      const clothesList = [];

      // 트렌드 의류 데이터가 없으면 오류 메시지 표시 후 종료
      if (clothesSnapShot.empty) {
        AlertToast({
          str: '트랜드 의류 데이터가 없습니다.',
          type: 'error',
          theme: 'dark',
        });
        return;
      }

      clothesSnapShot.forEach(doc => {
        clothesList.push(doc.data());
      });

      // 트랜드 의류 데이터 목록을 파이프라인 작업에 전달
      const graphData = buildGraphJob.process(clothesList);

      // 기존 그래프 생성 매니저가 있다면 정리
      if (managerRef.current) {
        managerRef.current.destroy();
      }

      // 3. D3 클래스 객체 인스턴스화 및 렌더링
      const width = svgRef.current.clientWidth || 678;
      const height = svgRef.current.clientHeight || 678;

      const manager = new D3TrendGraphManager(svgRef.current, width, height);
      manager.render(graphData, node => {
        alert('현재 키워드 의류 상세 팝업 서비스 구현중입니다.'); // 노드 클릭 시 콘솔 로깅
      });

      managerRef.current = manager;

      AlertToast({
        str: '트랜드 분석 그래프 데이터 생성 완료',
        type: 'success',
        theme: 'dark',
      });

      setGenerateComplete(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) return;

    let cancelled = false;

    (async () => {
      if (cancelled) return;

      try {
        buildGraphRender();
      } catch (err) {
        console.error(err);
        AlertToast({
          str: '트랜드 분석 그래프 데이터 생성 실패',
          type: 'error',
          theme: 'dark',
        });
      } finally {
        setTimeout(() => {
          cancelled = false;
        }, 2500);
      }
    })();

    return () => {
      cancelled = true;
      managerRef.current?.destroy();
      managerRef.current = null;
    };
  }, []);
  return (
    <div className="keyword-force-graph">
      <div className="keyword-force-graph__container">
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </div>

      {/* 관리자 영역 (실시간 데이터 수집) */}
      {status === 'authenticated' &&
        session?.user?.role === 'admin' &&
        !generateComplete && (
          <div className="sample-block">
            <div className="sample-block__toolbar">
              <span className="sample-block__method">Admin Pipeline test</span>
            </div>

            <div className="sample-block__content">
              <div className="sample-block__caption">
                <p>
                  수집된 트렌드 의류 컬렉션 기반으로 d3 Force Directed 그래프
                  런타임 데이터를 생성합니다. <br />
                </p>
                <strong>관리자 외에는 이용 불가능한 서비스입니다.</strong>
              </div>
              <button
                type="button"
                className="sample-block__button"
                disabled={
                  status !== 'authenticated' || session?.user?.role !== 'admin'
                }
                onClick={handleGenerateGraph}
              >
                호출
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default KeywordForceGraph;
