"use client";

import useBreadcurmbSetting from "@/hooks/useBreadcrumb";
import React, { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

const BreadCrumb = () => {
  const route = usePathname();
  const currentBreadcrumb = useBreadcurmbSetting(route);

  const pageTitle = useMemo(() => {
    return currentBreadcrumb.breadcrumb[currentBreadcrumb.breadcrumb.length - 1]
      ?.name;
  }, [currentBreadcrumb]);

  return (
    <>
      {route !== "/" && (
        <div className='page-banner'>
          <h1 className='page-title'>{pageTitle}</h1>

          <ul className='breadcrumb-list'>
            {currentBreadcrumb.breadcrumb.map((item, index) => {
              return (
                <li className='breadcrumb-item' key={index}>
                  <div className='breadcrumb-icon'>
                    {item.name === "Home" && <IoHomeSharp />}
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
