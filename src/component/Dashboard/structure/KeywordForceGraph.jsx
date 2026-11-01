'use client';

import { D3TrendGraphManager } from '@/shared/lib/d3-graph-manager';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PiGraph } from 'react-icons/pi';
import { DashboardContext } from '../../../../context/DashboardContext';

const RANK_TIER_LABEL = {
  'top1-10': 'TOP 1-10',
  'top11-20': 'TOP 11-20',
};

const DEFAULT_RANK_TIER = 'top1-10';

/**
 * 2026.11.01 인기 키워드 연관 그래프
 * - 랭킹 구간별 nodes/links는 서버(ISR)에서 미리 계산해 DashboardContext로 전달
 * - 클라이언트는 최초 TOP 1-10 구간만 d3 렌더러로 그리고, 구간 변경 시 해당 구간 데이터로 다시 그림
 */
const KeywordForceGraph = () => {
  const { graphTiers } = useContext(DashboardContext);

  const [rankTier, setRankTier] = useState(DEFAULT_RANK_TIER);
  const [graphData, setGraphData] = useState(null);
  const [focusedNode, setFocusedNode] = useState(null);

  const managerRef = useRef(null);
  const svgRef = useRef(null);

  const graphMeta = graphData?.meta ?? null;

  const renderGraph = useCallback(
    selectedRankTier => {
      const tierData = graphTiers[selectedRankTier];
      if (!svgRef.current || !tierData) return;

      managerRef.current?.destroy();

      const width = svgRef.current.clientWidth || 678;
      const height = svgRef.current.clientHeight || 678;

      // d3 매니저 내부에서 nodes/links를 복사해 시뮬레이션하므로 컨텍스트 원본은 변경되지 않음
      const manager = new D3TrendGraphManager(svgRef.current, width, height);
      manager.render(
        tierData,
        node => {
          alert(
            `[${node.rank}위] ${node.name}
현재 키워드 의류 상세 팝업 서비스 구현중입니다.`
          );
        },
        setFocusedNode
      );

      managerRef.current = manager;
      setGraphData(tierData);
      setFocusedNode(null);
    },
    [graphTiers]
  );

  const handleRankTierChange = event => {
    const nextTier = event.target.value;
    setRankTier(nextTier);
    renderGraph(nextTier);
  };

  // 최초 마운트(및 ISR 데이터 변경) 시 TOP 1-10 구간 렌더링
  useEffect(() => {
    setRankTier(DEFAULT_RANK_TIER);
    renderGraph(DEFAULT_RANK_TIER);

    return () => {
      managerRef.current?.destroy();
      managerRef.current = null;
    };
  }, [renderGraph]);

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
            표시할 트렌드 키워드가 없습니다.
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
            disabled={!graphMeta}
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
    </div>
    </>
  );
};

export default KeywordForceGraph;
