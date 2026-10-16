'use client';

import {
  BuildGraphJob,
  GRAPH_PAGE_SIZE,
} from '@/feature/trend/jobs/build-graph.jobs';
import { AlertToast } from '@/hooks/useToastify';
import { db } from '@/shared/lib/firebase';
import { D3TrendGraphManager } from '@/shared/lib/d3-graph-manager';
import { collection, getDocs } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PiGraph } from 'react-icons/pi';
import { ModalContext } from '../../../../context/ModalContext';

const RANK_TIER_LABEL = {
  'top1-10': 'TOP 1-10',
  'top11-20': 'TOP 11-20',
};

const KeywordForceGraph = () => {
  const { status, data: session } = useSession();
  const { modalOpen, modalClose } = useContext(ModalContext);

  const [pipelineStart, setPipelineStart] = useState(false);
  const [generateComplete, setGenerateComplete] = useState(false);
  const [rankTier, setRankTier] = useState('top1-10');
  const [graphMeta, setGraphMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [focusedNode, setFocusedNode] = useState(null);

  const managerRef = useRef(null);
  const svgRef = useRef(null);
  const clothesListRef = useRef([]);

  const renderGraph = useCallback((clothesList, selectedRankTier) => {
    if (!svgRef.current) return null;

    const buildGraphJob = new BuildGraphJob();
    const graphData = buildGraphJob.process(clothesList, {
      rankTier: selectedRankTier,
    });

    if (managerRef.current) {
      managerRef.current.destroy();
    }

    const width = svgRef.current.clientWidth || 678;
    const height = svgRef.current.clientHeight || 678;

    const manager = new D3TrendGraphManager(svgRef.current, width, height);
    manager.render(
      graphData,
      node => {
        alert(
          `[${node.rank}위] ${node.name}\n현재 키워드 의류 상세 팝업 서비스 구현중입니다.`
        );
      },
      setFocusedNode
    );

    managerRef.current = manager;
    setGraphMeta(graphData.meta);
    setGraphData(graphData);
    setFocusedNode(null);

    if (!graphData.meta.availableTiers.includes(selectedRankTier)) {
      setRankTier(graphData.meta.rankTier);
    }

    return graphData;
  }, []);

  const fetchClothesList = useCallback(async () => {
    const clothesRef = collection(db, 'clothes');
    const clothesSnapShot = await getDocs(clothesRef);

    if (clothesSnapShot.empty) {
      return [];
    }

    const clothesList = [];
    clothesSnapShot.forEach(doc => {
      clothesList.push(doc.data());
    });

    return clothesList;
  }, []);

  const buildGraphRender = useCallback(
    async (selectedRankTier = rankTier) => {
      setIsLoading(true);

      try {
        const clothesList =
          clothesListRef.current.length > 0
            ? clothesListRef.current
            : await fetchClothesList();

        if (clothesList.length === 0) {
          AlertToast({
            str: '트랜드 의류 데이터가 없습니다.',
            type: 'error',
            theme: 'dark',
          });
          return;
        }

        clothesListRef.current = clothesList;
        renderGraph(clothesList, selectedRankTier);
        setGenerateComplete(true);
      } catch (err) {
        console.error(err);
        AlertToast({
          str: '트랜드 분석 그래프 데이터 생성 실패',
          type: 'error',
          theme: 'dark',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [fetchClothesList, rankTier, renderGraph]
  );

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

    if (modalOpen) {
      modalOpen({
        title: '트랜드 분석 그래프 데이터 생성 안내',
        content: `d3 Force Directed 그래프 런타임 데이터 생성 후 DB 저장까지 수행합니다. <br/>
        진행하시겠습니까?`,
        type: 'code',
        fn: async () => {
          try {
            clothesListRef.current = await fetchClothesList();

            if (clothesListRef.current.length === 0) {
              AlertToast({
                str: '트랜드 의류 데이터가 없습니다.',
                type: 'error',
                theme: 'dark',
              });
              modalClose?.();
              return;
            }

            renderGraph(clothesListRef.current, rankTier);

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
          } finally {
            modalClose?.();
          }
        },
      });
    }
  };

  const handleRankTierChange = event => {
    const nextTier = event.target.value;
    setRankTier(nextTier);

    if (clothesListRef.current.length > 0) {
      renderGraph(clothesListRef.current, nextTier);
    }
  };

  // 최초 마운트 시 1회 로드 (rankTier 변경은 select 핸들러에서 처리)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (cancelled) return;
      await buildGraphRender('top1-10');
    })();

    return () => {
      cancelled = true;
      managerRef.current?.destroy();
      managerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rankRangeLabel =
    graphMeta?.rankRange.from && graphMeta?.rankRange.to
      ? `${graphMeta.rankRange.from}~${graphMeta.rankRange.to}위`
      : '-';

  // 포커스된 키워드가 없으면 현재 구간 최상위 키워드를 기본 노출
  const insightNode = focusedNode ?? graphData?.nodes[0] ?? null;
  const relatedNodes = insightNode
    ? graphData.links
        .map(l => {
          const s = l.source.id ?? l.source;
          const t = l.target.id ?? l.target;
          if (s === insightNode.id) return t;
          if (t === insightNode.id) return s;
          return null;
        })
        .filter(Boolean)
        .map(id => graphData.nodes.find(n => n.id === id))
        .filter(Boolean)
        .sort((a, b) => a.rank - b.rank)
    : [];

  return (
    <>
      <aside className="keyword-insight" aria-live="polite">
        {insightNode ? (
          <>
            <div className="keyword-insight__head">
              <span
                className="keyword-insight__rank"
                style={{
                  color: managerRef.current?.getRankColor(insightNode.rank),
                }}
              >
                {insightNode.rank}
                <small>위</small>
              </span>
              <strong className="keyword-insight__name">
                {insightNode.name}
              </strong>
            </div>

            <dl className="keyword-insight__stats">
              <div>
                <dt>수집 의류</dt>
                <dd>{(insightNode.clothesCount ?? 0).toLocaleString('ko-KR')}개</dd>
              </div>
              <div>
                <dt>참여 브랜드</dt>
                <dd>{(insightNode.brandTotalCount ?? 0).toLocaleString('ko-KR')}개</dd>
              </div>
            </dl>

            {insightNode.topBrands?.length > 0 && (
              <div className="keyword-insight__group">
                <p className="keyword-insight__caption">대표 브랜드</p>
                <ul className="keyword-insight__chips">
                  {insightNode.topBrands.map(brand => (
                    <li key={brand}>{brand}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="keyword-insight__group">
              <p className="keyword-insight__caption">
                브랜드를 공유하는 키워드
              </p>
              {relatedNodes.length > 0 ? (
                <ul className="keyword-insight__chips">
                  {relatedNodes.map(n => (
                    <li key={n.id}>
                      <button
                        type="button"
                        onMouseEnter={() => managerRef.current?.focus(n.id)}
                        onFocus={() => managerRef.current?.focus(n.id)}
                        onMouseLeave={() => managerRef.current?.focus(null)}
                        onBlur={() => managerRef.current?.focus(null)}
                      >
                        #{n.rank} {n.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="keyword-insight__empty">
                  이 구간에서 브랜드가 겹치는 키워드가 없습니다.
                </p>
              )}
            </div>

            <p className="keyword-insight__hint">
              그래프의 키워드에 마우스를 올리거나 Tab 키로 이동하면 연관
              키워드가 강조됩니다.
            </p>
          </>
        ) : (
          <p className="keyword-insight__empty">
            {isLoading
              ? '키워드 그래프를 불러오는 중입니다.'
              : '표시할 트렌드 키워드가 없습니다.'}
          </p>
        )}
      </aside>

    <div className="keyword-force-graph">
      <div className="keyword-force-graph__toolbar">
        <div className="keyword-force-graph__toolbar-title">
          <PiGraph aria-hidden />
          <span>키워드 연관 그래프</span>
        </div>

        <div className="keyword-force-graph__filter">
          <label
            className="keyword-force-graph__filter-label"
            htmlFor="keyword-rank-tier"
          >
            노출 구간
          </label>
          <select
            id="keyword-rank-tier"
            className="keyword-force-graph__filter-select"
            value={rankTier}
            onChange={handleRankTierChange}
            disabled={isLoading || !graphMeta}
          >
            {(graphMeta?.availableTiers ?? ['top1-10']).map(tier => (
              <option key={tier} value={tier}>
                {RANK_TIER_LABEL[tier]}
              </option>
            ))}
          </select>
        </div>

        {graphMeta && (
          <span className="keyword-force-graph__toolbar-meta">
            {rankRangeLabel} · 키워드 연관 링크 {graphMeta.linkCount}개 · 전체
            키워드 {graphMeta.totalKeywords}개
          </span>
        )}
      </div>

      <div className="keyword-force-graph__container">
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </div>

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
                  런타임 데이터를 생성합니다. 기본 {GRAPH_PAGE_SIZE}개 구간만
                  렌더링하여 프레임 드랍을 방지합니다.
                  <br />
                </p>
                <strong>관리자 외에는 이용 불가능한 서비스입니다.</strong>
              </div>
              <button
                type="button"
                className="sample-block__button"
                disabled={
                  pipelineStart ||
                  status !== 'authenticated' ||
                  session?.user?.role !== 'admin'
                }
                onClick={handleGenerateGraph}
              >
                호출
              </button>
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default KeywordForceGraph;
