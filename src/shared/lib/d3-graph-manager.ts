import * as d3 from 'd3';

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'keyword' | 'clothing' | 'brand';
  val: number;
  rank?: number;
  clothesCount?: number;
  topBrands?: string[];
  category?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  thumbnail?: string;
  link?: string;
  brandTotalCount?: number;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number;
  distance?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export class D3TrendGraphManager {
  private svgSelector: SVGSVGElement;
  private width: number;
  private height: number;
  private simulation: d3.Simulation<GraphNode, GraphLink> | null = null;
  private gContainer: d3.Selection<
    SVGGElement,
    unknown,
    null,
    undefined
  > | null = null;
  // 키워드 포커스(하이라이트) 처리 함수 - render 시점에 바인딩
  private focusHandler: ((id: string | null) => void) | null = null;

  constructor(svgElement: SVGSVGElement, width: number, height: number) {
    this.svgSelector = svgElement;
    this.width = width;
    this.height = height;
    this.initSvg();
  }

  /**
   * SVG 기본 줌/팬(Zoom & Pan) 레이어 초기화
   */
  private initSvg() {
    const svg = d3
      .select(this.svgSelector)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    svg.selectAll('*').remove(); // 기존 요소 초기화

    // Zoom Container 생성
    this.gContainer = svg.append('g').attr('class', 'graph-container');

    // const zoom = d3
    //   .zoom<SVGSVGElement, unknown>()
    //   .scaleExtent([0.2, 4])
    //   .on('zoom', event => {
    //     this.gContainer?.attr('transform', event.transform);
    //   });

    // svg.call(zoom as any);
  }

  /**
   * Firestore에서 가져온 (nodes, links) 데이터 기반 그래프 렌더링
   */
  public render(
    data: GraphData,
    onNodeClick?: (node: GraphNode) => void,
    onNodeFocus?: (node: GraphNode | null) => void
  ) {
    if (!this.gContainer) return;

    // 객체 깊은 복사 (D3 Simulation이 x, y, vx, vy 값을 직접 변형하므로 원본 보호)
    const nodes: GraphNode[] = data.nodes.map(d => ({ ...d }));
    const links: GraphLink[] = data.links.map(d => ({ ...d }));

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // 연결된 키워드 조회용 인접 맵
    const neighbors = new Map<string, Set<string>>(
      nodes.map(d => [d.id, new Set([d.id])])
    );
    links.forEach(l => {
      const s = typeof l.source === 'string' ? l.source : l.source.id;
      const t = typeof l.target === 'string' ? l.target : l.target.id;
      neighbors.get(s)?.add(t);
      neighbors.get(t)?.add(s);
    });

    // 1. Force Simulation 설정
    this.simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id(d => d.id)
          .distance(d => d.distance || 50)
      )
      .force('charge', d3.forceManyBody().strength(-300)) // 반발력
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force(
        'collide',
        d3.forceCollide<GraphNode>().radius(d => d.val + 10)
      ); // 노드 중첩 방지

    // 2. Links 렌더링 (SVG Line)
    const link = this.gContainer
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#5a6ba8')
      .attr('stroke-opacity', 0.35)
      .attr('stroke-width', d => Math.sqrt(d.value));

    // 3. Nodes Group 렌더링 (SVG G element)
    const node = this.gContainer
      .append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .style('cursor', 'pointer')
      .style('transition', 'opacity 0.25s ease')
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', d => `${d.rank ?? ''}위 ${d.name}`)
      .call(this.drag(this.simulation))
      .on('click', (_, d) => onNodeClick && onNodeClick(d))
      .on('keydown', (event: KeyboardEvent, d) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onNodeClick && onNodeClick(d);
        }
      });

    // 노드 원형(Circle) 채우기
    const circle = node
      .append('circle')
      .attr('r', d => d.val)
      .attr('fill', d => this.getRankColor(d.rank))
      .attr('fill-opacity', 0.16)
      .attr('stroke', d => this.getRankColor(d.rank))
      .attr('stroke-width', 1.5);

    const dot = node
      .append('circle')
      .attr('r', d => d.val / 2)
      .attr('fill', d => this.getRankColor(d.rank));

    // 최초 렌더 시 순위 순서대로 노드 등장 (모션 최소화 설정 시 생략)
    if (!reduceMotion) {
      const delay = (d: GraphNode) => (((d.rank ?? 1) - 1) % 10) * 70;
      circle
        .attr('r', 0)
        .transition()
        .delay(delay)
        .duration(500)
        .ease(d3.easeBackOut)
        .attr('r', d => d.val);
      dot
        .attr('r', 0)
        .transition()
        .delay(d => delay(d) + 120)
        .duration(400)
        .attr('r', d => d.val / 2);
    }

    // 노드 텍스트 라벨 (Label)
    node
      .append('text')
      .text(d =>
        d.type === 'clothing'
          ? d.name.length > 10
            ? `${d.name.slice(0, 10)}...`
            : d.name
          : d.rank
            ? `#${d.rank} ${d.name}`
            : d.name
      )
      .attr('x', 0)
      .attr('y', d => d.val + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#E2E8F0')
      .attr('font-size', d => (d.type === 'keyword' ? '14px' : '11px'))
      .attr('font-weight', d => (d.type === 'keyword' ? 'bold' : 'normal'));

    // 키워드 노드 상세 정보 툴팁 레이어
    const tooltipLayer = this.gContainer
      .append('g')
      .attr('class', 'keyword-tooltip-layer')
      .style('pointer-events', 'none');

    // 툴팁 너비/높이
    const tooltipWidth = 200;
    const tooltipHeight = 72;

    // 툴팁 레이어 전체 제거
    const hideTooltip = () => {
      tooltipLayer.selectAll('*').remove();
    };

    // 현재 키워드 노드 툴팁 렌더링
    const showTooltip = (d: GraphNode) => {
      const x = (d.x ?? 0) - tooltipWidth / 2;
      const y = (d.y ?? 0) - d.val - tooltipHeight - 8;

      // 툴팁 레이어 내 foreignObject 조회
      let foreignObject =
        tooltipLayer.select<SVGForeignObjectElement>('foreignObject');

      // 현재 생성된 툴팁 레이어 내 foreignObject 없을 시
      if (foreignObject.empty()) {
        // 툴팁 레이어 내 foreignObject 생성
        foreignObject = tooltipLayer
          .append('foreignObject')
          .attr('width', tooltipWidth)
          .attr('height', tooltipHeight);

        const infoList = foreignObject
          .append('xhtml:ul')
          .attr(
            'style',
            'box-sizing: border-box; width: 100%; height: 100%; margin: 0; list-style: none; background-color: #17245e; border: 1px solid rgba(255, 255, 255, 0.1); padding: 10px 12px; border-radius: 12px; color: #f4f4f0; font-size: 14px; line-height: 1.6;'
          );

        infoList.append('li').attr('class', 'clothes-count');
        infoList.append('li').attr('class', 'brand-count');
      }

      foreignObject.attr('x', x).attr('y', y);
      foreignObject
        .select('.clothes-count')
        .text(`총 의류 수: ${d.clothesCount ?? 0}`);
      foreignObject
        .select('.brand-count')
        .text(`총 브랜드 수: ${d.brandTotalCount ?? 0}`);
    };

    let hoveredNode: GraphNode | null = null;

    // 선택 키워드와 연결된 키워드만 강조, 나머지는 흐리게 처리
    const isLinked = (l: any, id: string) =>
      l.source.id === id || l.target.id === id;

    const highlight = (id: string | null) => {
      const related = id ? neighbors.get(id) : null;
      node.style('opacity', d => (!related || related.has(d.id) ? 1 : 0.18));
      circle.attr('stroke-width', d => (d.id === id ? 3 : 1.5));
      link
        .attr('stroke', l => (id && isLinked(l, id) ? '#4dd4ff' : '#5a6ba8'))
        .attr('stroke-opacity', l =>
          !id ? 0.35 : isLinked(l, id) ? 0.9 : 0.06
        );
    };

    this.focusHandler = highlight;

    const enter = function (this: SVGGElement, _: unknown, d: GraphNode) {
      hoveredNode = d;
      d3.select(this).raise();
      tooltipLayer.raise();
      showTooltip(d);
      highlight(d.id);
      onNodeFocus?.(d);
    };

    const leave = () => {
      hoveredNode = null;
      hideTooltip();
      highlight(null);
      onNodeFocus?.(null);
    };

    node
      .on('mouseenter', enter)
      .on('focus', enter)
      .on('mouseleave', leave)
      .on('blur', leave);

    // 4. Tick 이벤트로 위치 갱신
    this.simulation.on('tick', () => {
      nodes.forEach(d => {
        const r = d.val / 2 + 12;
        d.x = Math.max(r, Math.min(this.width - r, d.x ?? this.width / 2));
        d.y = Math.max(r, Math.min(this.height - r, d.y ?? this.height / 2));
      });

      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);

      if (hoveredNode) {
        showTooltip(hoveredNode);
      }
    });
  }

  /**
   * 노드 드래그(Drag) 물리 제어
   */
  private drag(simulation: d3.Simulation<GraphNode, GraphLink>) {
    return d3
      .drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null; // 드래그 종료 후 다시 시뮬레이션에 맡김 (고정 해제)
        d.fy = null;
      });
  }

  /**
   * 외부(인사이트 패널 등)에서 특정 키워드 강조 / 해제 (onNodeFocus 미호출)
   */
  public focus(id: string | null) {
    this.focusHandler?.(id);
  }

  /**
   * 순위 기반 노드 색상 - 전역 테마 토큰(warm / accent-hover / cool)에서 파생
   * 구간 내 1위는 warm, 이후 순위는 accent → cool 순으로 점진 변화
   */
  public getRankColor(rank = 1) {
    const position = (rank - 1) % 10;
    if (position === 0) return '#ffb84d';
    return d3.interpolateRgb('#5a76ff', '#4dd4ff')((position - 1) / 8);
  }

  /**
   * 리소스 해제 (컴포넌트 Unmount 시 호출)
   */
  public destroy() {
    if (this.simulation) {
      this.simulation.stop();
    }
  }
}
