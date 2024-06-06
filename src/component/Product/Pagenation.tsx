"use client";

import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

interface pageProps {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  postMaxLength: number;
  totalDBlength: number;
  currentPage: number;
  searchDBlength: number;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

const Pagenation = ({
  setCurrentPage,
  postMaxLength,
  totalDBlength,
  currentPage,
  searchDBlength,
  setLoading,
}: pageProps) => {
  const [page, setPage] = useState<number[]>([]);
  const [currentViewPage, setCurrentViewPage] = useState<number[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const pageMaxLength = 5;
  const lastPageIndex = pageCount * pageMaxLength;
  const firstPageIndex = lastPageIndex - pageMaxLength;
  /* total DBlength 값만 존재할 시 DBlength 값을 활용하여 페이지 넘버링 */
  const pageNumbering = () => {
    let pageNumberArray = [];

    if (searchDBlength && searchDBlength > 0) {
      for (let i = 1; i <= Math.ceil(searchDBlength / postMaxLength); i++) {
        pageNumberArray.push(i);
        setPage(pageNumberArray);
      }
    } else if (totalDBlength && totalDBlength > 0) {
      for (let i = 1; i <= Math.ceil(totalDBlength / postMaxLength); i++) {
        pageNumberArray.push(i);
        setPage(pageNumberArray);
      }
    }
  };

  /* pageNumber li number 클릭 시, currentPage 값 변경 후 로딩 스피너 실행 */
  const pageTransform = (num: number) => {
    setCurrentPage(num);

    window.scrollTo(0, 0);

    setLoading(true);
  };

  useMemo(() => {
    if (totalDBlength || searchDBlength) {
      pageNumbering();
    }
  }, [totalDBlength, searchDBlength]);

  useEffect(() => {
    if (page.length <= 5) return;

    if (page.length > 5) {
      const firstPageSlice = page.slice(firstPageIndex, lastPageIndex);
      setCurrentViewPage(firstPageSlice);
    }
  }, [page]);

  const nextPage = (e: React.MouseEvent<SVGElement>) => {
    if (
      totalDBlength > 0 &&
      Math.ceil(totalDBlength / postMaxLength / pageMaxLength) > pageCount
    ) {
      setPageCount((count) => count + 1);
    } else if (
      searchDBlength > 0 &&
      Math.ceil(searchDBlength / postMaxLength / pageMaxLength) > pageCount
    ) {
      setPageCount((count) => count + 1);
    }
  };

  const prevPage = (e: React.MouseEvent<SVGElement>) => {
    if (pageCount > 1) {
      setPageCount((count) => count - 1);
    }
  };

  useEffect(() => {
    if (pageCount > 1) {
      const updatePageSlice = page.slice(firstPageIndex, lastPageIndex);

      setCurrentViewPage(updatePageSlice);
    } else {
      const updatePageSlice = page.slice(firstPageIndex, lastPageIndex);

      setCurrentViewPage(updatePageSlice);
    }
  }, [pageCount]);

  return (
    <div className='pagenation-container'>
      <RiArrowLeftDoubleLine
        onClick={(e) => prevPage(e)}
        cursor='pointer'
        visibility={pageCount === 1 ? "hidden" : "auto"}
      />
      <ul className='pagenation'>
        {currentViewPage.map((number) => {
          return (
            <li key={number}>
              <a
                onClick={() => pageTransform(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
      <RiArrowRightDoubleLine
        onClick={(e) => nextPage(e)}
        cursor='pointer'
        visibility={
          searchDBlength > 0 &&
          Math.ceil(searchDBlength / postMaxLength / pageMaxLength) ===
            pageCount
            ? "hidden"
            : "auto"
        }
      />
    </div>
  );
};

export default Pagenation;
