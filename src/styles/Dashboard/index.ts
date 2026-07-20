import { StyledInstance, StyledObject, styled } from "styled-components";

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
        color: var(--text-muted);
        font-size: 14px;
        line-height: 1.6;
      }
    }

    .hero-graph {
      position: relative;
      min-height: 620px;
      display: block;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(59, 91, 255, 0.08),
        transparent 70%
      );
    }
  }
`;

export { Dashboard };
