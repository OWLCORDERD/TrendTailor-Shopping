import { styled } from 'styled-components';

// 2026.10.25. 마이홈 페이지 스타일 모듈
// - 전역 디자인 토큰(--colorMain, --bg-elev, --bg-card, --accent 등)만 참조
// - 영역 구분은 테두리·그림자 대신 배경 톤 차이로 처리
const MyHome: any = {};

const statusColor = `
  &[data-status='running'] { color: var(--cool); }
  &[data-status='done'] { color: #4de8a2; }
  &[data-status='empty'] { color: var(--warm); }
  &[data-status='failed'] { color: var(--hot); }
`;

MyHome.Page = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 40px 160px;
  color: var(--text);

  .myhome-body {
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr);
    gap: 48px;
    margin-top: 96px;
  }

  .myhome-content {
    display: flex;
    flex-direction: column;
    gap: 120px;
    min-width: 0;
  }

  .myhome-split {
    display: grid;
    grid-template-columns: repeat(0, 1fr);
    gap: 96px;
  }

  section {
    scroll-margin-top: 120px;
  }

  .section-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 32px;

    h2 {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      word-break: keep-all;
    }

    p {
      margin-top: 12px;
      max-width: 560px;
      font-size: 16px;
      line-height: 1.55;
      color: var(--text-muted);
      word-break: keep-all;
    }
  }

  .text-link {
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--text);
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-color: var(--accent);
    transition: color 0.2s ease-in-out;

    &:hover,
    &:focus-visible {
      color: var(--accent-hover);
    }
  }

  .skeleton-block {
    background: var(--bg-elev);
    border-radius: var(--r-lg);
    animation: myhome-pulse 1.4s ease-in-out infinite alternate;
  }

  @keyframes myhome-pulse {
    to {
      background: var(--bg-card);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton-block {
      animation: none;
    }
  }

  @media screen and (max-width: 1024px) {
    .myhome-body {
      grid-template-columns: minmax(0, 1fr);
      gap: 24px;
      margin-top: 64px;
    }

    .myhome-split {
      grid-template-columns: minmax(0, 1fr);
      gap: 96px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 16px 16px 120px;

    .myhome-content {
      gap: 96px;
    }

    .section-head {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;

      h2 {
        font-size: 28px;
      }
    }
  }
`;

// 상단 프로필 영역 (내 정보 + 요약 지표)
MyHome.Profile = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: end;
  padding: 56px;
  background: var(--bg-elev);
  border-radius: var(--r-xl);

  .profile-who {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .profile-avatar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    overflow: hidden;
    background: var(--accent);
    font-size: 32px;
    font-weight: 700;
    color: #fff;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  h1 {
    font-size: clamp(32px, 4.4vw, 48px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.02;
    word-break: keep-all;
  }

  .profile-meta {
    font-size: 16px;
    line-height: 1.5;
    color: var(--text-muted);

    strong {
      color: var(--text);
      font-weight: 500;
    }
  }

  .profile-action {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    width: max-content;
    padding: 16px 28px;
    border-radius: 9999px;
    background: var(--accent);
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border: none;
    transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;

    svg {
      transition: transform 0.2s ease-in-out;
    }

    &:hover,
    &:focus-visible {
      background: var(--accent-hover);

      svg {
        transform: translateX(4px);
      }
    }

    &:active {
      transform: scale(0.97);
    }
  }

  .profile-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;

    div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 24px;
      background: var(--bg-card);
      border-radius: var(--r-lg);
    }

    dt {
      font-size: 14px;
      color: var(--text-muted);
    }

    dd {
      font-size: clamp(20px, 2.8vw, 30px);
      font-weight: 700;
      letter-spacing: -0.03em;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;

      small {
        margin-left: 4px;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 40px;
  }

  @media screen and (max-width: 768px) {
    gap: 32px;
    padding: 28px 20px;
    border-radius: var(--r-lg);

    .profile-avatar {
      width: 64px;
      height: 64px;
      font-size: 26px;
    }

    .profile-stats {
      grid-template-columns: minmax(0, 1fr);

      div {
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
        padding: 16px 20px;
      }

      dd {
        font-size: 28px;
      }
    }
  }
`;

// 섹션 바로가기 (데스크톱 좌측 고정 · 모바일 가로 스크롤)
MyHome.Rail = styled.nav`
  position: sticky;
  top: 120px;
  align-self: start;

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  a {
    position: relative;
    display: block;
    padding: 12px 16px;
    border-radius: var(--r-rg);
    font-size: 16px;
    color: var(--text-muted);
    transition: color 0.2s ease-in-out, background 0.2s ease-in-out;

    &:hover,
    &:focus-visible {
      color: var(--text);
      background: var(--bg-elev);
    }

    &.is-active {
      color: var(--text);
      font-weight: 700;
      background: var(--bg-elev);
    }
  }

  @media screen and (max-width: 1024px) {
    top: 72px;
    z-index: 5;
    margin: 0 -16px;
    padding: 8px 16px;
    background: var(--colorMain);

    ul {
      flex-direction: row;
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    a {
      white-space: nowrap;
      padding: 10px 16px;
    }
  }
`;

// 최근 AI 컨설팅 결과
MyHome.Consulting = styled.section`
  .consulting-sheet {
    display: grid;
    grid-template-columns: minmax(0, 340px) minmax(0, 1fr);
    gap: 40px;
    padding: 40px;
    background: var(--bg-elev);
    border-radius: var(--r-xl);
  }

  .consulting-summary {
    display: flex;
    flex-direction: column;
    gap: 20px;

    h3 {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.3;
      word-break: keep-all;
    }

    time {
      font-size: 14px;
      color: var(--text-muted);
    }

    .conditions {
      font-size: 16px;
      line-height: 1.6;
      word-break: keep-all;
    }

    blockquote {
      padding: 20px;
      background: var(--bg-card);
      border-radius: var(--r-rg);
      font-size: 16px;
      line-height: 1.6;
      word-break: keep-all;

      cite {
        display: block;
        margin-top: 12px;
        font-size: 14px;
        font-style: normal;
        color: var(--text-muted);
      }
    }
  }

  // 추천 의류 swiper 슬라이드 (그리드 셀 안에서 너비가 넘치지 않도록 min-width 0)
  .product-strip {
    min-width: 0;

    .swiper {
      overflow: hidden;
    }

    .swiper-slide {
      height: auto;
    }
  }

  .product {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
    color: #fff;

    &__thumb {
      position: relative;
      aspect-ratio: 4 / 5;
      border-radius: var(--r-rg);
      overflow: hidden;
      background: #fff;

      img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
    }

    &__brand {
      font-size: 14px;
      color: var(--text-muted);
    }

    &__title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 16px;
      line-height: 1.45;
    }

    &__price {
      font-size: 18px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    &:hover,
    &:focus-visible {
      .product__thumb img {
        transform: scale(1.05);
      }
    }
  }

  .consulting-empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 56px 40px;
    background: var(--bg-elev);
    border-radius: var(--r-xl);

    p {
      font-size: 24px;
      line-height: 1.4;
      word-break: keep-all;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .product__thumb img {
      transition: none;
    }
  }

  @media screen and (max-width: 1250px) {
    .consulting-sheet {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .consulting-sheet,
    .consulting-empty {
      gap: 28px;
      padding: 24px 20px;
      border-radius: var(--r-lg);
    }

    .consulting-empty p {
      font-size: 20px;
    }
  }
`;

// 최근 활동 타임라인
MyHome.Activity = styled.section`
  ol {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .activity-item {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr) auto;
    gap: 20px;
    align-items: center;
    padding: 20px;
    border-radius: var(--r-rg);
    transition: background 0.2s ease-in-out;

    &:hover,
    &:focus-visible {
      background: var(--bg-elev);

      .activity-item__go {
        transform: translateX(4px);
        color: var(--text);
      }
    }

    time {
      font-size: 16px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: #fff;
    }

    &__title {
      font-size: 16px;
      line-height: 1.45;
      word-break: keep-all; 
      color: #fff;
    }

    &__sub {
      margin-top: 4px;
      font-size: 14px;
      color: var(--text-muted);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__go {
      font-size: 20px;
      color: var(--text-muted);
      transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
    }
  }

  .activity-note {
    margin-top: 16px;
    padding: 0 20px;
    font-size: 14px;
    color: var(--text-muted);
  }

  @media screen and (max-width: 768px) {
    .activity-item {
      grid-template-columns: 56px minmax(0, 1fr) auto;
      gap: 12px;
      padding: 16px 8px;
    }
  }
`;

// 스타일 프로필 (컨설팅 답변 집계)
MyHome.Style = styled.section`
  .style-sheet {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px;
    background: var(--bg-elev);
    border-radius: var(--r-xl);
  }

  .keyword-bars {
    display: flex;
    flex-direction: column;
    gap: 16px;

    li {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .bar-label {
      display: flex;
      justify-content: space-between;
      font-size: 16px;

      span:last-child {
        color: var(--text-muted);
        font-variant-numeric: tabular-nums;
      }
    }

    .bar-track {
      height: 10px;
      border-radius: 9999px;
      background: var(--bg-card);
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      border-radius: 9999px;
      background: var(--accent);
      transform-origin: left center;
    }

    li:first-child .bar-fill {
      background: var(--hot);
    }
  }

  .style-facts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;

    div {
      padding: 16px;
      background: var(--bg-card);
      border-radius: var(--r-rg);
    }

    dt {
      font-size: 14px;
      color: var(--text-muted);
    }

    dd {
      margin-top: 8px;
      font-size: 18px;
      font-weight: 700;
      word-break: keep-all;
    }
  }

  .style-empty {
    font-size: 16px;
    line-height: 1.6;
  }

  @media screen and (max-width: 768px) {
    .style-sheet {
      padding: 24px 20px;
      border-radius: var(--r-lg);
    }

    .style-facts {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

// 관리자 데이터 수집 파이프라인
MyHome.Admin = styled.section`
  .admin-sheet {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 24px;
    padding: 40px;
    background: #050b2a;
    border-radius: var(--r-xl);
  }

  .admin-intro {
    grid-column: 1 / -1;
    font-size: 16px;
    line-height: 1.6;
    word-break: keep-all;
  }

  .admin-meta {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;

    div {
      padding: 20px;
      background: var(--bg-elev);
      border-radius: var(--r-rg);
    }

    dt {
      font-size: 14px;
      color: var(--text-muted);
    }

    dd {
      margin-top: 8px;
      font-size: 24px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }
  }

  .admin-step {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 28px;
    background: var(--bg-elev);
    border-radius: var(--r-lg);

    h3 {
      font-size: 20px;
      font-weight: 700;
    }

    p {
      flex: 1;
      font-size: 16px;
      line-height: 1.55;
      color: var(--text-muted);
      word-break: keep-all;
    }
  }

  .admin-actions {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .admin-button {
    padding: 14px 24px;
    border-radius: 9999px;
    background: var(--accent);
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border: none;
    transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;

    &:hover:not(:disabled),
    &:focus-visible {
      background: var(--accent-hover);
    }

    &:active:not(:disabled) {
      transform: scale(0.97);
    }

    &:disabled {
      background: var(--bg-card);
      color: var(--text-dim);
      cursor: not-allowed;
    }

    &.is-secondary {
      background: var(--bg-card);

      &:hover:not(:disabled) {
        background: var(--text-dim);
      }
    }

    &.is-stop {
      background: var(--hot);
    }
  }

  .admin-progress {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 28px;
    background: var(--bg-elev);
    border-radius: var(--r-lg);

    &__head {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-variant-numeric: tabular-nums;
    }

    &__track {
      height: 8px;
      border-radius: 9999px;
      background: var(--bg-card);
      overflow: hidden;
    }

    &__fill {
      height: 100%;
      background: var(--accent);
      transform-origin: left center;
    }
  }

  .keyword-queue {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 8px;

    li {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding: 12px 16px;
      background: var(--bg-card);
      border-radius: 12px;
      font-size: 14px;
    }

    .queue-status {
      flex-shrink: 0;
      color: var(--text-muted);
      ${statusColor}
    }
  }

  .admin-log {
    grid-column: 1 / -1;

    li {
      display: grid;
      grid-template-columns: 72px minmax(0, 1fr);
      gap: 12px;
      padding: 8px 0;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-muted);
      ${statusColor}

      time {
        font-variant-numeric: tabular-nums;
        color: var(--text-dim);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .admin-meta {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 768px) {
    .admin-sheet {
      grid-template-columns: minmax(0, 1fr);
      padding: 20px;
      border-radius: var(--r-lg);
    }

    .admin-step,
    .admin-progress {
      padding: 20px;
    }

    .admin-meta dd {
      font-size: 20px;
    }

    .admin-button {
      flex: 1 1 auto;
    }
  }
`;

export { MyHome };
