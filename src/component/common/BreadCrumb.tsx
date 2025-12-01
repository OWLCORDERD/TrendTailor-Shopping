"use client";

import useBreadcurmbSetting from "@/hooks/useBreadcrumb";
import React, { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumb = () => {
  const route = usePathname();

  const currentBreadcrumb = useBreadcurmbSetting(route || "");

  const pageTitle = useMemo(() => {
    if (currentBreadcrumb.length > 0) {
    return currentBreadcrumb[currentBreadcrumb.length - 1].name;
    } else {
      return "";
    }
  }, [currentBreadcrumb]);

  return (
    <>
      {route !== "/" && (
        <div className='page-banner'>
          <h1 className='page-title'>{pageTitle}</h1>

          <ul className='breadcrumb-list'>
            {currentBreadcrumb.map((item, index) => {
              return (
                <li className='breadcrumb-item' key={index}>
                  <div className='breadcrumb-icon'>
                    {item.icon && <item.icon />}
                  </div>

                  <span className='breadcrumb-name'>{item.name}</span>

                  {index !== currentBreadcrumb.length - 1 && (
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
