import type { Metadata } from "next";
import "styles/about.scss";
import AboutSection from "component/About/AboutSection";

export const metadata: Metadata = {
  title: "사이트 소개",
  description:
    "TrendTailor가 트렌드 키워드를 수집하고 의류 데이터를 분석해 패션 트렌드 정보를 제공하는 방식을 소개합니다.",
};

export default function About() {
  return (
    <main className='main'>
      <AboutSection />
    </main>
  );
}
