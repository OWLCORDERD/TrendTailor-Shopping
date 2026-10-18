import type { Metadata } from 'next';
import AuthSession from '@/component/common/AuthSession';
import { ThemeProvider } from '../../context/ThemeContext';
import StyledComponentsRegistry from './RootStyleRegistry';
import ReduxProvider from '@/feature/store/provider/Provider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from 'component/Main/Footer';
import QuickMenu from 'component/Main/QuickMenu';
import { ScrollToTop } from '@/hooks/ScrollToTop';
import './globals.scss';
import SessionWatcher from '@/component/common/SessionWatcher';
import { ModalProvider } from '../../context/ModalContext';
import BreadCrumb from '@/component/common/BreadCrumb';
import Navbar from '@/component/Main/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './fonts';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trendtailor-store.vercel.app';

const SITE_DESCRIPTION =
  'TrendTailor 플랫폼은 매월 새로운 트렌드 키워드들을 제공하며 구글 쇼핑 검색 엔진을 통해 트렌드 의류와 그 외의 정보를 공유하는 포트폴리오 플랫폼 사이트입니다.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // './'는 요청 경로 기준으로 해석되어 페이지마다 자기 URL이 canonical로 지정됨
  alternates: { canonical: './' },
  // 2026.10.18: 하위 페이지 제목은 "페이지명 | TrendTailor" 형식으로 표시
  title: {
    default: 'TrendTailor - 월별 패션 트렌드 키워드 분석 대시보드',
    template: '%s | TrendTailor',
  },
  openGraph: {
    type: 'website',
    url: './',
    siteName: 'TrendTailor',
    locale: 'ko_KR',
    title: 'TrendTailor, 트렌드를 재단해보세요.',
    description:
      'TrendTailor는 매월 자동으로 수집한 패션 트렌드 키워드와 구글 쇼핑 의류 데이터를 분석해 대시보드로 제공하는 포트폴리오 플랫폼입니다.',
  },
  description: SITE_DESCRIPTION,
  verification: {
    google: 'A6iqSdzs9pSlgN5ffUfMmsQxLKPiZtT0vcVEiydn-QY',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 로그인 인증 전역 nextAuth Provider */}
      <AuthSession>
        <SessionWatcher />
        {/* 전역 상태관리 redux Provider */}
        <ReduxProvider>
          {/* 스타일 컴포넌트 SSR Preload 레지스트리 */}
          <StyledComponentsRegistry>
            {/* 스크롤 상단 이동 */}
            <ScrollToTop type="routeMove" />
            <html lang="ko">
              <body>
                <ToastContainer />
                <ModalProvider>
                  <ThemeProvider>
                    <Navbar />
                    <main className="page" id="page-root">
                      <BreadCrumb />
                      <QuickMenu />
                      {children}
                    </main>
                    <Footer />
                  </ThemeProvider>
                </ModalProvider>
              </body>
            </html>
          </StyledComponentsRegistry>
        </ReduxProvider>
      </AuthSession>
    </>
  );
}
