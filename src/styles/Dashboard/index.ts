import { StyledInstance, StyledObject, styled } from 'styled-components';

const Dashboard: any = {};

Dashboard.PageHeader = styled.section`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 32px;

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
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    overflow: hidden;
    min-height: 680px;

    .hero-left {
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
    }

    .keyword-force-graph {
      position: relative;
      min-height: 620px;
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
  margin-bottom: 32px;

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
