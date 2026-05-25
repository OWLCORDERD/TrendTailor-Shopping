import * as d3 from "d3";

export default class forceDirectGraphRenderer {
  constructor(keywordRoot) {
    this.config = {
      svg: {
        width: 1280,
        height: 650,
      },
      node: {
        radius: 15,
        fill: "rgba(255, 255, 255, 0.5)",
        stroke: "#fff",
        strokeWidth: 1.5,
      },
      link: {
        stroke: "#999",
        strokeOpacity: 0.6,
        strokeWidth: 1.5,
      },
    };

    this.svg = null;

    this.keywordRootHierarchy = keywordRoot;
    // D3 시뮬레이션 생성자
    this.simulation = null;
    // 시뮬레이션 노드, 링크 데이터
    this.links = [];
    this.keywordNodes = [];
    this.categoryNodes = [];
    this.dispatchCallback = null;
  }

  init() {
    // 기존 도면 SVG 요소 탐색
    const svg = d3.select(".keypoint-simulation").select("svg");

    const width = this.config.svg.width;
    const height = this.config.svg.height;

    // 존재하지 않을 경우, 신규 생성
    if (svg.empty()) {
      const svg = d3
        .select(".keypoint-simulation")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "keyword-graph-svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");

      this.svg = svg;
    }

    d3.select("keypoint-simulation")
      .style("opacity", 1)
      .transition("ease-in-out")
      .duration(500);

