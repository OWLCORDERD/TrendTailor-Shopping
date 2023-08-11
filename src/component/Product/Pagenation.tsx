import React, { useCallback } from "react";

interface pageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postMaxLength: number;
  DBlength: number;
  currentPage: number;
  searchDBlength: number | undefined;
}

const Pagenation = ({
  setCurrentPage,
  postMaxLength,
  DBlength,
  currentPage,
  searchDBlength,
}: pageProps) => {
  const pageNumber: number[] = [];

  const totalDBPage = () => {
    for (let i = 1; i <= Math.ceil(DBlength / postMaxLength); i++) {
      pageNumber.push(i);
    }
  };

  const searchDBPage = () => {
    if (searchDBlength !== undefined) {
      for (let i = 1; i <= Math.ceil(searchDBlength / postMaxLength); i++) {
        pageNumber.push(i);
      }
    }
  };

  if (searchDBlength !== undefined && searchDBlength > 0) {
    searchDBPage();
  } else {
    totalDBPage();
  }

  return (
    <div className='pagenation-container'>
      <ul className='pagenation'>
        {pageNumber.map((number) => {
          return (
            <li key={number}>
              <a
                href='#'
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagenation;
