import React, { SetStateAction } from "react";

interface pageProps {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  postMaxLength: number;
  DBlength: number;
  currentPage: number;
  searchDBlength: number | undefined;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

const Pagenation = ({
  setCurrentPage,
  postMaxLength,
  DBlength,
  currentPage,
  searchDBlength,
  setLoading,
}: pageProps) => {
  const pageNumber: number[] = [];

  /* total DBlength 값만 존재할 시 DBlength 값을 활용하여 페이지 넘버링 */
  const totalDBPage = () => {
    for (let i = 1; i <= Math.ceil(DBlength / postMaxLength); i++) {
      pageNumber.push(i);
    }
  };

  /* search Query를 통해 조회된 searchDB가 존재할 시 searchDBlength 값을 활용하여 페이지 넘버링 */
  const searchDBPage = () => {
    if (searchDBlength !== undefined) {
      for (let i = 1; i <= Math.ceil(searchDBlength / postMaxLength); i++) {
        pageNumber.push(i);
      }
    }
  };

  /* pageNumber li number 클릭 시, currentPage 값 변경 후 3초간 로딩 스피너 실행 */
  const pageTransform = (num: number) => {
    setCurrentPage(num);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  /*seach Query를 통해 조회된 searchDB 데이터가 존재 할 시 searchDBPage 함수 실행*/
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
                onClick={() => pageTransform(number)}
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