    // 로딩 인디케이터 표시
    this.settingD3Simulation();
  }

  settingD3Simulation() {
    // 트리 구조 데이터 -> D3 계층 구조 데이터 구조로 변환
    const root = d3.hierarchy(this.keywordRootHierarchy);

    // 트리 구조 데이터 평면화
    const nodes = root.descendants().map((d) => ({
      id: d.data.name,
      depth: d.depth,
      parent: d.parent,
      ...d.data,
    }));

    const depth1Nodes = nodes.filter((d) => d.depth <= 1);

    const categoryNodes = nodes.filter((d) => d.depth > 1);

    const centerPosition = {
      x: this.config.svg.width / 2,
      y: this.config.svg.height / 2,
    };

    // 3. links (부모-자식 관계)
    const depth1Links = root
      .links()
      .filter((link) => link.source.depth === 0 || link.target.depth === 1)
      .map((link) => ({
        source: link.source.data.name,
        target: link.target.data.name,
      }));

    const links = root.links().map((link) => ({
      source: link.source.data.name,
      target: link.target.data.name,
    }));

    const simulation = d3
      .forceSimulation(depth1Nodes)
      .force(
        "link",
        d3
          .forceLink(depth1Links)
          .id((d) => d.name)
          .distance(200)
      )
      .force("charge", d3.forceManyBody().strength(-250))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide(50));

    this.simulation = simulation;
    this.keywordNodes = depth1Nodes;
    this.categoryNodes = categoryNodes;
    this.links = depth1Links;

    this.createNode();
  }

  createNode() {
    if (!this.svg) return;

    // Add a line for each link, and a circle for each node.
    const link = this.svg
      .append("g")
      .attr("stroke", this.config.link.stroke)
      .attr("stroke-opacity", this.config.link.strokeOpacity)
      .selectAll("line")
      .data(this.links)
      .join("line")
      .attr("stroke-width", (d) => this.config.link.strokeWidth);

    // 키워드 노드 그룹 생성
    const nodeGroup = this.svg
      .selectAll("g.keyword-node")
      .data(this.keywordNodes)
      .join("g")
      .classed("keyword-node", true)
      .on("mouseenter", (event, d) => {
        const tooltip = d3.select(".tooltip");

        tooltip.style("opacity", 1);
      });

    // 키워드 원형 노드 생성
    const pointNode = this.createPointNode(nodeGroup);

    // 키워드별 샘플 노드 생성 (루트 노드 제외)
    const previewNode = this.createPreviewSampleNode(nodeGroup);

    const svgEl = this.svg;

    previewNode.each(function () {
      const currentData = d3.select(this).datum();

      const currentNode = d3.select(this);

      // 루트 노드는 키워드가 아니므로 제외 처리
      if (currentData.type === "Root") return;

      const circleNode = currentNode.append("circle").attr("r", 30);

      const clothesData = currentData.children[0].children[0];

      if (currentData.type === "Root") return;

      // 키워드별 미리보기 이미지 defs 패턴 생성
      const defs = svgEl.append("defs");
      defs
        .append("pattern")
        .attr("id", `img-${currentData.id}`)
        .attr("patternUnits", "objectBoundingBox")
        .attr("width", 1)
        .attr("height", 1)
        .append("image")
        .attr("href", clothesData.image)
        .attr("width", 60)
        .attr("height", 60)
        .attr("preserveAspectRatio", "xMidYMid slice");

      if (!defs.empty()) {
        // defs 패턴별 아이디 식별자 적용
        circleNode
          .attr("fill", `url(#img-${currentData.id})`)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2);

        const dimmed = currentNode
          .append("circle")
          .style("fill", "rgba(0, 0, 0, 0.3)")
          .attr("r", 30)
          .style("pointer-events", "none"); // 마우스 이벤트 무시

        const searchIcon = currentNode
          .append("svg")
          .attr("width", 40)
          .attr("height", 40)
          .attr("viewBox", "0 0 25 25")
          .attr("transform", "translate(-20, -20)") // 아이콘 위치 조정
          .attr("fill", "none")
          .style("opacity", 0);

        searchIcon
          .append("path")
          .attr("fill-rule", "evenodd")
          .attr("clip-rule", "evenodd")
          .attr(
            "d",
            "M11.132 9.71395C10.139 11.2496 10.3328 13.2665 11.6 14.585C12.8468 15.885 14.8527 16.0883 16.335 15.065C16.6466 14.8505 16.9244 14.5906 17.159 14.294C17.3897 14.0023 17.5773 13.679 17.716 13.334C18.0006 12.6253 18.0742 11.8495 17.928 11.1C17.7841 10.3573 17.4268 9.67277 16.9 9.12995C16.3811 8.59347 15.7128 8.22552 14.982 8.07395C14.2541 7.92522 13.4982 8.00197 12.815 8.29395C12.1254 8.58951 11.5394 9.08388 11.132 9.71395Z"
          )
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round");

        searchIcon
          .append("path")
          .attr("fill", "#fff")
          .attr(
            "d",
            "M17.5986 13.6868C17.2639 13.4428 16.7947 13.5165 16.5508 13.8513C16.3069 14.1861 16.3806 14.6552 16.7154 14.8991L17.5986 13.6868ZM19.0584 16.6061C19.3931 16.85 19.8623 16.7764 20.1062 16.4416C20.3501 16.1068 20.2764 15.6377 19.9416 15.3938L19.0584 16.6061ZM7.5 12.7499C7.91421 12.7499 8.25 12.4142 8.25 11.9999C8.25 11.5857 7.91421 11.2499 7.5 11.2499V12.7499ZM5.5 11.2499C5.08579 11.2499 4.75 11.5857 4.75 11.9999C4.75 12.4142 5.08579 12.7499 5.5 12.7499V11.2499ZM7.5 15.7499C7.91421 15.7499 8.25 15.4142 8.25 14.9999C8.25 14.5857 7.91421 14.2499 7.5 14.2499V15.7499ZM5.5 14.2499C5.08579 14.2499 4.75 14.5857 4.75 14.9999C4.75 15.4142 5.08579 15.7499 5.5 15.7499V14.2499ZM8.5 9.74994C8.91421 9.74994 9.25 9.41415 9.25 8.99994C9.25 8.58573 8.91421 8.24994 8.5 8.24994V9.74994ZM5.5 8.24994C5.08579 8.24994 4.75 8.58573 4.75 8.99994C4.75 9.41415 5.08579 9.74994 5.5 9.74994V8.24994ZM16.7154 14.8991L19.0584 16.6061L19.9416 15.3938L17.5986 13.6868L16.7154 14.8991ZM7.5 11.2499H5.5V12.7499H7.5V11.2499ZM7.5 14.2499H5.5V15.7499H7.5V14.2499ZM8.5 8.24994H5.5V9.74994H8.5V8.24994Z"
          );

        currentNode.on("mouseenter", () => {
          circleNode.transition("all 0.3s ease-in-out").attr("r", 40); // 이미지 defs 패턴 적용된 노드 확대
          defs
            .transition("all 0.3s ease-in-out")
            .attr("width", 80)
            .attr("height", 80); // 패턴 확대

          defs
            .select("image")
            .transition("all 0.3s ease-in-out")
            .attr("width", 80)
            .attr("height", 80); // 패턴 내 이미지 확대
          dimmed.transition("all 0.3s ease-in-out").attr("r", 40); // 이미지 딤드 오버레이 확대

          searchIcon.transition("all 0.3s ease-in-out").style("opacity", 1); // 검색 아이콘 표시
        });

        currentNode.on("mouseleave", () => {
          circleNode.transition("all 0.3s ease-in-out").attr("r", 30); // 이미지 defs 패턴 적용된 노드 크기 복구
          defs
            .transition("all 0.3s ease-in-out")
            .attr("width", 60)
            .attr("height", 60); // 패턴 크기 복구

          defs
            .select("image")
            .transition("all 0.3s ease-in-out")
            .attr("width", 60)
            .attr("height", 60); // 패턴 내 이미지 크기 복구
          dimmed.transition("all 0.3s ease-in-out").attr("r", 30); // 이미지 딤드 오버레이 크기 복구

          searchIcon.transition("all 0.3s ease-in-out").style("opacity", 0); // 검색 아이콘 숨김
        });
      }
    });

    previewNode.on("click", (event, d) => {
      this.dispatchCallback(d);
    });

    // 키워드 라벨 텍스트 노드 생성
    const keywordLabel = this.createKeywordLabel(nodeGroup);

    const simulation = this.simulation;

    d3.selectAll(".keyword-node").each(function () {
      const currentNode = d3.select(this);
      // 루트 노드 디자인
      if (currentNode.datum().type === "Root") {
        const nodeIcon = currentNode
          .append("svg")
          .classed("root-node-icon", true)
          .attr("width", 100)
          .attr("height", 100)
          .attr("x", (d) => d.x + 20)
          .attr("y", (d) => d.y - 75)
          .style("cursor", "pointer")
          .attr("viewBox", "0 0 100 100");

        nodeIcon
          .append("path")
          .attr(
            "d",
            "M91.6479 63.3707L85.1058 63.5253L85.3081 81.189H70.9333L70.3385 63.4123L76.7795 63.3707L73.9426 48.8472L63.4574 43.334L68.5722 40.8421C69.1312 38.1241 71.4507 36.9644 71.4507 35.2694C71.4507 32.8904 67.5492 32.8904 67.5492 36.0604L65.0513 35.4656C65.3368 32.0994 66.5263 30 70.5051 30C73.7285 30 75.263 31.7842 75.263 35.1266C75.263 37.8684 73.229 38.8318 72.884 40.8599L88.8111 48.8353L91.6479 63.3707ZM55.1787 81.2128H26.9584V64.2033L20 64.3698L22.6763 48.7223L38.8353 40.8421C39.3944 38.1241 41.7138 36.9644 41.7138 35.2694C41.7138 32.8904 37.8124 32.8904 37.8124 36.0604L35.3145 35.4656C35.5999 32.0994 36.7894 30 40.7682 30C43.9917 30 45.5261 31.7842 45.5261 35.1266C45.5261 37.8684 43.4921 38.8318 43.1472 40.8599L59.0742 48.8472L61.9111 63.3707L55.2679 63.5253L55.1787 81.2128ZM53.6918 40.8837C54.239 38.136 56.5823 36.9703 56.5823 35.2694C56.5823 32.8904 52.6808 32.8904 52.6808 36.0604L50.1829 35.4656C50.4684 32.0994 51.6578 30 55.6366 30C58.8601 30 60.3945 31.7842 60.3945 35.1266C60.3945 38.0468 58.0929 38.9508 57.9502 41.2643L53.6918 40.8837Z"
          )
          .attr("fill", "#fff");

        const txtIcon = currentNode
          .select(".keyword-label")
          .append("svg")
          .attr("width", 30)
          .attr("height", 30)
          .attr("x", -40)
          .attr("y", -20)
          .attr("viewBox", "0 0 37 37");

        txtIcon
          .append("path")
          .attr(
            "d",
            "M32.478 7.70825C33.3905 9.18525 33.9168 10.9242 33.9168 12.7856C33.9168 18.1441 29.5551 22.4881 24.1746 22.4881C23.1928 22.4881 20.9574 22.2624 19.8699 21.3599L18.5105 22.7138C17.3778 23.8418 18.284 23.8418 18.7371 24.7444C18.7371 24.7444 19.8699 26.3239 18.7371 27.9033C18.0574 28.8058 16.1542 30.0694 13.9793 27.9033L13.5262 28.3546C13.5262 28.3546 14.8855 29.934 13.7527 31.5134C13.073 32.4161 11.2605 33.3186 9.6746 31.7391C9.59909 31.8144 9.17616 32.2356 8.08867 33.3186C7.00116 34.4016 5.67203 33.7698 5.14341 33.3186L3.78405 31.9647C2.51528 30.7011 3.25539 29.3323 3.78405 28.8058L15.5653 17.0728C15.5653 17.0728 14.4325 15.2676 14.4325 12.7856C14.4325 7.42716 18.7942 3.08325 24.1746 3.08325C25.4369 3.08325 26.6432 3.32235 27.7502 3.75755"
          )
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round");

        txtIcon
          .append("path")
          .attr(
            "d",
            "M27.5728 12.7859C27.5728 14.6552 26.0513 16.1705 24.1743 16.1705C22.2975 16.1705 20.7759 14.6552 20.7759 12.7859C20.7759 10.9167 22.2975 9.40137 24.1743 9.40137C26.0513 9.40137 27.5728 10.9167 27.5728 12.7859Z"
          )
          .style("stroke", "#fff")
          .style("stroke-width", 2);
      }

      // 1. Define the drag behavior
      const drag = (simulation) => {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .clickDistance(10) // 클릭과 드래그를 구분하는 거리 설정
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      };

      // 2. Apply it to node elements
      currentNode.call(drag(simulation));
    });

    this.simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      pointNode.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      previewNode.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
      keywordLabel.attr("transform", (d) => {
        if (d.type === "Root") {
          return `translate(${d.x - 10}, ${d.y - 80})`;
        }
        return `translate(${d.x - 22}, ${d.y - 50})`;
      });
      d3.select(".root-node-icon")
        .attr("x", (d) => d.x - 54)
        .attr("y", (d) => d.y - 57);
    });
  }

  createPointNode(nodeGroup) {
    const designConfig = this.config;

    const pointNode = nodeGroup
      .append("circle")
      .attr("class", (d) => {
        if (d.type === "Root") {
          return "point-node keyword-root";
        }

        return "point-node";
      })
      .attr("r", (d) => {
        if (d.type === "Root") {
          return 50;
        }

        return designConfig.node.radius;
      })
      .attr("fill", (d) => {
        if (d.type === "Root") {
          return "var(--colorMain)";
        }

        if (d.depth === 1) {
          return "#fff";
        } else {
          return designConfig.node.fill;
        }
      })
      .attr("stroke", (d) => {
        if (d.type === "Root") {
          return "rgba(255, 255, 255, 0.3)";
        }
      })
      .attr("stroke-dasharray", (d) => {
        if (d.type === "Root") {
          return "10 5";
        }
      })
      .attr("stroke-width", designConfig.node.strokeWidth)
      .style("cursor", "pointer");

    return pointNode;
  }

  createPreviewSampleNode(nodeGroup) {
    const prevNode = nodeGroup
      .append("g")
      .classed("preview-keyword-node", true)
      .style("cursor", "pointer");

    return prevNode;
  }

  createKeywordLabel(nodeGroup) {
    const label = nodeGroup.append("g").attr("class", "keyword-label");

    label
      .append("text")
      .attr("class", "keyword-text")
      .text((d) => d.name);

    // 마우스 호버 텍스트 툴팁 생성
    nodeGroup
      .append("title")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("transition", "all 0.3s ease")
      .text((d) => d.name);

    return label;
  }
}
