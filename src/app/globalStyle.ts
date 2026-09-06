'use client';

import { createGlobalStyle } from 'styled-components';
import { fontJamsil, fontRaleway } from '@/styles/fontFamilies';

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'TheJamsil';
  src: url('/fonts/TheJamsil-Regular.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TheJamsil';
  src: url('/fonts/TheJamsil-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'TheJamsil';
  src: url('/fonts/TheJamsil-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;

  body {
    height: 100%;
    font-family: ${fontJamsil};
    background: var(--colorMain);

    &:has(.shop-container),
    &:has(.notice-container),
    &:has(.login-container),
    &:has(.signup-container),
    &:has(.product-detail),
    &:has(.trendly-container) {
      background: #fff;

      header {
        background: var(--colorMain);
      }
    }

    main {
      max-width: 1440px;
      margin: 0 auto;
      padding: 32px 40px 120px;
      display: block;

      &:has(.shop-container),
      &:has(.notice-container),
      &:has(.login-container),
      &:has(.signup-container),
      &:has(.product-detail),
      &:has(.trendly-container) {
        max-width: 100%;
        padding: 0;
      }

      .page-banner {
        display: block;
        width: 100%;
        padding: 50px 20px;
        height: 200px;
        background: var(--colorMain);

        .page-title {
          width: 100%;
          line-height: 3rem;
          text-align: center;
          margin: 0 auto 20px auto;
          color: #fff;
        }

        .breadcrumb-list {
          width: max-content;
          margin: 20px auto 0;
          display: flex;
          align-items: center;

          .breadcrumb-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #fff;
            text-transform: uppercase;
            padding-left: 10px;

            &:nth-child(1) {
              padding-left: 0;
            }

            .breadcrumb-icon {
              width: 16px;
              height: 16px;
              font-size: 16px;
            }
          }
        }
      }
    }
  }

  button {
    &:disabled {
      background-color: #d5d5d5;
      color: #303030;
    }
  }
}

button,
a {
  cursor: pointer;
  color: #000;
}

nav {
  font-family: ${fontRaleway};
}

header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 40px;
  background: color-mix(in oklab, var(--bg) 82%, transparent);
  backdrop-filter: blur(20px) saturate(140%);
  border-bottom: 1px solid var(--border);
  z-index: 999;
}

footer {
  position: relative;
  width: 100%;
  background-color: var(--colorMain);
  padding: 3rem 6.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
}

.quick-menu {
  display: block;
  position: fixed;
  right: 50px;
  bottom: 50px;
  max-width: 150px;
  z-index: 1001;
  transition: all 0.5s ease-in-out;
  opacity: 1;

  .scroll-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 20px;
    color: #333;
    background-color: #fff;
    margin: 0 auto 20px auto;
    border: 2px solid #777;
  }

  @media screen and (max-width: 768px) {
    opacity: 0;
    pointer-events: none;
  }
}

.modal {
  position: fixed;
  z-index: 1001;

  &.trendly {
    right: 200px;
    bottom: 50px;
    max-width: 500px;
    height: 650px;
    background-color: var(--colorMain);
    border-radius: 20px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid var(--border);

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 70px;
      padding: 20px 30px;

      .close-btn {
        display: block;
        line-height: 30px;
        text-align: center;
        font-size: 28px;
        background-color: transparent;
        color: #fff;
        border: none;
      }

      .chat-history {
        display: flex;
        gap: 10px;
        align-items: center;
        border: none;
        background: transparent;
        padding: 5px 10px;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        font-family: ${fontJamsil};
      }
    }

    &::-webkit-scrollbar {
      width: 10px;
    }

    .modal-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 15px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .home-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        padding: 10px;
        text-align: center;
        font-size: 28px;
        background-color: transparent;
        color: #fff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 2px inset rgba(255, 255, 255, 0.8);
      }
    }
  }
}

.trendly-container {
  display: flex;
}

section {
  position: relative;
  display: inline-block;
  width: 100%;
  height: max-content;
}

:root {
  --colorMain: #0a1440;
  --bg-elev: #111c55;
  --bg-card: #17245e;
  --border: rgba(255, 255, 255, 0.1);
  --text: #f4f4f0;
  --text-muted: #8892c4;
  --text-dim: #5a6ba8;
  --r-rg: 20px;
  --r-l: 24px;
  --r-lx: 28px;
  --accent: #3b5bff;
  --accent-hover: #5a76ff;
  --accent-soft: rgba(59, 91, 255, 0.15);
  --hot: #ff4d6d;
  --warm: #ffb84d;
  --cool: #4dd4ff;
  --grid-line: rgba(255, 255, 255, 0.06);
  --subColor1: #e5e7eb;
  --subColor2: #f5f0eb;
  --txtColor: #1f1f1f;
  --subTxtColor: #838383;
}
`;
