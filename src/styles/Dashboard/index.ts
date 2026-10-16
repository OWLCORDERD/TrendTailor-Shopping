import { StyledInstance, StyledObject, styled } from 'styled-components';

const Dashboard: any = {};

Dashboard.PageHeader = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;

  .index {
    &__title {
      max-width: 420px;
      word-break: keep-all;
      font-size: 56px;
      font-weight: 700;
      color: #fff;
      margin-top: 24px;

      strong {
        color: var(--accent);
      }

      &:hover {
        strong {
          color: var(--accent-hover);
        }
      }
    }
  }

  .page-sub {
    .count {
      display: flex;
      align-items: center;
      margin-top: 16px;
      gap: 8px;

      .count-item {
        font-size: 16px;
        color: var(--text-muted);

        &__label {
          display: inline-block;
          vertical-align: middle;
          font-weight: 500;
          margin-right: 5px;
        }

        &__value {
          display: inline-block;
          vertical-align: middle;
          font-weight: 700;
          color: #fff;
        }
      }
    }
  }

  @media screen and (max-width: 1250px) {
    .index {
      &__title {
        font-size: 3rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .index {
      &__title {
        max-width: 320px;
        word-break: keep-all;
        font-size: 2rem;
        font-weight: 700;
        color: #fff;

        strong {
          color: var(--accent);
        }

        &:hover {
          strong {
            color: var(--accent-hover);
          }
        }
      }
    }

    .page-sub {
      .count {
        display: flex;
        align-items: center;
        margin-top: 16px;
        gap: 8px;

        .count-item {
          font-size: 12px;
          color: var(--text-muted);

          &__label {
            display: inline-block;
            vertical-align: middle;
            font-weight: 500;
            margin-right: 5px;
          }

          &__value {
            display: inline-block;
            vertical-align: middle;
            font-weight: 700;
            color: #fff;
          }
        }
      }
    }
  }
`;

Dashboard.KPIGraph = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  overflow: hidden;
  margin-bottom: 24px;
`;

Dashboard.KPIGraphItem = styled.div`
  background: var(--bg-elev);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: ease-in-out 0.2s;

  &:hover {
    background: var(--bg-card);
  }

  .kpi {
    &__label {
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-dim);
      font-weight: 600;
    }

    &__value {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: #fff;

      &.is-loaded {
        animation: kpi-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
      }
    }

    &__delta {
      font-size: 12px;
      color: var(--text-muted);

      &.up {
        color: #4de8a2;
      }

      &.down {
        color: #ff6b6b;
      }
    }
  }

  &:nth-child(2) .kpi__value.is-loaded {
    animation-delay: 0.08s;
  }

  &:nth-child(3) .kpi__value.is-loaded {
    animation-delay: 0.16s;
  }

  @keyframes kpi-rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .kpi__value.is-loaded {
      animation: none;
    }
  }

  @media screen and (max-width: 750px) {
    .kpi {
      &__value {
        font-size: 18px;
      }
    }
  }
`;

Dashboard.Hero = styled.section`
  position: relative;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  overflow: hidden;
  margin-bottom: 32px;

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    overflow: hidden;
    min-height: 680px;

    @media screen and (max-width: 1040px) {
      display: flex;
      flex-direction: column;
    }

    .hero-left {
      grid-column: 1;
      grid-row: 1;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .hero-title {
        color: #fff;
        max-width: 80%;
        word-break: keep-all;
        font-weight: 700;
        letter-spacing: -0.03em;
        font-size: 36px;
      }

      .description {
        max-width: 80%;
        word-break: keep-all;
        color: var(--text-muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .hero-button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 100%;
        max-width: 350px;
        padding: 15px 12px;
        font-size: 13px;
        color: #fff;
        background: var(--accent);
        transition: ease-in-out 0.2s;

        &:hover {
          background: var(--accent-hover);
        }
      }
    }

    /* 그래프 포커스 키워드 인사이트 패널 (KeywordForceGraph 내부에서 렌더) */
    .keyword-insight {
      grid-column: 1;
      grid-row: 2;
      align-self: end;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 0 32px 32px;
      padding: 24px;
      border-radius: var(--r-rg);
      background: var(--bg-card);
      border: 1px solid var(--border);
      word-break: keep-all;

      &__head {
        display: flex;
        align-items: baseline;
        gap: 16px;
      }

      &__rank {
        font-size: 64px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
        transition: color 0.25s ease;

        small {
          margin-left: 2px;
          font-size: 18px;
          font-weight: 700;
        }
      }

      &__name {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--text);
      }

      &__stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1px;
        margin: 0;
        background: var(--border);
        border-radius: 12px;
        overflow: hidden;

        & > div {
          padding: 12px 16px;
          background: var(--bg-elev);
        }

        dt {
          font-size: 12px;
          color: var(--text-muted);
        }

        dd {
          margin: 4px 0 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          font-variant-numeric: tabular-nums;
        }
      }

      &__group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      &__caption,
      &__hint,
      &__empty {
        font-size: 13px;
        color: var(--text-muted);
        line-height: 1.6;
      }

      &__hint {
        font-size: 12px;
        color: var(--text-dim);
      }

      &__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 0;
        padding: 0;
        list-style: none;

        & > li {
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 13px;
          color: var(--text);
          background: var(--accent-soft);
        }

        & > li:has(button) {
          padding: 0;
          background: none;
        }

        button {
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          font-size: 13px;
          cursor: pointer;
          transition:
            border-color 0.2s ease,
            background 0.2s ease;

          &:hover,
          &:focus-visible {
            border-color: var(--cool);
            background: rgba(77, 212, 255, 0.12);
          }

          &:focus-visible {
            outline: 2px solid var(--cool);
            outline-offset: 2px;
          }
        }
      }

      @media screen and (max-width: 1040px) {
        order: 1;
        margin: 0;
        border-radius: 0;
        border-width: 1px 0 0;
      }
    }

    .keyword-force-graph {
      grid-column: 2;
      grid-row: 1 / span 2;
      position: relative;
      min-height: 620px;

      .node-group:focus {
        outline: none;
      }
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      background: #111318;

      &__toolbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(17, 19, 24, 0.72);
        backdrop-filter: blur(8px);
      }

      &__toolbar-title {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }

      &__toolbar-meta {
        font-size: 12px;
        color: var(--text-muted);
        white-space: nowrap;
      }

      &__filter {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      &__filter-label {
        font-size: 12px;
        color: var(--text-muted);
      }

      &__filter-select {
        min-width: 132px;
        padding: 8px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: var(--bg-elev);
        color: #fff;
        font-size: 13px;
        cursor: pointer;

        &:focus {
          outline: 2px solid var(--accent-soft);
          border-color: var(--accent);
        }
      }

      .no-data {
        width: fit-content;
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: center;

        & > p {
          font-size: 18px;
          color: #fff;
          font-weight: bold;
        }
      }

      &__container {
        width: 100%;
        height: 100%;

        @media screen and (max-width: 1040px) {
          min-height: 680px;
        }
      }

      .sample-block {
        position: absolute;
        left: 50%;
        bottom: 32px;
        transform: translateX(-50%);
        width: calc(100% - 32px);
        overflow: hidden;
        border-radius: 12px;
        background: #111318;
        border: 1px solid rgba(255, 255, 255, 0.08);

        &__content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 12px;
        }

        &__caption {
          padding: 12px 16px;
          font-size: 13px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          line-height: 1.6;
          word-break: keep-all;

          & > strong {
            display: block;
            margin-top: 4px;
            color: var(--hot);

            &::before {
              content: '🚨';
              margin-right: 8px;
              color: var(--hot);
            }
          }
        }

        &__button {
          padding: 8px 12px;
          font-size: 13px;
          color: #fff;
          background: var(--accent);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: ease-in-out 0.2s;
          &:hover {
            background: var(--accent-hover);
          }
        }

        &__toolbar,
        &__tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow-x: auto;
        }

        &__method {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          color: #9ae6b4;
          text-transform: uppercase;

          &::before {
            content: '</>';
            margin-right: 8px;
            color: #7dd3fc;
          }
        }

        &__code {
          margin: 0;
          padding: 20px;
          overflow-x: auto;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          line-height: 1.7;
          color: #e5e7eb;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .token-keyword {
          color: #7dd3fc;
        }

        .token-string {
          color: #bef264;
        }

        .token-url {
          color: #e5e7eb;
        }
      }
    }
  }
`;

Dashboard.Section = styled.section`
  position: relative;
  background: var(--bg-elev);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  overflow: hidden;
  margin: 32px 0;

  &:has(.banner) {
    background: transparent;
    border: none;
  }

  .section-inner {
    .banner {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .banner-index {
        margin-bottom: 24px;

        &__title {
          color: #fff;
          max-width: 80%;
          word-break: keep-all;
          font-weight: 700;
          letter-spacing: -0.03em;
          font-size: 28px;

          & > h2 {
            margin: 0;

            strong {
              color: var(--accent);
            }
          }
        }

        &__desc {
          margin-top: 20px;
          max-width: 60%;
          word-break: keep-all;
          color: var(--text);
          font-size: 16px;
          line-height: 1.6;
        }

        @media screen and (max-width: 1250px) {
          &__title {
            font-size: 20px;
          }

          &__desc {
            max-width: 100%;
            font-size: 13px;
          }
        }
      }

      &-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }

    .serpapi-sample {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;

      &__block {
        overflow: hidden;
        border-radius: 12px;
        background: #111318;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 12px;
      }

      &__caption {
        padding: 12px 16px;
        font-size: 13px;
        color: var(--text-muted);
        background: rgba(255, 255, 255, 0.04);
        line-height: 1.6;
        word-break: keep-all;

        & > strong {
          display: block;
          margin-top: 4px;
          color: var(--hot);

          &::before {
            content: '🚨';
            margin-right: 8px;
            color: var(--hot);
          }
        }
      }

      &__button {
        padding: 8px 12px;
        font-size: 13px;
        color: #fff;
        background: var(--accent);
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: ease-in-out 0.2s;
        &:hover {
          background: var(--accent-hover);
        }
      }

      &__toolbar,
      &__tabs {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        overflow-x: auto;
      }

      &__method {
        display: inline-flex;
        align-items: center;
        font-size: 13px;
        font-weight: 700;
        color: #9ae6b4;
        text-transform: uppercase;

        &::before {
          content: '</>';
          margin-right: 8px;
          color: #7dd3fc;
        }
      }

      &__tab {
        flex-shrink: 0;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--text-muted);
        background: transparent;
        border: none;

        &.is-active {
          background: #fff;
          color: #111;
          font-weight: 700;
        }
      }

      &__code {
        margin: 0;
        padding: 20px;
        overflow-x: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 13px;
        line-height: 1.7;
        color: #e5e7eb;
        white-space: pre-wrap;
        word-break: break-all;
      }

      .token-keyword {
        color: #7dd3fc;
      }

      .token-string {
        color: #bef264;
      }

      .token-url {
        color: #e5e7eb;
      }
    }
  }
`;

export { Dashboard };
