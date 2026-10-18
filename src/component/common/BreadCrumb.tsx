"use client";

import useBreadcurmbSetting from "@/hooks/useBreadcrumb";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumb = () => {
  const route = usePathname();

  const currentBreadcrumb = useBreadcurmbSetting(route || "");

  const pageTitle = useMemo(() => {
    if (currentBreadcrumb.breadcrumb.length > 0) {
      return currentBreadcrumb.breadcrumb[
        currentBreadcrumb.breadcrumb.length - 1
      ].name;
    } else {
      return "";
    }
  }, [currentBreadcrumb]);

  // 메인 인트로 홈, 쇼핑 or 챗봇 페이지, 미등록 경로(404)에서는 브레드크럼 제외
  const filterRoute = route !== "/" && !route.includes("trendly");
  const showBreadcrumb = filterRoute && currentBreadcrumb.isKnownPath;

  // 2026.10.18: 상세 페이지(/notice/[idx] 등)는 본문 제목이 H1이므로 배너 제목은 헤딩에서 제외
  const lastPath =
    currentBreadcrumb.breadcrumb[currentBreadcrumb.breadcrumb.length - 1]?.path;
  const TitleTag = route === lastPath ? "h1" : "p";

  return (
    <>
      {showBreadcrumb && (
        <div className='page-banner'>
          <TitleTag className='page-title'>{pageTitle}</TitleTag>

          <ul className='breadcrumb-list'>
            {currentBreadcrumb.breadcrumb.map((item, index) => {
              return (
                <li className='breadcrumb-item' key={index}>
                  <div className='breadcrumb-icon'>
                    {item.icon && <item.icon />}
                  </div>

                  <span className='breadcrumb-name'>{item.name}</span>

                  {index !== currentBreadcrumb.breadcrumb.length - 1 && (
                    <span className='breadcrumb-separator'>
                      <IoIosArrowForward />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default BreadCrumb;
