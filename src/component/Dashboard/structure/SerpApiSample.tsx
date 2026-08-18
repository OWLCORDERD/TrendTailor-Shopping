'use client';

import React, { useContext, useRef, useState } from "react";
import { searchClothesByTrendKeyword } from "@/feature/trend/jobs/collect-clothes.jobs";
import { AlertToast } from "@/hooks/useToastify";
import { useSession } from "next-auth/react";
import { ModalContext } from "../../../../context/ModalContext";

const SerpApiSample = () => {
  const getUrl =
    "https://serpapi.com/search.json?engine=google_shopping&q=${trendKeyword+fashion}&location=South+Korea&hl=en&gl=kr";

  const languages = [
    "cURL",
    "CLI",
    "Ruby",
    "Python",
    "JavaScript",
    "Go",
    "PHP",
    "Java",
    "Rust",
    "C++",
    ".NET",
    "Swift",
    "Google Sheets",
  ];

  const { data: session, status } = useSession();

  const { modalOpen, modalClose } = useContext(ModalContext);

  // 2026.08.15. 관리자 전용 트렌드 의류 데이터 수집 파이프라인 테스트 코드 호출 함수
  // > (collect.clothes.jobs 파이프라인)
  const handleAdminPipelineTest = async () => {
    // CASE A. 비로그인 사용자 > 로그인 컨펌 모달 노출
    if (!session || status !== "authenticated") {
      if (modalOpen) {
        modalOpen({
          title: "로그인이 필요한 서비스입니다.",
          dynamicComponent: "Login",
          type: "login",
        })
      }
      return;
    }
    // CASE B. 로그인 사용자가 관리자 권한이 아닌 경우
    if (session && session.user?.role !== "admin") {
      AlertToast({
        str: `관리자 권한이 없습니다.
        관리자에게 문의해주세요.`,
        type: "error",
        theme: "dark",
      })
      return;
    }

    // 파이프라인 실행 컨펌 모달 호출
    if (modalOpen) {
      modalOpen({
        title: "트렌드 의류 데이터 수집 안내",
        content: `검색 엔진 결과 데이터들을 firestore DB에 저장하는데까지 5분정도 소요됩니다. <br/>
        개발자 도구 > 네트워크 탭에서 단계별로 확인할 수 있습니다. 진행하시겠습니까?`,
        type: "code",
        fn: async () => {
          // 모달 푸터 코드 실행 버튼 이벤트 핸들러
          try {
            const result = await searchClothesByTrendKeyword();
      
            if (result && result.success) {
              AlertToast({
                str: result.message,
                type: "success",
                theme: "light",
              })
            }
          } catch (error) {
            AlertToast({
              str: "트렌드 의류 데이터 수집 파이프라인 내부 오류가 발생하였습니다.",
              type: "error",
              theme: "dark",
            })
          }

          modalClose?.(); // 파이프라인 실행 완료 후 모달 닫기
        }
      });
    }
  }

  return (
    <>
    <div className='serpapi-sample'>
      <div className='serpapi-sample__block'>
        <div className='serpapi-sample__toolbar'>
          <span className='serpapi-sample__method'>GET</span>
        </div>
        <pre className='serpapi-sample__code'>
          <code>
            <span className='token-url'>{getUrl}</span>
          </code>
        </pre>
      </div>

      <div className='serpapi-sample__block'>
        <div className='serpapi-sample__tabs'>
          {languages.map((lang) => (
            <button
              type="button"
              key={lang}
              className={
                lang === "JavaScript"
                  ? "serpapi-sample__tab is-active"
                  : "serpapi-sample__tab"
              }
            >
              {lang}
            </button>
          ))}
        </div>
        <pre className='serpapi-sample__code'>
          <code>
            {`const { getJson } = require("serpapi");

getJson({
  engine: "google_shopping",
  q: "{trendKeyword} + ' fashion'",
  location: "South Korea",
  hl: "en",
  gl: "kr",
  api_key: "serpapi_api_key"
}, (json) => {
  console.log(json['shopping_results']);
});`}
          </code>
        </pre>
      </div>

      {/* 관리자 영역 (실시간 데이터 수집) */}
      {status === "authenticated" && session?.user?.role === "admin" && (
        <div className='serpapi-sample__block'>
          <div className='serpapi-sample__toolbar'>
            <span className='serpapi-sample__method'>Admin Pipeline test</span>
          </div>
  
          <div className="serpapi-sample__content">
            <div className='serpapi-sample__caption'>
                <p>월별 트렌드 컬렉션 데이터 수집 스케줄링 (vercel cron) API에 포함된 트렌드 의류 데이터 수집 파이프라인을 테스트합니다. <br/>
                SerpApi 서비스 객체 호출부터 컬렉션 데이터 수집/저장까지의 비즈니스 로직을 확인하여 추후 API 업데이트 시, 마이그레이션을 위한 테스트 용도로 사용합니다.</p>
                <strong>관리자 외에는 이용 불가능한 서비스입니다.</strong>
            </div>
            <button type="button" className='serpapi-sample__button' 
            disabled={status !== "authenticated" || session?.user?.role !== "admin"}
            onClick={handleAdminPipelineTest}>
              호출
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default SerpApiSample;
