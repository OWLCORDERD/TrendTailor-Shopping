"use client";

import useBreadcurmbSetting from "@/hooks/useBreadcrumb";
import React, { useEffect, useMemo } from "react";
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

  // 메인 인트로 홈, 쇼핑 or 챗봇 페이지에서는 브레드크럼 제외 처리
  const filterRoute = route !== "/" && !route.includes("trendly");

  return (
    <>
      {filterRoute && (
        <div className='page-banner'>
          <h1 className='page-title'>{pageTitle}</h1>

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
