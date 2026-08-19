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
      .attr('viewBox', `0 0 ${this.width * 1.2} ${this.height * 1.2}`);

    svg.selectAll('*').remove(); // 기존 요소 초기화

    // Zoom Container 생성
    this.gContainer = svg.append('g').attr('class', 'graph-container');

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on('zoom', event => {
        this.gContainer?.attr('transform', event.transform);
      });

    svg.call(zoom as any);
  }

  /**
   * Firestore에서 가져온 (nodes, links) 데이터 기반 그래프 렌더링
   */
  public render(data: GraphData, onNodeClick?: (node: GraphNode) => void) {
    if (!this.gContainer) return;

    // 객체 깊은 복사 (D3 Simulation이 x, y, vx, vy 값을 직접 변형하므로 원본 보호)
    const nodes: GraphNode[] = data.nodes.map(d => ({ ...d }));
    const links: GraphLink[] = data.links.map(d => ({ ...d }));

    const keywordColorsMap = new Map<string, string>();

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
      .attr('stroke', '#334155')
      .attr('stroke-opacity', 0.6)
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
      .call(this.drag(this.simulation))
      .on('click', (_, d) => onNodeClick && onNodeClick(d));

    // 노드 원형(Circle) 채우기
    const circle = node
      .append('circle')
      .attr('r', d => d.val)
      .attr('fill', d => {
        const currentNodeColor = this.getRandomRGB();
        keywordColorsMap.set(d.id, currentNodeColor);
        return currentNodeColor;
      })
      .attr('fill-opacity', 0.18)
      .attr('filter', 'url(#nodeGlow)')
      .attr('stroke', (d: any) => keywordColorsMap.get(d.id) || '#FFFFFF')
      .attr('stroke-width', 1.5);

    const dot = node
      .append('circle')
      .attr('r', d => d.val / 2)
      .attr('fill', d => keywordColorsMap.get(d.id) || '#FFFFFF');

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

  public getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
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
